import * as SUT from './validateAndCreateMetadata'

describe('common/asset/validateAndCreateMetadata', () => {
  describe('_validateAndCreateMetadata', () => {
    it('should validate and return a metadata buffer', async () => {
      // when ... we want to validate and create a metadata buffer
      // then ... it should validate, extract and create a metadata buffer
      const getShaclSchemaAndValidateStub = jest
        .fn()
        .mockResolvedValue({ report: { conforms: true }, data: { name: 'NAME' } }) as any
      const createMetadataStub = jest.fn().mockReturnValue('METADATA_BUFFER') as any
      const createFilenameStub = jest.fn().mockReturnValue('HASH') as any

      const byteArray = 'ASSET_BYTE_ARRAY'
      const filename = 'data.jsonld'

      const result = await SUT._validateAndCreateMetadata({
        getShaclSchemaAndValidate: getShaclSchemaAndValidateStub,
        createMetadata: createMetadataStub,
        createFilename: createFilenameStub,
      })(byteArray as any, filename)

      expect(result).toEqual({
        report: { conforms: true },
        metadata: 'METADATA_BUFFER',
        assetCID: 'HASH',
        metadataCID: 'HASH',
      })
    })
  })

  describe('_getShaclSchemaAndValidate', () => {
    it('should select SHACLE schema and validate data', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const getFileFromByteArrayStub = jest
        .fn()
        .mockResolvedValue(JSON.stringify({ '@type': 'Person', 'name': ['NAME'] })) as any
      const fsCreateReadStreamStub = jest.fn().mockReturnValue({})
      const fsStub = {
        createReadStream: fsCreateReadStreamStub,
      } as any

      const validateShaclDataSchemaStub = jest.fn().mockResolvedValue({ conforms: true }) as any

      const byteArray = 'ASSET_BYTE_ARRAY'
      const filename = 'data.jsonld'

      const result = await SUT._getShaclSchemaAndValidate({
        getFileFromByteArray: getFileFromByteArrayStub,
        validateShaclDataWithSchema: validateShaclDataSchemaStub,
        fs: fsStub,
      })(byteArray as any, filename)

      expect(result).toEqual({ report: { conforms: true }, data: { '@type': 'Person', 'name': ['NAME'] } })
      expect(getFileFromByteArrayStub).toHaveBeenCalledWith('ASSET_BYTE_ARRAY', 'data.jsonld')
      expect(fsCreateReadStreamStub).toHaveBeenCalledTimes(1)
    })
  })
})
