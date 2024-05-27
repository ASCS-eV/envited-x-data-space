import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { getSignedUrl as TgetSignedUrl } from '@aws-sdk/s3-request-presigner'

import { createRandomString } from '../utils'

const s3Client = new S3Client({})
const putObjectCommand = PutObjectCommand
const randomString = createRandomString(5)

export const _getUniqueFilename = (randomString: string) => (slug: string, filename: string) =>
  `${slug}-${randomString}.${filename.split('.').pop()}`

export const getUniqueFilename = _getUniqueFilename(randomString)

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
  async (filename: string) => {
    const command = new putObjectCommand({
      ACL: 'private',
      Key: `${filename}`,
      Bucket: process.env.NEXT_PUBLIC_UPLOAD_BUCKET_NAME,
    })

    return await getSignedUrl(s3Client, command)
  }

export const getUploadUrl = _getUploadUrl({ getSignedUrl, s3Client, putObjectCommand })

export const _getAssetUploadUrl =
  ({
    getSignedUrl,
    s3Client,
    putObjectCommand,
    randomString,
  }: {
    getSignedUrl: typeof TgetSignedUrl
    s3Client: S3Client
    putObjectCommand: typeof PutObjectCommand
    randomString: string
  }) =>
  async (pkh: string, slug: string, filename: string) => {
    const command = new putObjectCommand({
      ACL: 'private',
      Key: `${slug}-${randomString}.${filename.split('.').pop()}`,
      Bucket: process.env.NEXT_PUBLIC_ASSET_BUCKET_NAME,
    })

    return await getSignedUrl(s3Client, command)
  }

export const getAssetUploadUrl = _getAssetUploadUrl({ getSignedUrl, s3Client, putObjectCommand, randomString })
