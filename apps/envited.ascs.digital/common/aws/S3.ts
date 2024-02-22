import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { getSignedUrl as TgetSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'
import { Bucket } from 'sst/node/bucket'

const s3Client = new S3Client({})
const putObjectCommand = PutObjectCommand

export const _getUploadUrl =
  ({
    getSignedUrl,
    s3Client,
    putObjectCommand,
  }: {
    getSignedUrl: typeof TgetSignedUrl
    s3Client: S3Client
    putObjectCommand: typeof PutObjectCommand
  }) =>
  () => {
    const command = new putObjectCommand({
      ACL: 'public-read',
      Key: crypto.randomUUID(),
      Bucket: (Bucket as any).public.bucketName,
    })

    return getSignedUrl(s3Client, command)
  }

export const getUploadUrl = _getUploadUrl({ getSignedUrl, s3Client, putObjectCommand })
