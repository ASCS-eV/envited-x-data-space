import { S3Handler } from 'aws-lambda'

const prefix = `extract`

export const main: S3Handler = async event => {
  const s3Record = event.Records[0].s3

  const Key = s3Record.object.key
  const Bucket = s3Record.bucket.name

  if (Key.startsWith(prefix)) {
    return
  }

  console.log('/*** Extract handler - Key ***/', Key)
  console.log('/*** Extract handler - Bucket ***/', Bucket)
  console.log('/*** Extract handler - S3Record ***/', s3Record)
}
