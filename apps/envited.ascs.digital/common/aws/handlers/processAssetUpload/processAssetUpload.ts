import { DeleteObjectCommandOutput, GetObjectCommandOutput, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Handler } from 'aws-lambda'
import { isNil, last, split } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { getAsset, updateAsset, validateAndCreateMetadata } from '../../../asset'
import { ExtractedFileWithCID, ManifestExtractedFiles } from '../../../asset/types'
import { deleteFile, readFile, writeFile } from '../../../aws'
import { createGroup, uploadFile } from '../../../ipfs'
import { log } from '../../../logger'
import { Asset, AssetMetadata, AssetStatus } from '../../../types'

export const _main =
  ({
    readFile,
    writeFile,
    deleteFile,
    validateAndCreateMetadata,
    getAsset,
    updateAsset,
    uploadFile,
    createGroup,
  }: {
    readFile: ({ Bucket, Key }: { Bucket: string; Key: string }) => Promise<GetObjectCommandOutput>
    writeFile: (params: PutObjectCommandInput) => Upload
    deleteFile: ({ Bucket, Key }: { Bucket: string; Key: string }) => Promise<DeleteObjectCommandOutput | undefined>
    validateAndCreateMetadata: (
      byteArray: Uint8Array,
      asset: Asset,
    ) => Promise<{
      conforms: boolean
      reports: (ValidationReport | { conforms: boolean })[] | { conforms: boolean }[]
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
    uploadFile: ({
      arrayBuffer,
      filename,
      group,
    }: {
      arrayBuffer: ArrayBuffer
      filename: string
      group?: string
    }) => Promise<string>
    createGroup: (minter: string) => Promise<string>
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
        await updateAsset(Key, Key, AssetStatus.rejected)

        return
      }

      // Handle files for registered users
      const { registeredUser } = files

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

        Promise.all(writeFilesToIpfsPromises)

        const pinataIpfsPromises = visualizationFiles.map(
          async ({ path, arrayBuffer }: { path: string; arrayBuffer: ArrayBuffer }) => {
            log.info(`Uploading ${path} to IPFS`)
            const group = await createGroup(metadata.minter)
            const ipfsHash = await uploadFile({ arrayBuffer, filename: last(split('/', path)) as string, group })
            console.log(ipfsHash)
            return ipfsHash
          },
        )

        Promise.all(pinataIpfsPromises)
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
      }

      // Update stored asset in DB
      await updateAsset(assetCID, Key, AssetStatus.pending, metadata, modifiedManifest)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const main = _main({
  readFile,
  writeFile,
  deleteFile,
  validateAndCreateMetadata,
  getAsset,
  updateAsset,
  uploadFile,
  createGroup,
})
