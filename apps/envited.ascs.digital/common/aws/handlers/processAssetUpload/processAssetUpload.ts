import { DeleteObjectCommandOutput, GetObjectCommandOutput, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Handler } from 'aws-lambda'
import { isNil } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { validateAndCreateMetadata } from '../../../asset'
import { deleteObjectFromS3, readStreamFromS3, writeStreamToS3 } from '../../S3'

const prefix = `extract`

export const _main =
  ({
    readStreamFromS3,
    validateAndCreateMetadata,
    writeStreamToS3,
    deleteObjectFromS3,
  }: {
    readStreamFromS3: ({ Bucket, Key }: { Bucket: string; Key: string }) => Promise<GetObjectCommandOutput>
    validateAndCreateMetadata: (
      byteArray: Uint8Array,
      filename: string,
    ) => Promise<{ report: ValidationReport<any> | { conforms: boolean }; metadata: Buffer }>
    writeStreamToS3: (params: PutObjectCommandInput) => Upload
    deleteObjectFromS3: ({
      Bucket,
      Key,
    }: {
      Bucket: string
      Key: string
    }) => Promise<DeleteObjectCommandOutput | undefined>
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
      const { report, metadata } = await validateAndCreateMetadata(byteArray, 'data.jsonld')

      if (!report.conforms) {
        await deleteObjectFromS3({ Bucket, Key })

        return
      }

      const upload = writeStreamToS3({
        Bucket: process.env.NEXT_PUBLIC_METADATA_BUCKET_NAME,
        Key: `${prefix}-${Key}-metadata.json`,
        Body: metadata,
        ContentEncoding: 'base64',
        ContentType: 'application/json',
      })

      await upload.done()
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const main = _main({
  readStreamFromS3,
  validateAndCreateMetadata,
  writeStreamToS3,
  deleteObjectFromS3,
})
