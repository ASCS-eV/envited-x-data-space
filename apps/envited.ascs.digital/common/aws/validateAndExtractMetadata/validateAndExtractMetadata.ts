import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Handler } from 'aws-lambda'
import fs from 'fs'
import { isNil } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromByteArray, read } from '../../archive'
import { validateShaclDataWithSchema } from '../../validator'
import { SCHEMA_MAP } from '../../validator/shacl/shacl.constants'
import { Schemas } from '../../validator/shacl/shacl.types'

const prefix = `extract`

const S3 = new S3Client({})

export const readStreamFromS3 = async ({ Bucket, Key }: { Bucket: string; Key: string }) => {
  try {
    const commandPullObject = new GetObjectCommand({
      Bucket,
      Key,
    })

    return S3.send(commandPullObject)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const writeStreamToS3 = (params: PutObjectCommandInput) =>
  new Upload({
    client: S3,
    params,
  })

export const deleteObjectFromS3 = async ({ Bucket, Key }: { Bucket: string; Key: string }) => {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket,
      Key,
    })

    return S3.send(deleteCommand)
  } catch (err) {
    console.error(err)
  }
}

export const getFileFromByteArray = async (byteArray: Uint8Array, filename: string) =>
  extractFromByteArray(byteArray, filename).then(read)

export const createMetadataBuffer = ({ name }: { name: string }) => {
  const data = {
    name,
    symbol: 'ENVITED',
    decimals: 2,
    shouldPreferSymbol: true,
    thumbnailUri: 'THUMBNAIL_URI',
  }

  return Buffer.from(JSON.stringify(data))
}

export const _main =
  ({
    readStreamFromS3,
    getFileFromByteArray,
    validateShaclDataWithSchema,
    createMetadataBuffer,
    writeStreamToS3,
    deleteObjectFromS3,
  }: {
    readStreamFromS3: ({ Bucket, Key }: { Bucket: string; Key: string }) => Promise<GetObjectCommandOutput>
    getFileFromByteArray: (byteArray: Uint8Array, filename: string) => Promise<string>
    validateShaclDataWithSchema: (data: string, stream: NodeJS.ReadableStream) => Promise<any>
    createMetadataBuffer: ({ name }: { name: string }) => Buffer
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

      if (!isNil(Body)) {
        const byteArray = await Body.transformToByteArray()
        const data = await getFileFromByteArray(byteArray, 'data.jsonld')

        const shaclData = JSON.parse(data)
        const type = shaclData['@type'] as Schemas
        const schema = fs.createReadStream(`${__dirname}/schemas/${SCHEMA_MAP[type]}`)

        const report = await validateShaclDataWithSchema(data, schema)

        if (report.conforms) {
          const metadataBuffer = createMetadataBuffer({ name: shaclData.name[0] })
          const upload = writeStreamToS3({
            Bucket: process.env.NEXT_PUBLIC_METADATA_BUCKET_NAME,
            Key: `${prefix}-${Key}-metadata.json`,
            Body: metadataBuffer,
            ContentEncoding: 'base64',
            ContentType: 'application/json',
          })

          await upload.done()
        } else {
          await deleteObjectFromS3({ Bucket, Key })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

export const main = _main({
  readStreamFromS3,
  getFileFromByteArray,
  validateShaclDataWithSchema,
  createMetadataBuffer,
  writeStreamToS3,
  deleteObjectFromS3,
})
