import {
  CopyObjectCommandOutput,
  DeleteObjectCommandOutput,
  GetObjectCommandOutput,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Handler } from 'aws-lambda'
import { isNil } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { getAsset, updateAsset, validateAndCreateMetadata } from '../../../asset'
import { ManifestExtractedFiles } from '../../../asset/types'
import { copyFile, deleteFile, readFile, writeFile } from '../../../aws'
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
      const s3Record = event.Records[0].s3

      const Key = s3Record.object.key
      const Bucket = s3Record.bucket.name

      const { Body } = await readFile({ Key, Bucket })

      if (isNil(Body)) {
        return
      }

      const byteArray = await Body.transformToByteArray()
      const asset = await getAsset(Key)
      const { conforms, metadata, assetCID, modifiedManifest, files } = await validateAndCreateMetadata(
        byteArray,
        asset,
      )

      if (!conforms) {
        await deleteFile({ Bucket, Key })
        await updateAsset(Key, Key, AssetStatus.not_accepted)

        return
      }

      /* Save asset ZIP file as CID */
      await copyFile({
        Bucket,
        CopySource: `${Bucket}/${Key}`,
        Key: assetCID,
      })

      const { registeredUser } = files

      if (registeredUser) {
        const writeFilesToMetadataPromises = registeredUser.map(
          async ({ path, buffer }: { path: string; buffer: string }) => {
            const writeToMetadata = writeFile({
              Bucket: process.env.NEXT_PUBLIC_METADATA_BUCKET_NAME,
              Key: `${assetCID}/${path}`,
              Body: Buffer.from(buffer),
              ContentEncoding: 'base64',
            })

            return writeToMetadata.done()
          },
        )

        Promise.all(writeFilesToMetadataPromises)
      }

      await updateAsset(assetCID, Key, AssetStatus.pending, metadata, modifiedManifest)
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
