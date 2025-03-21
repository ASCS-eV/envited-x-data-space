import * as SUT from './utils'

describe('common/validator/utils', () => {
  describe('_validateAsset', () => {
    it('Should return a valid result', async () => {
      // when ... we want to validate a asset file
      const file = {
        arrayBuffer: () => 'ASSET.ZIP',
      }
      const createFilenameStub = jest.fn().mockResolvedValue('CID')
      const fetchAssetDataByCIDStub = jest.fn().mockResolvedValue([])
      const validateShaclFileStub = jest.fn().mockResolvedValue({
        isValid: true,
        data: {},
        error: false,
      })

      // then ... we should get a valid response
      const result = await SUT._validateAsset({
        createFilename: createFilenameStub,
        fetchAssetDataByCID: fetchAssetDataByCIDStub,
        validateShaclFile: validateShaclFileStub,
      })(file as any)

      expect(createFilenameStub).toHaveBeenCalledTimes(1)
      expect(fetchAssetDataByCIDStub).toHaveBeenCalledWith('CID')
      expect(result).toEqual({
        isValid: true,
        data: {},
        error: false,
      })
    })

    it('Should return a already exists result', async () => {
      // when ... we want to validate a asset file
      const file = {
        arrayBuffer: () => 'ASSET.ZIP',
      }
      const createFilenameStub = jest.fn().mockResolvedValue('CID')
      const fetchAssetDataByCIDStub = jest.fn().mockResolvedValue(['ASSET'])
      const validateShaclFileStub = jest.fn().mockResolvedValue({
        isValid: true,
        data: {},
        error: false,
      })

      // then ... we should get a already exists response
      const result = await SUT._validateAsset({
        createFilename: createFilenameStub,
        fetchAssetDataByCID: fetchAssetDataByCIDStub,
        validateShaclFile: validateShaclFileStub,
      })(file as any)

      expect(createFilenameStub).toHaveBeenCalledTimes(1)
      expect(fetchAssetDataByCIDStub).toHaveBeenCalledWith('CID')
      expect(result).toEqual({
        isValid: false,
        data: {},
        error: 'Asset already exists',
      })
    })
  })
})
