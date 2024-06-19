import { DeleteObjectCommandOutput, GetObjectCommandOutput, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Handler } from 'aws-lambda'
import { isNil } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { updateAssetStatus, validateAndCreateMetadata } from '../../../asset'
import { Asset, AssetMetadata, AssetStatus } from '../../../types'
import { deleteObjectFromS3, readStreamFromS3, writeStreamToS3 } from '../../S3'

const prefix = `extract`

export const _main =
  ({
    readStreamFromS3,
    writeStreamToS3,
    deleteObjectFromS3,
    validateAndCreateMetadata,
    updateAssetStatus,
  }: {
    readStreamFromS3: ({ Bucket, Key }: { Bucket: string; Key: string }) => Promise<GetObjectCommandOutput>
    writeStreamToS3: (params: PutObjectCommandInput) => Upload
    deleteObjectFromS3: ({
      Bucket,
      Key,
    }: {
      Bucket: string
      Key: string
    }) => Promise<DeleteObjectCommandOutput | undefined>
    validateAndCreateMetadata: (
      byteArray: Uint8Array,
      filename: string,
    ) => Promise<{
      report: ValidationReport<any> | { conforms: boolean }
      metadata: AssetMetadata
      assetCID: string
      metadataCID: string
    }>
    updateAssetStatus: (cid: string, status: AssetStatus, metadata?: AssetMetadata) => Promise<Asset>
  }): S3Handler =>
  async event => {
    try {
      const s3Record = event.Records[0].s3

      const Key = s3Record.object.key
      const Bucket = s3Record.bucket.name

      if (Key.startsWith(prefix)) {
        return
      }

      const { Body } = await readStreamFromS3({ Key, Bucket })

      if (isNil(Body)) {
        return
      }

      const byteArray = await Body.transformToByteArray()
      const { report, metadata, assetCID, metadataCID } = await validateAndCreateMetadata(byteArray, 'data.jsonld')

      if (!report.conforms) {
        await deleteObjectFromS3({ Bucket, Key })
        await updateAssetStatus(Key, AssetStatus.not_accepted)

        return
      }

      const renameAssetToCID = writeStreamToS3({
        Bucket: process.env.NEXT_PUBLIC_ASSET_BUCKET_NAME,
        Key: `${assetCID}`, //`${prefix}-${Key}-metadata.json`,
        Body: Body,
        // ContentEncoding: 'base64',
        ContentType: 'application/zip',
      })

      await renameAssetToCID.done()

      const writeMetadata = writeStreamToS3({
        Bucket: process.env.NEXT_PUBLIC_METADATA_BUCKET_NAME,
        Key: `${metadataCID}`, //`${prefix}-${Key}-metadata.json`,
        Body: Buffer.from(JSON.stringify(metadata)),
        ContentEncoding: 'base64',
        ContentType: 'application/json',
      })

      await writeMetadata.done()
      await updateAssetStatus(Key, AssetStatus.pending, metadata)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const main = _main({
  readStreamFromS3,
  writeStreamToS3,
  deleteObjectFromS3,
  validateAndCreateMetadata,
  updateAssetStatus,
})
