import { S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl as AwsGetSignedUrl } from '@aws-sdk/s3-request-presigner'

import {
  copyObjectToS3 as _copyObjectToS3,
  deleteObjectFromS3 as _deleteObjectFromS3,
  getAssetUploadUrl as _getAssetUploadUrl,
  getAssetDownloadUrl as _getAssetDownloadUrl,
  getUploadUrl as _getUploadUrl,
  getS3SignedUrl as _getS3SignedUrl,
  readStreamFromS3 as _readStreamFromS3,
  writeStreamToS3 as _writeStreamToS3,
} from './S3'

export { getUniqueFilename } from './S3'

const s3Client = new S3Client({
  region: process.env.region || 'eu-central-1',
})

export const getSignedUrl = _getS3SignedUrl({ getSignedUrl: AwsGetSignedUrl, s3Client })

export const copyFile = _copyObjectToS3({ s3Client })

export const deleteFile = _deleteObjectFromS3({ s3Client })

export const writeFile = _writeStreamToS3({ s3Client })

export const readFile = _readStreamFromS3({ s3Client })

export const getUploadUrl = _getUploadUrl(getSignedUrl)

export const getAssetDownloadUrl = _getAssetDownloadUrl(getSignedUrl)

export const getAssetUploadUrl = _getAssetUploadUrl(getSignedUrl)
