import {
  CopyObjectCommandOutput,
  DeleteObjectCommandOutput,
  GetObjectCommandOutput,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Handler } from 'aws-lambda'
import { isNil, last, split } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { getAsset, updateAsset, validateAndCreateMetadata } from '../../../asset'
import { ExtractedFileWithCID, ManifestExtractedFiles } from '../../../asset/types'
import { copyFile, deleteFile, readFile, writeFile } from '../../../aws'
import { uploadFile } from '../../../ipfs'
import { Asset, AssetMetadata, AssetStatus } from '../../../types'

export const _main =
  ({
    readFile,
    writeFile,
    copyFile,
    deleteFile,
    validateAndCreateMetadata,
    getAsset,
    updateAsset,
  }: {
    readFile: ({ Bucket, Key }: { Bucket: string; Key: string }) => Promise<GetObjectCommandOutput>
    writeFile: (params: PutObjectCommandInput) => Upload
    copyFile: ({
      Bucket,
      CopySource,
      Key,
    }: {
      Bucket: string
      CopySource: string
      Key: string
    }) => Promise<CopyObjectCommandOutput | undefined>
    deleteFile: ({ Bucket, Key }: { Bucket: string; Key: string }) => Promise<DeleteObjectCommandOutput | undefined>
    validateAndCreateMetadata: (
      byteArray: Uint8Array,
      asset: Asset,
    ) => Promise<{
      conforms: boolean
      reports: (ValidationReport<any> | { conforms: boolean })[] | { conforms: boolean }[]
      metadata: any
      modifiedManifest: Record<string, unknown>
      assetCID: string
      files: ManifestExtractedFiles
      visualizationFiles: ExtractedFileWithCID[]
    }>
    getAsset: (cid: string) => Promise<Asset>
    updateAsset: (
      newCid: string,
      oldCid: string,
      status: AssetStatus,
      metadata?: AssetMetadata | string,
      manifest?: Record<string, unknown>,
    ) => Promise<Asset>
  }): S3Handler =>
  async event => {
    try {
      // Read uploaded asset
      const s3Record = event.Records[0].s3

      const Key = s3Record.object.key
      const Bucket = s3Record.bucket.name

      const { Body } = await readFile({ Key, Bucket })

      if (isNil(Body)) {
        return
      }
      const uploadedFile = await Body.transformToByteArray()

      // Validate uploaded asset
      const asset = await getAsset(Key)
      const { conforms, metadata, assetCID, modifiedManifest, files, visualizationFiles } =
        await validateAndCreateMetadata(uploadedFile, asset)
      if (!conforms) {
        // Revert if validation fails
        await deleteFile({ Bucket, Key })
        await updateAsset(Key, Key, AssetStatus.not_accepted)

        return
      }
      // Copy asset ZIP file to S3 with CID as name
      await copyFile({
        Bucket,
        CopySource: `${Bucket}/${Key}`,
        Key: assetCID,
      })

      // Handle files for registered users
      const { owner, registeredUser, publicUser } = files

      console.log('Files', { owner })
      console.log('Files', { registeredUser })
      console.log('Files', { publicUser })

      if (owner) {
        const writeFilesToAssetPromises = owner.map(
          async ({ path, arrayBuffer }: { path: string; arrayBuffer: ArrayBuffer }) => {
            const writeToAsset = writeFile({
              Bucket,
              Key: `${assetCID}/${path}`,
              Body: Buffer.from(arrayBuffer),
              ContentEncoding: 'base64',
            })

            return writeToAsset.done()
          },
        )

        Promise.all(writeFilesToAssetPromises)
        console.log('Asset files saved')
      }

      if (visualizationFiles) {
        const writeFilesToIpfsPromises = visualizationFiles.map(
          async ({ cid, arrayBuffer }: { cid: string; arrayBuffer: ArrayBuffer }) => {
            const writeToIpfsBucket = writeFile({
              Bucket: process.env.NEXT_PUBLIC_IPFS_BUCKET_NAME,
              Key: `${assetCID}/${cid}`,
              Body: Buffer.from(arrayBuffer),
              ContentEncoding: 'base64',
            })

            return writeToIpfsBucket.done()
          },
        )

        const resultsIpfs = Promise.all(writeFilesToIpfsPromises)
        console.log('IPFS files saved', resultsIpfs)

        const pinataIpfsPromises = visualizationFiles.map(
          async ({ path, arrayBuffer }: { path: string; arrayBuffer: ArrayBuffer }) =>
            uploadFile({ arrayBuffer, filename: last(split('/', path)) as string }),
        )

        const resultsPinata = Promise.all(pinataIpfsPromises)
        console.log('Pinata files saved', resultsPinata)
      }

      if (registeredUser) {
        const writeFilesToMetadataPromises = registeredUser.map(
          async ({ path, arrayBuffer }: { path: string; arrayBuffer: ArrayBuffer }) => {
            const writeToMetadata = writeFile({
              Bucket: process.env.NEXT_PUBLIC_METADATA_BUCKET_NAME,
              Key: `${assetCID}/${path}`,
              Body: Buffer.from(arrayBuffer),
              ContentEncoding: 'base64',
            })

            return writeToMetadata.done()
          },
        )

        Promise.all(writeFilesToMetadataPromises)
        console.log('Metadata files saved')
      }

      // Update stored asset in DB
      await updateAsset(assetCID, Key, AssetStatus.pending, metadata, modifiedManifest)

      // Delete uploaded asset with the "old" name from S3
      await deleteFile({ Bucket, Key })
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const main = _main({
  readFile,
  writeFile,
  copyFile,
  deleteFile,
  validateAndCreateMetadata,
  getAsset,
  updateAsset,
})
