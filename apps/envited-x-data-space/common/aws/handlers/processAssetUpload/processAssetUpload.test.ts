import * as SUT from './processAssetUpload'

describe('common/aws/handlers/processAssetUpload', () => {
  describe('processAssetUpload', () => {
    it('should process an asset as expected', async () => {
      // when ... we want to process an asset
      // then ... it should process the asset as expected
      const uploadDoneStub = jest.fn().mockResolvedValue('UPLOAD_URL')
      const transformToByteArrayStub = jest.fn().mockResolvedValue('ASSET_BYTE_ARRAY')
      const readFileFromObjectStorageStub = jest.fn().mockResolvedValue({
        Body: {
          transformToByteArray: transformToByteArrayStub,
        },
      }) as any
      const uploadToObjectStorageStub = jest.fn().mockReturnValue({
        done: uploadDoneStub,
      }) as any
      const deleteFileFromObjectStorageStub = jest.fn().mockReturnValue('SHACL_DATA') as any
      const getAssetStub = jest.fn().mockReturnValue('ASSET_CID') as any
      const updateAssetStub = jest.fn().mockReturnValue('UPDATED') as any
      const uploadFileToIPFSStub = jest.fn().mockResolvedValue('ASSET_CID') as any
      const uploadJsonToIPFSStub = jest.fn().mockResolvedValue('JSON_CID') as any
      const createGroupStub = jest.fn().mockResolvedValue('GROUP_NAME') as any
      const getMinterStub = jest
        .fn()
        .mockResolvedValue({
          pkh: 'MINTER_ADDRESS',
          name: 'MINTER_NAME',
          addressGlobalIdentifier: {
            method: 'did:web',
            fqdn: 'registry.gaia-x.eu',
            scopedIdentifier: 'MINTER_GLOBAL_IDENTIFIER',
          },
        }) as any
      const streamToUint8ArrayStub = jest.fn().mockResolvedValue('FILE_BUFFER') as any
      const extractDomainMetadataStub = jest.fn().mockResolvedValue({
        conforms: true,
        data: {
          '@context': {
            'envited-x': 'https://github.com/ENVITED-X/ontology-management-base/releases/tag/v0.0.1',
          },
        },
        cid: 'DOMAIN_METADATA_CID',
      }) as any
      const extractResourcesStub = jest.fn().mockReturnValue({
        isPublic: [
          { path: 'public-image.jpg', mimeType: 'image/jpeg', category: 'envited-x:isMedia' },
          { path: 'public-document.pdf', mimeType: 'application/pdf', category: 'envited-x:isMedia' },
        ],
        isRegistered: [
          { path: 'restricted-data.json', mimeType: 'application/json', category: 'envited-x:isMedia' },
          { path: 'restricted-image.png', mimeType: 'image/png', category: 'envited-x:isMedia' },
        ],
      }) as any
      const extractFileFromArchiveStub = jest.fn().mockResolvedValue({}) as any
      const getCoverImageStub = jest
        .fn()
        .mockResolvedValue({ cid: 'COVER_CID', fileSize: 1000, uri: 'COVER_URI' }) as any
      const addCIDsStub = jest.fn().mockResolvedValue([]) as any
      const createModifiedManifestStub = jest.fn().mockReturnValue(() => ({ fileSize: 1000 })) as any
      const jsonToUint8ArrayStub = jest.fn().mockReturnValue(new Uint8Array()) as any
      const extractGeneralInformationFromMetadataStub = jest.fn().mockReturnValue(() => ({})) as any
      const hasRemoteLinksStub = jest.fn().mockReturnValue(false) as any
      const extractManifestStub = jest.fn().mockResolvedValue({ conforms: true, data: {} }) as any
      const getMediaFilesStub = jest.fn().mockReturnValue([
        { path: 'public-image.jpg', mimeType: 'image/jpeg', category: 'envited-x:isMedia' },
        { path: 'public-document.pdf', mimeType: 'application/pdf', category: 'envited-x:isMedia' },
        { path: 'restricted-image.png', mimeType: 'image/png', category: 'envited-x:isMedia' },
      ]) as any
      const insertAssetResourceStub = jest.fn().mockResolvedValue({
        id: 'resource-id',
        assetId: 'asset-id',
        name: 'resource-name',
        cid: 'cid',
        mimeType: 'mime/type',
        accessLevel: 'public',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

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
      const callback = jest.fn()

      const result = await SUT.processAssetUpload({
        readFileFromObjectStorage: readFileFromObjectStorageStub,
        uploadToObjectStorage: uploadToObjectStorageStub,
        deleteFileFromObjectStorage: deleteFileFromObjectStorageStub,
        getAsset: getAssetStub,
        updateAsset: updateAssetStub,
        uploadFileToIPFS: uploadFileToIPFSStub,
        uploadJsonToIPFS: uploadJsonToIPFSStub,
        createGroup: createGroupStub,
        predetermineCID: jest.fn().mockResolvedValue('PREDETERMINED_CID'),
        getMinter: getMinterStub,
        streamToUint8Array: streamToUint8ArrayStub,
        extractDomainMetadata: extractDomainMetadataStub,
        extractResources: extractResourcesStub,
        extractFileFromArchive: extractFileFromArchiveStub,
        getCoverImage: getCoverImageStub,
        addCIDs: addCIDsStub,
        createModifiedManifest: createModifiedManifestStub,
        jsonToUint8Array: jsonToUint8ArrayStub,
        extractGeneralInformationFromMetadata: extractGeneralInformationFromMetadataStub,
        hasRemoteLinks: hasRemoteLinksStub,
        extractManifest: extractManifestStub,
        getMediaFiles: getMediaFilesStub,
        insertAssetResource: insertAssetResourceStub,
      })(event as any, context, callback)

      expect(result).toEqual(undefined)
      expect(readFileFromObjectStorageStub).toHaveBeenCalledWith({ Bucket: 'BUCKET_NAME', Key: 'OBJECT_KEY' })
      expect(uploadToObjectStorageStub).toHaveBeenCalledTimes(9)
      expect(deleteFileFromObjectStorageStub).toHaveBeenCalledTimes(0)
      expect(updateAssetStub).toHaveBeenCalledWith(
        expect.any(String),
        'OBJECT_KEY',
        'pending',
        expect.any(Object),
        expect.any(Object),
      )
      expect(createGroupStub).toHaveBeenCalledWith(expect.any(String))
      expect(uploadDoneStub).toHaveBeenCalledWith()
      expect(insertAssetResourceStub).toHaveBeenCalled()
    })

    it('should delete the asset if the validation does not conforms', async () => {
      // when ... we want extract data from a asset and upload to a different bucket
      // then ... it should validate, extract and upload to a bucket
      const uploadDoneStub = jest.fn().mockResolvedValue('UPLOAD_URL')
      const transformToByteArrayStub = jest.fn().mockResolvedValue('ASSET_BYTE_ARRAY')
      const readFileFromObjectStorageStub = jest.fn().mockResolvedValue({
        Body: {
          transformToByteArray: transformToByteArrayStub,
        },
      }) as any
      const uploadToObjectStorageStub = jest.fn().mockReturnValue({
        done: uploadDoneStub,
      }) as any
      const deleteFileFromObjectStorageStub = jest.fn().mockReturnValue('SHACL_DATA') as any
      const getAssetStatusStub = jest.fn().mockReturnValue('ASSET_CID') as any
      const updateAssetStub = jest.fn().mockReturnValue('UPDATED') as any
      const uploadFileToIPFSStub = jest.fn().mockResolvedValue('ASSET_CID') as any
      const uploadJsonToIPFSStub = jest.fn().mockResolvedValue('JSON_CID') as any
      const createGroupStub = jest.fn().mockResolvedValue('GROUP_NAME') as any
      const getMinterStub = jest.fn().mockResolvedValue({ pkh: 'MINTER_ADDRESS', name: 'MINTER_NAME' }) as any
      const streamToUint8ArrayStub = jest.fn().mockResolvedValue('FILE_BUFFER') as any
      const extractDomainMetadataStub = jest.fn().mockResolvedValue({
        conforms: true,
        data: {
          '@context': {
            'envited-x': 'https://github.com/ENVITED-X/ontology-management-base/releases/tag/v0.0.1',
          },
        },
        cid: 'DOMAIN_METADATA_CID',
      }) as any
      const extractResourcesStub = jest.fn().mockReturnValue({
        public: [
          { path: 'public-image.jpg', mimeType: 'image/jpeg', category: 'envited-x:isMedia' },
          { path: 'public-document.pdf', mimeType: 'application/pdf', category: 'envited-x:isMedia' },
        ],
        registered: [
          { path: 'restricted-data.json', mimeType: 'application/json', category: 'envited-x:isMedia' },
          { path: 'restricted-image.png', mimeType: 'image/png', category: 'envited-x:isMedia' },
        ],
      }) as any
      const extractFileFromArchiveStub = jest.fn().mockResolvedValue({}) as any
      const getCoverImageStub = jest
        .fn()
        .mockResolvedValue({ cid: 'COVER_CID', fileSize: 1000, uri: 'COVER_URI' }) as any
      const addCIDsStub = jest.fn().mockResolvedValue([]) as any
      const createModifiedManifestStub = jest.fn().mockReturnValue(() => ({ fileSize: 1000 })) as any
      const jsonToUint8ArrayStub = jest.fn().mockReturnValue(new Uint8Array()) as any
      const extractGeneralInformationFromMetadataStub = jest.fn().mockReturnValue(() => ({})) as any
      const hasRemoteLinksStub = jest.fn().mockReturnValue(false) as any
      const extractManifestStub = jest.fn().mockResolvedValue({ conforms: false, data: {} }) as any
      const getMediaFilesStub = jest.fn().mockReturnValue([
        { path: 'public-image.jpg', mimeType: 'image/jpeg', category: 'envited-x:isMedia' },
        { path: 'public-document.pdf', mimeType: 'application/pdf', category: 'envited-x:isMedia' },
        { path: 'restricted-image.png', mimeType: 'image/png', category: 'envited-x:isMedia' },
      ]) as any
      const insertAssetResourceStub = jest.fn().mockResolvedValue({
        id: 'resource-id',
        assetId: 'asset-id',
        name: 'resource-name',
        cid: 'cid',
        mimeType: 'mime/type',
        accessLevel: 'public',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

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
      const callback = jest.fn()

      const result = await SUT.processAssetUpload({
        readFileFromObjectStorage: readFileFromObjectStorageStub,
        uploadToObjectStorage: uploadToObjectStorageStub,
        deleteFileFromObjectStorage: deleteFileFromObjectStorageStub,
        getAsset: getAssetStatusStub,
        updateAsset: updateAssetStub,
        uploadFileToIPFS: uploadFileToIPFSStub,
        uploadJsonToIPFS: uploadJsonToIPFSStub,
        createGroup: createGroupStub,
        predetermineCID: jest.fn().mockResolvedValue('PREDETERMINED_CID'),
        getMinter: getMinterStub,
        streamToUint8Array: streamToUint8ArrayStub,
        extractDomainMetadata: extractDomainMetadataStub,
        extractResources: extractResourcesStub,
        extractFileFromArchive: extractFileFromArchiveStub,
        getCoverImage: getCoverImageStub,
        addCIDs: addCIDsStub,
        createModifiedManifest: createModifiedManifestStub,
        jsonToUint8Array: jsonToUint8ArrayStub,
        extractGeneralInformationFromMetadata: extractGeneralInformationFromMetadataStub,
        hasRemoteLinks: hasRemoteLinksStub,
        extractManifest: extractManifestStub,
        getMediaFiles: getMediaFilesStub,
        insertAssetResource: insertAssetResourceStub,
      })(event as any, context, callback)

      expect(result).toEqual(undefined)
      expect(readFileFromObjectStorageStub).toHaveBeenCalledWith({ Bucket: 'BUCKET_NAME', Key: 'OBJECT_KEY' })
      expect(extractManifestStub).toHaveBeenCalledTimes(1)
      expect(uploadToObjectStorageStub).toHaveBeenCalledTimes(0)
      expect(deleteFileFromObjectStorageStub).toHaveBeenCalledWith({ Bucket: 'BUCKET_NAME', Key: 'OBJECT_KEY' })
      expect(uploadDoneStub).not.toHaveBeenCalledWith()
      expect(createGroupStub).toHaveBeenCalledTimes(0)
      expect(uploadFileToIPFSStub).toHaveBeenCalledTimes(0)
      expect(insertAssetResourceStub).not.toHaveBeenCalled()
    })
  })
})
