import { DeleteObjectCommand, GetObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Handler } from 'aws-lambda'
import fs from 'fs'
import path from 'path'
import { isNil } from 'ramda'

import { extractFileFromZipByteArray, read, readContentFromJsonFile } from '../../archive'
import { validateShaclDataWithSchema } from '../../validator'
import { SCHEMA_MAP } from './validateAndExtractMetadata.utils'

const prefix = `extract`

const S3 = new S3Client({})

const readStreamFromS3 = async ({ Bucket, Key }: { Bucket: string; Key: string }) => {
  try {
    const commandPullObject = new GetObjectCommand({
      Bucket,
      Key,
    })
    const response = await S3.send(commandPullObject)

    return response
  } catch (err) {
    console.log(err)
    throw err
  }
}

const writeStreamToS3 = (params: PutObjectCommandInput) =>
  new Upload({
    client: S3,
    params,
  })

const deleteObjectFromS3 = async ({ Bucket, Key }: { Bucket: string; Key: string }) => {
  const deleteCommand = new DeleteObjectCommand({
    Bucket,
    Key,
  })

  try {
    const response = await S3.send(deleteCommand)
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

// const getMetadataJsonFromByteArray = async (byteArray: Uint8Array) =>
//   extractFileFromZipByteArray(byteArray, 'metadata.json').then(readContentFromJsonFile)

const getFileFromByteArray = async (byteArray: Uint8Array, filename: string) =>
  extractFileFromZipByteArray(byteArray, filename).then(read)

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

export const main: S3Handler = async event => {
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

      console.log('******* path *****', path.resolve('./schemas/shaclSchema.ttl'))
      console.log('******* process *****', process.env.LAMBDA_TASK_ROOT)
      const test = fs.createReadStream(
        process.env.LAMBDA_TASK_ROOT + '/common/aws/validateAndExtractMetadata/schemas/shaclSchema.ttl',
      )
      console.log('******* FS Schema *****', test)

      const shaclData = JSON.parse(data)
      const report = await validateShaclDataWithSchema(data, test)

      console.log('validateShaclDataWithSchema - report', report)

      if (report.conforms) {
        // const metadataContent = await getMetadataJsonFromByteArray(byteArray)
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