import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
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
  }: {
    getSignedUrl: typeof TgetSignedUrl
    s3Client: S3Client
    putObjectCommand: typeof PutObjectCommand
  }) =>
  async (filename: string) => {
    const command = new putObjectCommand({
      ACL: 'private',
      Key: `${filename}`,
      Bucket: process.env.NEXT_PUBLIC_ASSET_BUCKET_NAME,
    })

    return await getSignedUrl(s3Client, command)
  }

export const getAssetUploadUrl = _getAssetUploadUrl({ getSignedUrl, s3Client, putObjectCommand })

export const readStreamFromS3 = async ({ Bucket, Key }: { Bucket: string; Key: string }) => {
  try {
    const commandPullObject = new GetObjectCommand({
      Bucket,
      Key,
    })

    return s3Client.send(commandPullObject)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const writeStreamToS3 = (params: PutObjectCommandInput) =>
  new Upload({
    client: s3Client,
    params,
  })

export const deleteObjectFromS3 = async ({ Bucket, Key }: { Bucket: string; Key: string }) => {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket,
      Key,
    })

    return s3Client.send(deleteCommand)
  } catch (err) {
    console.error(err)
  }
}
