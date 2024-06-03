import { GetObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Handler } from 'aws-lambda'
import { isNil } from 'ramda'

import { extractFileFromZipByteArray, readContentFromJsonFile } from '../archive'

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

const getMetadataJsonFromByteArray = async (byteArray: Uint8Array) =>
  extractFileFromZipByteArray(byteArray, 'metadata.json').then(readContentFromJsonFile)

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
      const metadataContent = await getMetadataJsonFromByteArray(byteArray)
      const metadataBuffer = createMetadataBuffer({ name: metadataContent.title })
      const upload = writeStreamToS3({
        Bucket: process.env.NEXT_PUBLIC_METADATA_BUCKET_NAME,
        Key: `${prefix}-${Key}-metadata.json`,
        Body: metadataBuffer,
        ContentEncoding: 'base64',
        ContentType: 'application/json',
      })

      await upload.done()
    }
  } catch (e) {
    console.log(e)
  }
}
