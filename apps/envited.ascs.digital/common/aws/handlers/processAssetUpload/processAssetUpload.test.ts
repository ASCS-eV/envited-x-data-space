import * as SUT from './processAssetUpload'

describe('common/aws/handlers/processAssetUpload', () => {
  describe('_main', () => {
    it('should extract and write metadata to a bucket', async () => {
      // when ... we want extract data from a asset and upload to a different bucket
      // then ... it should validate, extract and upload to a bucket
      const uploadStub = jest.fn().mockResolvedValue('UPLOAD_URL')
      const transformToByteArrayStub = jest.fn().mockResolvedValue('ASSET_BYTE_ARRAY')
      const readStreamFromS3Stub = jest.fn().mockResolvedValue({
        Body: {
          transformToByteArray: transformToByteArrayStub,
        },
      }) as any
      const validateShaclDataWithSchemaStub = jest
        .fn()
        .mockResolvedValue({ report: { conforms: true }, metadata: 'METADATA' }) as any
      const writeStreamToS3Stub = jest.fn().mockReturnValue({
        done: uploadStub,
      }) as any
      const deleteObjectFromS3Stub = jest.fn().mockReturnValue('SHACL_DATA') as any
      const updateAssetStatusStub = jest.fn().mockReturnValue('UPDATED') as any

      const event = {
        Records: [
          {
            s3: {
              object: {
                key: 'OBJECT_KEY',
              },
              bucket: {
                name: 'BUCKET_NAME',
              },
            },
          },
        ],
      }
      const context = '' as any
      const callback = () => {}

      const result = await SUT._main({
        readStreamFromS3: readStreamFromS3Stub,
        writeStreamToS3: writeStreamToS3Stub,
        deleteObjectFromS3: deleteObjectFromS3Stub,
        validateAndCreateMetadata: validateShaclDataWithSchemaStub,
        updateAssetStatus: updateAssetStatusStub,
      })(event as any, context, callback)

      expect(result).toEqual(undefined)
      expect(readStreamFromS3Stub).toHaveBeenCalledWith({ Bucket: 'BUCKET_NAME', Key: 'OBJECT_KEY' })
      expect(validateShaclDataWithSchemaStub).toHaveBeenCalledWith('ASSET_BYTE_ARRAY', 'data.jsonld')
      expect(validateShaclDataWithSchemaStub).toHaveBeenCalledTimes(1)
      expect(writeStreamToS3Stub).toHaveBeenCalledTimes(2)
      /*
      expect(writeStreamToS3Stub).toHaveBeenCalledWith({
        Body: Buffer.from(JSON.stringify('METADATA')),
        Bucket: undefined,
        ContentEncoding: 'base64',
        ContentType: 'application/json',
        Key: 'extract-OBJECT_KEY-metadata.json',
      })
      */
      expect(deleteObjectFromS3Stub).toHaveBeenCalledTimes(0)
    })
  })
})
