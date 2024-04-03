import * as SUT from './assetValidator'

describe('common/assetValidator', () => {
  describe('validateAssetFile', () => {
    it('Should return a valid result', async () => {
      // when ... we want to validate a valid asset file
      // then ... it should return a valid result including the metadata

      const getMetadataJsonFromZipStub = jest.fn().mockResolvedValue({
        title: 'ASSET_TITLE',
        type: 'OpenDrive',
      })

      const validateAssetFile = SUT._validateAssetFile(getMetadataJsonFromZipStub)

      const result = await validateAssetFile('' as any)

      expect(result).toEqual({
        data: {
          title: 'ASSET_TITLE',
          type: 'OpenDrive',
        },
        isValid: true,
      })
    })

    it('Should return a invalid result because of invalid asset type', async () => {
      // when ... we want to validate an asset file with an invalid asset type
      // then ... it should return an invalid result

      const getMetadataJsonFromZipStub = jest.fn().mockResolvedValue({
        title: 'ASSET_TITLE',
        type: 'ASSET_TYPE',
      })

      const validateAssetFile = SUT._validateAssetFile(getMetadataJsonFromZipStub)

      const result = await validateAssetFile('' as any)

      expect(result).toEqual({
        data: {},
        isValid: false,
      })
    })

    it('Should return a invalid result because of invalid asset type metadata', async () => {
      // when ... we want to validate an asset file with a valid asset type but incorrectly formatted metadata
      // then ... it should return an invalid result
      
      const getMetadataJsonFromZipStub = jest.fn().mockResolvedValue({
        non_existent_key: 'VALUE',
        type: 'ASSET_TYPE',
      })

      const validateAssetFile = SUT._validateAssetFile(getMetadataJsonFromZipStub)

      const result = await validateAssetFile('' as any)

      expect(result).toEqual({
        data: {},
        isValid: false,
      })
    })

    it('Should throw an error when we cannot read from file', async () => {
      // when ... we want to validate a corrupted asset file
      // then ... it should throw
      
      const getMetadataJsonFromZipStub = jest.fn().mockRejectedValue(new Error('ERROR'))

      const validateAssetFile = SUT._validateAssetFile(getMetadataJsonFromZipStub)

      expect(() => validateAssetFile('' as any)).rejects.toThrow('Error validating asset file')
    })
  })
})
