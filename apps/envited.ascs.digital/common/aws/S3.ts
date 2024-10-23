import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import type { getSignedUrl as TgetSignedUrl } from '@aws-sdk/s3-request-presigner'

import { createRandomString } from '../utils'

const randomString = createRandomString(5)

export const _getUniqueFilename = (randomString: string) => (slug: string, filename: string) =>
  `${slug}-${randomString}.${filename.split('.').pop()}`

export const getUniqueFilename = _getUniqueFilename(randomString)

export const getS3SignedUrl =
  ({ getSignedUrl, s3Client }: { getSignedUrl: typeof TgetSignedUrl; s3Client: S3Client }) =>
  (command: PutObjectCommand | GetObjectCommand) =>
    getSignedUrl(s3Client, command)

export const getUploadUrl = (getSignedUrl: (command: PutObjectCommand) => Promise<string>) => (filename: string) =>
  getSignedUrl(
    new PutObjectCommand({
      ACL: 'private',
      Key: filename,
      Bucket: process.env.NEXT_PUBLIC_UPLOAD_BUCKET_NAME || '',
    }),
  )

export const getUploadUploadUrl = (getSignedUrl: (command: PutObjectCommand) => Promise<string>) => (filename: string) =>
  getSignedUrl(
    new PutObjectCommand({
      ACL: 'private',
      Key: filename,
      Bucket: process.env.NEXT_PUBLIC_ASSET_BUCKET_NAME || '',
    }),
  )

export const getUploadDownloadUrl =
  (getSignedUrl: (command: GetObjectCommand) => Promise<string>) => (filename: string) =>
    getSignedUrl(
      new GetObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_ASSET_BUCKET_NAME || '',
        Key: filename,
      }),
    )

export const readStreamFromS3 =
  ({ s3Client }: { s3Client: S3Client }) =>
  ({ Bucket, Key }: { Bucket: string; Key: string }) =>
    s3Client.send(
      new GetObjectCommand({
        Bucket,
        Key,
      }),
    )

export const deleteObjectFromS3 =
  ({ s3Client }: { s3Client: S3Client }) =>
  ({ Bucket, Key }: { Bucket: string; Key: string }) =>
    s3Client.send(
      new DeleteObjectCommand({
        Bucket,
        Key,
      }),
    )

export const copyObjectToS3 =
  ({ s3Client }: { s3Client: S3Client }) =>
  ({ Bucket, CopySource, Key }: { Bucket: string; CopySource: string; Key: string }) =>
    s3Client.send(
      new CopyObjectCommand({
        Bucket,
        CopySource,
        Key,
      }),
    )

export const writeStreamToS3 =
  ({ s3Client }: { s3Client: S3Client }) =>
  (params: PutObjectCommandInput) =>
    new Upload({
      client: s3Client,
      params,
    })
