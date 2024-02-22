import { Bucket } from 'sst/node/bucket'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'

export async function uploadBucketUrl() {
  const command = new PutObjectCommand({
    ACL: 'public-read',
    Key: crypto.randomUUID(),
    Bucket: Bucket.public.bucketName,
  })
  const url = await getSignedUrl(new S3Client({}), command)

  return url
}
