import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { BlobReader, Entry, ZipReader } from '@zip.js/zip.js'
import { S3Handler } from 'aws-lambda'
import { find, has, isNil, propEq } from 'ramda'

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

      // console.log('***** Blob *****', blob)
      //const arrayReader = new Uint8ArrayReader(blob)
      //const blobReady = new BlobReader(blob as any)
      //const reader = new ZipReader(arrayReader)
      // const reader = new ZipReader(
      //   new BlobReader(
      //     new Blob([blob], {
      //       type: 'application/zip',
      //     }),
      //   ),
      // )
      // console.log('***** ZipReader *****', reader)
      // const metadata = await reader.getEntries().then((entries: Entry[]) => {
      //   if (entries.length === 0) {
      //     return []
      //   }
      //   return find(propEq('metadata.json', 'filename'))(entries)
      // })
      // .catch(() => undefined)
      // .finally(() => reader.close())

      // console.log('metadata', metadata)
      /*
      const metadata = reader
        .getEntries()
        .then((entries: Entry[]) => {
          console.log('***** Entries *****', entries)
          if (entries.length === 0) {
            return []
          }
          return find(propEq('metadata.json', 'filename'))(entries)
        })
        .catch(() => undefined)
        .finally(() => reader.close())
      */
      // const buffer = Buffer.from(blob)
      // console.log('***** Buffer *****', buffer)
      // const zip = new AdmZip(buffer.toString('utf-8'), {})
      // console.log('***** AdmZip *****', zip)
      // const zipEntries = zip.getEntries()

      // console.log('***** Metadata *****', metadata)
    }
    // const readableStream = readStream.Body as ReadableStream
    // const metadata = await getMetadataJsonFromStream(readableStream, 'metadata.json')

    /*
  const reader = new ZipReader(readableStream as ReadableStream) //new BlobReader(archive))
  console.log('/*** ZipReader', reader)
  const metadata = reader
    .getEntries()
    .then((entries: Entry[]) => {
      // console.log('/*** Entries', entries)
      if (entries.length === 0) {
        return []
      }
      return find(propEq('metadata.json', 'filename'))(entries)
    })
    .catch(() => undefined)
    .finally(() => reader.close())
  */
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
