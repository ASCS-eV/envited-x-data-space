import { _getUploadUrl } from './S3'

describe('common/aws/S3', () => {
  describe('_getUploadUrl', () => {
    it('should return an info toast expected', async () => {
      // when ... we want to upload a file to S3 a bucket
      // then ... it should return the url as expected

      const getSignedUrl = jest.fn().mockResolvedValue('UPLOAD_URL')
      const s3Client = jest.fn() as any
      const putObjectCommand = jest.fn().mockResolvedValue({}) as any

      const slug = 'SLUG'
      const filename = 'FILE.TEST.jpeg'
      const randomString = 'RANDOM_STRING'

      const result = await _getUploadUrl({ getSignedUrl, s3Client, putObjectCommand, randomString })(slug, filename)

      expect(result).toEqual('UPLOAD_URL')
      expect(putObjectCommand).toHaveBeenCalledWith({
        ACL: 'private',
        Key: `${slug}-${randomString}.jpeg`,
        Bucket: undefined,
      })
    })
  })
})
