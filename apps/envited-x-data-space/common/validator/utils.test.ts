import * as SUT from './utils'

describe('common/validator/utils', () => {
  describe('_validateAsset', () => {
    it('Should return a valid result', async () => {
      // when ... we want to validate a asset file
      const file = {
        arrayBuffer: () => 'ASSET.ZIP',
      }
      const predetermineCIDStub = jest.fn().mockResolvedValue('CID')
      const fetchAssetDataByCIDStub = jest.fn().mockResolvedValue([])
      const validateAssetStub = jest.fn().mockResolvedValue({
        isValid: true,
        data: {},
        error: false,
      })

      // then ... we should get a valid response
      const result = await SUT._validateAsset({
        predetermineCID: predetermineCIDStub,
        fetchAssetDataByCID: fetchAssetDataByCIDStub,
        validateAsset: validateAssetStub,
      })(file as any)

      expect(predetermineCIDStub).toHaveBeenCalledTimes(1)
      expect(fetchAssetDataByCIDStub).toHaveBeenCalledWith('CID')
      expect(result).toEqual({
        isValid: true,
        data: {},
        error: false,
      })
    })

    it.skip('Should return a already exists result', async () => {
      // when ... we want to validate a asset file
      const file = {
        arrayBuffer: () => 'ASSET.ZIP',
      }
      const predetermineCIDStub = jest.fn().mockResolvedValue('CID')
      const fetchAssetDataByCIDStub = jest.fn().mockResolvedValue(['ASSET'])
      const validateAssetStub = jest.fn().mockResolvedValue({
        isValid: true,
        data: {},
        error: false,
      })

      // then ... we should get a already exists response
      const result = await SUT._validateAsset({
        predetermineCID: predetermineCIDStub,
        fetchAssetDataByCID: fetchAssetDataByCIDStub,
        validateAsset: validateAssetStub,
      })(file as any)

      expect(predetermineCIDStub).toHaveBeenCalledTimes(1)
      expect(fetchAssetDataByCIDStub).toHaveBeenCalledWith('CID')
      expect(result).toEqual({
        isValid: false,
        data: {},
        error: 'Asset already exists',
      })
    })
  })
})
