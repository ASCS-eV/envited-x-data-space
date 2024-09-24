import { getS3SignedUrl } from './S3'

describe('common/aws/S3', () => {
  describe('getSignedUploadUrl', () => {
    it('should return an info toast expected', async () => {
      // when ... we want to upload a file to S3 a bucket
      // then ... it should return the url as expected

      const getSignedUrl = jest.fn().mockResolvedValue('UPLOAD_URL')
      const s3Client = 'S3_CLIENT'

      const filename = 'FILE.TEST.jpeg'
      const bucket = 'BUCKET_NAME'
      const putObjectCommand = {
        Bucket: bucket,
        Key: filename,
      }

      const result = await getS3SignedUrl({ getSignedUrl, s3Client: s3Client as any })(putObjectCommand as any)

      expect(result).toEqual('UPLOAD_URL')
      expect(getSignedUrl).toHaveBeenCalledWith('S3_CLIENT', {
        Key: 'FILE.TEST.jpeg',
        Bucket: 'BUCKET_NAME',
      })
    })
  })
})
