import { DeleteObjectCommandOutput, GetObjectCommandOutput, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Handler } from 'aws-lambda'
import { isNil, last, split } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { getAsset, updateAsset, validateAndCreateMetadata } from '../../../asset'
import { ExtractedFileWithCID, ManifestExtractedFiles } from '../../../asset/types'
import { deleteFile, readFile, writeFile } from '../../../aws'
import { createGroup, uploadFile, uploadJson } from '../../../ipfs'
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
    uploadJson,
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
      domainMetadata: Record<string, unknown>
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
    uploadJson: ({
      data,
      filename,
      group,
    }: {
      data: Record<string, unknown>
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

      console.log({ Key, Bucket })

      const { Body } = await readFile({ Key, Bucket })

      if (isNil(Body)) {
        return
      }
      const uploadedFile = await Body.transformToByteArray()

      // Validate uploaded asset
      const asset = await getAsset(Key)
      console.log({ asset })
      const { conforms, metadata, assetCID, modifiedManifest, files, visualizationFiles, domainMetadata } =
        await validateAndCreateMetadata(uploadedFile, asset)

      console.log({ conforms })

      if (!conforms) {
        // Revert if validation fails
        await deleteFile({ Bucket, Key })
        await updateAsset(Key, Key, AssetStatus.rejected)

        return
      }

      // Handle files for registered users
      console.log('EXTRACTED FILES', files)
      const { registeredUser } = files
      const group = await createGroup(metadata.minter)
      if (visualizationFiles) {
        const writeFilesToIpfsPromises = visualizationFiles.map(
          async ({ cid, arrayBuffer }: { cid: string; arrayBuffer: ArrayBuffer }) => {
            console.log('writeToIpfsBucket', { cid })
            const writeToIpfsBucket = writeFile({
              Bucket: process.env.NEXT_PUBLIC_IPFS_BUCKET_NAME,
              Key: `${assetCID}/${cid}`,
              Body: Buffer.from(arrayBuffer),
              ContentEncoding: 'base64',
              ContentDisposition: 'inline',
            })

            return writeToIpfsBucket.done()
          },
        )

        await Promise.all(writeFilesToIpfsPromises)

        const pinataIpfsPromises = visualizationFiles.map(
          async ({ path, arrayBuffer }: { path: string; arrayBuffer: ArrayBuffer }) => {
            log.info(`Uploading ${path} to IPFS with group ${group}`)
            log.info(arrayBuffer)
            const file = await uploadFile({ arrayBuffer, filename: last(split('/', path)) as string, group })
            log.info(file)
            return file
          },
        )

        await Promise.all(pinataIpfsPromises)
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

        await Promise.all(writeFilesToMetadataPromises)
      }

      const domainMetadataCID = await uploadJson({
        data: domainMetadata,
        filename: `${assetCID}-domain-metadata.json`,
        group,
      })
      log.info('Domain metadata CID', domainMetadataCID)

      const manifestCID = await uploadJson({
        data: modifiedManifest,
        filename: `${assetCID}-manifest.json`,
        group,
      })
      log.info('Manifest CID', manifestCID)

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
  uploadJson,
  createGroup,
})
