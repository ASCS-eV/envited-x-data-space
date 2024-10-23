import {
  CopyObjectCommandOutput,
  DeleteObjectCommandOutput,
  GetObjectCommandOutput,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3'
import { Upload as S3Upload } from '@aws-sdk/lib-storage'
import { S3Handler } from 'aws-lambda'
import { isNil } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { updateUpload, validateAndCreateMetadata } from '../../../upload'
import { copyFile, deleteFile, readFile, writeFile } from '../..'
import { Upload, UploadMetadata, UploadStatus } from '../../../types'

export const _main =
  ({
    readFile,
    writeFile,
    copyFile,
    deleteFile,
    validateAndCreateMetadata,
    updateUpload,
  }: {
    readFile: ({ Bucket, Key }: { Bucket: string; Key: string }) => Promise<GetObjectCommandOutput>
    writeFile: (params: PutObjectCommandInput) => S3Upload
    copyFile: ({
      Bucket,
      CopySource,
      Key,
    }: {
      Bucket: string
      CopySource: string
      Key: string
    }) => Promise<CopyObjectCommandOutput | undefined>
    deleteFile: ({ Bucket, Key }: { Bucket: string; Key: string }) => Promise<DeleteObjectCommandOutput | undefined>
    validateAndCreateMetadata: (byteArray: Uint8Array) => Promise<{
      conforms: boolean
      reports: (ValidationReport<any> | { conforms: boolean })[] | { conforms: boolean }[]
      metadata: UploadMetadata
      uploadCID: string
      metadataCID: string
    }>
    updateUpload: (newCid: string, oldCid: string, status: UploadStatus, metadata?: UploadMetadata) => Promise<Upload>
  }): S3Handler =>
  async event => {
    try {
      const s3Record = event.Records[0].s3

      const Key = s3Record.object.key
      const Bucket = s3Record.bucket.name

      const { Body } = await readFile({ Key, Bucket })

      if (isNil(Body)) {
        return
      }

      const byteArray = await Body.transformToByteArray()
      const { conforms, metadata, uploadCID, metadataCID } = await validateAndCreateMetadata(byteArray)

      if (!conforms) {
        await deleteFile({ Bucket, Key })
        await updateUpload(Key, Key, UploadStatus.not_accepted)

        return
      }

      await copyFile({
        Bucket,
        CopySource: `${Bucket}/${Key}`,
        Key: uploadCID,
      })

      const writeMetadata = writeFile({
        Bucket: process.env.NEXT_PUBLIC_METADATA_BUCKET_NAME,
        Key: metadataCID,
        Body: Buffer.from(JSON.stringify(metadata)),
        ContentEncoding: 'base64',
        ContentType: 'application/json',
      })

      await writeMetadata.done()
      await updateUpload(uploadCID, Key, UploadStatus.pending, metadata)
      await deleteFile({ Bucket, Key })
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const main = _main({
  readFile,
  writeFile,
  copyFile,
  deleteFile,
  validateAndCreateMetadata,
  updateUpload,
})
