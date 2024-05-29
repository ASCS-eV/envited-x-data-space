import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { BlobReader } from '@zip.js/zip.js'
import { S3Handler } from 'aws-lambda'
import { isNil } from 'ramda'

import { extractFromReadable } from '../archive'
import { readContentFromJsonFile } from '../validator/json/json'

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

export const getMetadataJsonFromStream = async (readable: any, fileName: string) =>
  extractFromReadable(readable, fileName).then(readContentFromJsonFile)

export const main: S3Handler = async event => {
  try {
    const s3Record = event.Records[0].s3

    const Key = s3Record.object.key
    const Bucket = s3Record.bucket.name

    if (Key.startsWith(prefix)) {
      return
    }

    const { Body } = await readStreamFromS3({ Key, Bucket })
    console.log('***** Body *****', Body)
    if (!isNil(Body)) {
      const blob = await Body.transformToByteArray()
      const readableStream = new BlobReader(
        new Blob([blob], {
          type: 'application/zip',
        }),
      )

      const metadata = await getMetadataJsonFromStream(readableStream, 'metadata.json')
      console.log('***** Metadata *****', metadata)
      const metadataBuffer = createMetadataBuffer({ name: metadata.title })
      const { upload } = writeToMetadataS3Bucket({
        Bucket: 'staging-envitedascsdigital--metadatabucket8ef2ffce-tewzue4uwey3',
        Key,
        buf: metadataBuffer,
      })

      await upload.done()
    }
    // console.log('/*** metadata', metadata)
    // console.log('/**** ReadStream - Response', readStream)
    // console.log('/**** ReadStream - Body', readStream.Body)

    // console.log('/*** Extract handler - Key ***/', Key)
    // console.log('/*** Extract handler - Bucket ***/', Bucket)
    // console.log('/*** Extract handler - S3Record ***/', s3Record)
  } catch (e) {
    console.log(e)
  }
}

export const writeToMetadataS3Bucket = ({ Bucket, Key, buf }: { Bucket: string; Key: string; buf: Buffer }) => {
  const upload = new Upload({
    client: S3,
    params: {
      Bucket: Bucket,
      Key: `${Key}-metadata.json`,
      Body: buf,
      // ContentEncoding: 'base64',
      // ContentType: 'application/json',
    },
  })

  return {
    writeStream: buf,
    upload,
  }
}

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
