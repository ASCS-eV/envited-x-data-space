import { _getSignedUploadUrl } from './S3'

describe('common/aws/S3', () => {
  describe('_getSignedUploadUrl', () => {
    it('should return an info toast expected', async () => {
      // when ... we want to upload a file to S3 a bucket
      // then ... it should return the url as expected

      const getSignedUrl = jest.fn().mockResolvedValue('UPLOAD_URL')
      const s3Client = jest.fn() as any
      const putObjectCommand = jest.fn().mockResolvedValue({}) as any

      const filename = 'FILE.TEST.jpeg'
      const bucket = 'BUCKET_NAME'

      const result = await _getSignedUploadUrl({ getSignedUrl, s3Client, putObjectCommand })(bucket)(filename)

      expect(result).toEqual('UPLOAD_URL')
      expect(putObjectCommand).toHaveBeenCalledWith({
        ACL: 'private',
        Key: `${filename}`,
        Bucket: 'BUCKET_NAME',
      })
    })
  })
})
