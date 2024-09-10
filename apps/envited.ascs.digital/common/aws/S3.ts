import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { getSignedUrl as AwsGetSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { getSignedUrl as TgetSignedUrl } from '@aws-sdk/s3-request-presigner'

import { createRandomString } from '../utils'

const s3Client = new S3Client({
  region: process.env.region || 'eu-central-1',
})
const randomString = createRandomString(5)

export const _getUniqueFilename = (randomString: string) => (slug: string, filename: string) =>
  `${slug}-${randomString}.${filename.split('.').pop()}`

export const getUniqueFilename = _getUniqueFilename(randomString)

export const _getS3SignedUrl =
  ({ getSignedUrl, s3Client }: { getSignedUrl: typeof TgetSignedUrl, s3Client: S3Client }) =>
  (command: PutObjectCommand | GetObjectCommand) =>
    getSignedUrl(s3Client, command)

export const getSignedUrl = _getS3SignedUrl({ getSignedUrl: AwsGetSignedUrl, s3Client })

export const getSignedDownloadUrl = ({ Bucket, Key }: { Bucket: string; Key: string }) =>
  getSignedUrl(
    new GetObjectCommand({
      Bucket,
      Key,
    }),
  )

export const getSignedUploadUrl = ({ Bucket, Key }: { Bucket: string; Key: string }) =>
  getSignedUrl(
    new PutObjectCommand({
      ACL: 'private',
      Key,
      Bucket,
    }),
  )

export const getUploadUrl = (filename: string) =>
  getSignedUploadUrl({ Bucket: process.env.NEXT_PUBLIC_UPLOAD_BUCKET_NAME || '', Key: filename })

export const getAssetUploadUrl = (filename: string) =>
  getSignedUploadUrl({ Bucket: process.env.NEXT_PUBLIC_ASSET_BUCKET_NAME || '', Key: filename })

export const getAssetDownloadUrl = (filename: string) =>
  getSignedDownloadUrl({ Bucket: process.env.NEXT_PUBLIC_ASSET_BUCKET_NAME || '', Key: filename })

export const _sendS3Command = ({ s3Client }: { s3Client: S3Client }) => s3Client.send

export const sendS3Command = _sendS3Command({ s3Client })

export const readStreamFromS3 = ({ Bucket, Key }: { Bucket: string; Key: string }) =>
  sendS3Command(
    new GetObjectCommand({
      Bucket,
      Key,
    }),
  )

export const deleteObjectFromS3 = ({ Bucket, Key }: { Bucket: string; Key: string }) =>
  sendS3Command(
    new DeleteObjectCommand({
      Bucket,
      Key,
    }),
  )

export const copyObjectToS3 = ({ Bucket, CopySource, Key }: { Bucket: string; CopySource: string; Key: string }) =>
  sendS3Command(
    new CopyObjectCommand({
      Bucket,
      CopySource,
      Key,
    }),
  )

export const writeStreamToS3 = (params: PutObjectCommandInput) =>
  new Upload({
    client: s3Client,
    params,
  })
