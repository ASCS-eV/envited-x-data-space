import * as SUT from './processAssetUpload'

describe('common/aws/handlers/processAssetUpload', () => {
  describe('_main', () => {
    it('should extract and write metadata to a bucket', async () => {
      // when ... we want extract data from a asset and upload to a different bucket
      // then ... it should validate, extract and upload to a bucket
      const uploadStub = jest.fn().mockResolvedValue('UPLOAD_URL')
      const transformToByteArrayStub = jest.fn().mockResolvedValue('ASSET_BYTE_ARRAY')
      const readFileStub = jest.fn().mockResolvedValue({
        Body: {
          transformToByteArray: transformToByteArrayStub,
        },
      }) as any
      const validateShaclDataWithSchemaStub = jest.fn().mockResolvedValue({
        conforms: true,
        reports: { conforms: true },
        metadata: 'METADATA',
        assetCID: 'ASSET_CID',
        metadataCID: 'METADATA_CID',
      }) as any
      const writeFileStub = jest.fn().mockReturnValue({
        done: uploadStub,
      }) as any
      const copyFileStub = jest.fn().mockResolvedValue('COPIED') as any
      const deleteFileStub = jest.fn().mockReturnValue('SHACL_DATA') as any
      const getAssetStatusStub = jest.fn().mockReturnValue('ASSET_CID') as any
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
        readFile: readFileStub,
        writeFile: writeFileStub,
        copyFile: copyFileStub,
        deleteFile: deleteFileStub,
        validateAndCreateMetadata: validateShaclDataWithSchemaStub,
        getAsset: getAssetStatusStub,
        updateAsset: updateAssetStatusStub,
      })(event as any, context, callback)

      expect(result).toEqual(undefined)
      expect(readFileStub).toHaveBeenCalledWith({ Bucket: 'BUCKET_NAME', Key: 'OBJECT_KEY' })
      expect(validateShaclDataWithSchemaStub).toHaveBeenCalledWith('ASSET_BYTE_ARRAY', 'ASSET_CID')
      expect(validateShaclDataWithSchemaStub).toHaveBeenCalledTimes(1)
      expect(writeFileStub).toHaveBeenCalledTimes(1)
      expect(deleteFileStub).toHaveBeenCalledTimes(1)
    })

    it('should delete the asset if the validation does not conforms', async () => {
      // when ... we want extract data from a asset and upload to a different bucket
      // then ... it should validate, extract and upload to a bucket
      const uploadStub = jest.fn().mockResolvedValue('UPLOAD_URL')
      const transformToByteArrayStub = jest.fn().mockResolvedValue('ASSET_BYTE_ARRAY')
      const readFileStub = jest.fn().mockResolvedValue({
        Body: {
          transformToByteArray: transformToByteArrayStub,
        },
      }) as any
      const validateShaclDataWithSchemaStub = jest.fn().mockResolvedValue({
        conforms: false,
        reports: { conforms: false },
        metadata: 'METADATA',
        assetCID: 'ASSET_CID',
        metadataCID: 'METADATA_CID',
      }) as any
      const writeFileStub = jest.fn().mockReturnValue({
        done: uploadStub,
      }) as any
      const copyFileStub = jest.fn().mockResolvedValue('COPIED') as any
      const deleteFileStub = jest.fn().mockReturnValue('SHACL_DATA') as any
      const getAssetStatusStub = jest.fn().mockReturnValue('ASSET_CID') as any
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
        readFile: readFileStub,
        writeFile: writeFileStub,
        copyFile: copyFileStub,
        deleteFile: deleteFileStub,
        validateAndCreateMetadata: validateShaclDataWithSchemaStub,
        getAsset: getAssetStatusStub,
        updateAsset: updateAssetStatusStub,
      })(event as any, context, callback)

      expect(result).toEqual(undefined)
      expect(readFileStub).toHaveBeenCalledWith({ Bucket: 'BUCKET_NAME', Key: 'OBJECT_KEY' })
      expect(validateShaclDataWithSchemaStub).toHaveBeenCalledWith('ASSET_BYTE_ARRAY', 'ASSET_CID')
      expect(validateShaclDataWithSchemaStub).toHaveBeenCalledTimes(1)
      expect(updateAssetStatusStub).toHaveBeenCalledWith('OBJECT_KEY', 'OBJECT_KEY', 'not_accepted')
      expect(writeFileStub).toHaveBeenCalledTimes(0)
      expect(deleteFileStub).toHaveBeenCalledWith({ Bucket: 'BUCKET_NAME', Key: 'OBJECT_KEY' })
    })
  })
})
