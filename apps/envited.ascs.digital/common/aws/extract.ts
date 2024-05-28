import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { BlobReader, Entry, ZipReader } from '@zip.js/zip.js'
import { S3Handler } from 'aws-lambda'
import { find, has, isNil, propEq } from 'ramda'

import { extractFromReadable } from '../archive'

// import { readContentFromJsonFile } from '../validator/json/json'

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

export const getMetadataJsonFromStream = async (readable: ReadableStream, fileName: string) => {
  const metadata = await extractFromReadable(readable, fileName) //.then(readContentFromJsonFile)
  console.log('/**** extractFromReadable', metadata)

  return metadata
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
    console.log('***** Body *****', Body)
    if (!isNil(Body)) {
      const blob = await Body.transformToByteArray()

      console.log('***** Blob *****', blob)
      //const arrayReader = new Uint8ArrayReader(blob)
      // const blobReady = new BlobReader(blob as any)
      const reader = new ZipReader(
        new BlobReader(
          new Blob([blob], {
            type: 'application/zip',
          }),
        ),
      )
      //const reader = new ZipReader(arrayReader)
      console.log('***** ZipReader *****', reader)
      const entries = await reader.getEntries()
      reader.close()
      console.log('entries', entries)
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
