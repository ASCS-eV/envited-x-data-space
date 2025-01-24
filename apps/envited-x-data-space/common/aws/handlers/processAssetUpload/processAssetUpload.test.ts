import * as SUT from './processAssetUpload'

describe('common/aws/handlers/processAssetUpload', () => {
  describe('_main', () => {
    it('should extract and write metadata to a bucket', async () => {
      // when ... we want extract data from a asset and upload to a different bucket
      // then ... it should validate, extract and upload to a bucket
      const uploadDoneStub = jest.fn().mockResolvedValue('UPLOAD_URL')
      const transformToByteArrayStub = jest.fn().mockResolvedValue('ASSET_BYTE_ARRAY')
      const readFileStub = jest.fn().mockResolvedValue({
        Body: {
          transformToByteArray: transformToByteArrayStub,
        },
      }) as any
      const validateAndCreateMetadataStub = jest.fn().mockResolvedValue({
        conforms: true,
        reports: { conforms: true },
        metadata: {
          minter: 'MINTER_ADDRESS',
        },
        modifiedManifest: 'MODIFIED_MANIFEST',
        assetCID: 'ASSET_CID',
        metadataCID: 'METADATA_CID',
        files: {
          owner: [
            {
              path: 'PATH',
              arrayBuffer: 'FILE_BUFFER',
            },
          ],
          registeredUser: [
            {
              path: 'PATH',
              arrayBuffer: 'FILE_BUFFER',
            },
            {
              path: 'PATH_1',
              arrayBuffer: 'FILE_BUFFER',
            },
          ],
          publicUser: [
            {
              path: 'PATH',
              arrayBuffer: 'FILE_BUFFER',
            },
          ],
        },
        visualizationFiles: [
          {
            path: 'PATH',
            arrayBuffer: 'FILE_BUFFER',
          },
          {
            path: 'PATH_1',
            arrayBuffer: 'FILE_BUFFER',
          },
        ],
      }) as any
      const writeFileStub = jest.fn().mockReturnValue({
        done: uploadDoneStub,
      }) as any
      const deleteFileStub = jest.fn().mockReturnValue('SHACL_DATA') as any
      const getAssetStatusStub = jest.fn().mockReturnValue('ASSET_CID') as any
      const updateAssetStatusStub = jest.fn().mockReturnValue('UPDATED') as any
      const uploadFileStub = jest.fn().mockResolvedValue('ASSET_CID') as any
      const uploadJsonStub = jest.fn().mockResolvedValue('JSON_CID') as any
      const createGroupStub = jest.fn().mockResolvedValue('GROUP_NAME') as any

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
        deleteFile: deleteFileStub,
        validateAndCreateMetadata: validateAndCreateMetadataStub,
        getAsset: getAssetStatusStub,
        updateAsset: updateAssetStatusStub,
        uploadFile: uploadFileStub,
        uploadJson: uploadJsonStub,
        createGroup: createGroupStub,
      })(event as any, context, callback)

      expect(result).toEqual(undefined)
      expect(readFileStub).toHaveBeenCalledWith({ Bucket: 'BUCKET_NAME', Key: 'OBJECT_KEY' })
      expect(validateAndCreateMetadataStub).toHaveBeenCalledWith('ASSET_BYTE_ARRAY', 'ASSET_CID')
      expect(validateAndCreateMetadataStub).toHaveBeenCalledTimes(1)
      expect(writeFileStub).toHaveBeenCalledTimes(4)
      expect(deleteFileStub).toHaveBeenCalledTimes(0)
      expect(updateAssetStatusStub).toHaveBeenCalledWith(
        'ASSET_CID',
        'OBJECT_KEY',
        'pending',
        {
          minter: 'MINTER_ADDRESS',
        },
        'MODIFIED_MANIFEST',
      )
      expect(createGroupStub).toHaveBeenCalledWith('MINTER_ADDRESS')
      expect(uploadDoneStub).toHaveBeenCalledWith()
      expect(uploadFileStub).toHaveBeenCalledWith({ arrayBuffer: 'FILE_BUFFER', filename: 'PATH', group: 'GROUP_NAME' })
      expect(uploadFileStub).toHaveBeenCalledWith({
        arrayBuffer: 'FILE_BUFFER',
        filename: 'PATH_1',
        group: 'GROUP_NAME',
      })
    })

    it('should delete the asset if the validation does not conforms', async () => {
      // when ... we want extract data from a asset and upload to a different bucket
      // then ... it should validate, extract and upload to a bucket
      const uploadDoneStub = jest.fn().mockResolvedValue('UPLOAD_URL')
      const transformToByteArrayStub = jest.fn().mockResolvedValue('ASSET_BYTE_ARRAY')
      const readFileStub = jest.fn().mockResolvedValue({
        Body: {
          transformToByteArray: transformToByteArrayStub,
        },
      }) as any
      const validateShaclDataWithSchemaStub = jest.fn().mockResolvedValue({
        conforms: false,
        reports: { conforms: false },
        metadata: {
          minter: 'MINTER_ADDRESS',
        },
        assetCID: 'ASSET_CID',
        metadataCID: 'METADATA_CID',
      }) as any
      const writeFileStub = jest.fn().mockReturnValue({
        done: uploadDoneStub,
      }) as any
      const deleteFileStub = jest.fn().mockReturnValue('SHACL_DATA') as any
      const getAssetStatusStub = jest.fn().mockReturnValue('ASSET_CID') as any
      const updateAssetStatusStub = jest.fn().mockReturnValue('UPDATED') as any
      const uploadFileStub = jest.fn().mockResolvedValue('ASSET_CID') as any
      const uploadJsonStub = jest.fn().mockResolvedValue('JSON_CID') as any
      const createGroupStub = jest.fn().mockResolvedValue('GROUP_NAME') as any

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
        deleteFile: deleteFileStub,
        validateAndCreateMetadata: validateShaclDataWithSchemaStub,
        getAsset: getAssetStatusStub,
        updateAsset: updateAssetStatusStub,
        uploadFile: uploadFileStub,
        uploadJson: uploadJsonStub,
        createGroup: createGroupStub,
      })(event as any, context, callback)

      expect(result).toEqual(undefined)
      expect(readFileStub).toHaveBeenCalledWith({ Bucket: 'BUCKET_NAME', Key: 'OBJECT_KEY' })
      expect(validateShaclDataWithSchemaStub).toHaveBeenCalledWith('ASSET_BYTE_ARRAY', 'ASSET_CID')
      expect(validateShaclDataWithSchemaStub).toHaveBeenCalledTimes(1)
      expect(updateAssetStatusStub).toHaveBeenCalledWith('OBJECT_KEY', 'OBJECT_KEY', 'rejected')
      expect(writeFileStub).toHaveBeenCalledTimes(0)
      expect(deleteFileStub).toHaveBeenCalledWith({ Bucket: 'BUCKET_NAME', Key: 'OBJECT_KEY' })
      expect(uploadDoneStub).not.toHaveBeenCalledWith()
      expect(createGroupStub).toHaveBeenCalledTimes(0)
      expect(uploadFileStub).toHaveBeenCalledTimes(0)
    })
  })
})
