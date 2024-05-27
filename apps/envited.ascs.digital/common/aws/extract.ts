import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { S3Handler } from 'aws-lambda'

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

export const main: S3Handler = async event => {
  const s3Record = event.Records[0].s3

  const Key = s3Record.object.key
  const Bucket = s3Record.bucket.name

  if (Key.startsWith(prefix)) {
    return
  }

  const readStream = await readStreamFromS3({ Key, Bucket })
  console.log('/**** ReadStream - Response', readStream)
  console.log('/**** ReadStream - Body', readStream.Body)

  console.log('/*** Extract handler - Key ***/', Key)
  console.log('/*** Extract handler - Bucket ***/', Bucket)
  console.log('/*** Extract handler - S3Record ***/', s3Record)
}
