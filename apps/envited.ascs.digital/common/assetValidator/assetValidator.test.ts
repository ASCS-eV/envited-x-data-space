import { _validateAssetFile } from './assetValidator'

jest.mock('@zip.js/zip.js', () => ({
  BlobReader: () => {},
  Entry: () => {},
  ZipReader: () => {},
}))

jest.mock('./assetValidator.global.ts', () => ({
  stream: () => {},
}))

describe('common/assetValidator', () => {
  describe('validateAssetFile', () => {
    it('Should return a valid result', async () => {
      const getMetadataJsonFromZipStub = jest.fn().mockResolvedValue({
        title: 'ASSET_TITLE',
        type: 'OpenDrive',
      })

      const validateAssetFile = _validateAssetFile(getMetadataJsonFromZipStub)

      const result = await validateAssetFile('' as any)

      expect(result).toEqual({
        data: {
          title: 'ASSET_TITLE',
          type: 'OpenDrive',
        },
        isValid: true,
      })
    })

    it('Should return a invalid result', async () => {
      const getMetadataJsonFromZipStub = jest.fn().mockResolvedValue({
        title: 'ASSET_TITLE',
        type: 'ASSET_TYPE',
      })

      const validateAssetFile = _validateAssetFile(getMetadataJsonFromZipStub)

      const result = await validateAssetFile('' as any)

      expect(result).toEqual({
        data: {},
        isValid: false,
      })
    })
  })
})
