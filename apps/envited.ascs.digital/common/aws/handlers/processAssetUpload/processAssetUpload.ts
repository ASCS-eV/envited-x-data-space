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

import { updateAsset, validateAndCreateMetadata } from '../../../asset'
import { Asset, AssetMetadata, AssetStatus } from '../../../types'
import { copyObjectToS3, deleteObjectFromS3, readStreamFromS3, writeStreamToS3 } from '../../S3'

export const _main =
  ({
    readStreamFromS3,
    writeStreamToS3,
    copyObjectToS3,
    deleteObjectFromS3,
    validateAndCreateMetadata,
    updateAsset,
  }: {
    readStreamFromS3: ({ Bucket, Key }: { Bucket: string; Key: string }) => Promise<GetObjectCommandOutput>
    writeStreamToS3: (params: PutObjectCommandInput) => Upload
    copyObjectToS3: ({
      Bucket,
      CopySource,
      Key,
    }: {
      Bucket: string
      CopySource: string
      Key: string
    }) => Promise<CopyObjectCommandOutput | undefined>
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
    updateAsset: (newCid: string, oldCid: string, status: AssetStatus, metadata?: AssetMetadata) => Promise<Asset>
  }): S3Handler =>
  async event => {
    try {
      const s3Record = event.Records[0].s3

      const Key = s3Record.object.key
      const Bucket = s3Record.bucket.name

      const { Body } = await readStreamFromS3({ Key, Bucket })

      if (isNil(Body)) {
        return
      }

      const byteArray = await Body.transformToByteArray()
      const { report, metadata, assetCID, metadataCID } = await validateAndCreateMetadata(
        byteArray,
        'metadata/domainMetadata.json',
      )

      if (!report.conforms) {
        await deleteObjectFromS3({ Bucket, Key })
        await updateAsset(Key, Key, AssetStatus.not_accepted)

        return
      }

      await copyObjectToS3({
        Bucket,
        CopySource: `${Bucket}/${Key}`,
        Key: assetCID,
      })

      const writeMetadata = writeStreamToS3({
        Bucket: process.env.NEXT_PUBLIC_METADATA_BUCKET_NAME,
        Key: metadataCID,
        Body: Buffer.from(JSON.stringify(metadata)),
        ContentEncoding: 'base64',
        ContentType: 'application/json',
      })

      await writeMetadata.done()
      await updateAsset(assetCID, Key, AssetStatus.pending, metadata)
      await deleteObjectFromS3({ Bucket, Key })
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const main = _main({
  readStreamFromS3,
  writeStreamToS3,
  copyObjectToS3,
  deleteObjectFromS3,
  validateAndCreateMetadata,
  updateAsset,
})
