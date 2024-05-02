import * as SUT from './shacl'

describe('common/validator/shacl', () => {
  describe('_validateShaclFile', () => {
    it('Should return a valid result', async () => {
      // when ... we want to validate a asset file
      const file = 'ZIP'

      const getShaclDataFromZipStub = jest.fn().mockResolvedValue('SHACL_DATA')
      const fetchShaclSchemaStub = jest.fn().mockResolvedValue('SHACL_SCHEMA')
      const loadDatasetStub = jest.fn().mockResolvedValueOnce('SCHEMA_QUADS').mockResolvedValueOnce('DATA_QUADS')
      const validateShaclDataStub = jest.fn().mockReturnValue({
        conforms: true,
        dataset: {},
      })
      const validateShaclStub = jest.fn().mockReturnValue(validateShaclDataStub)

      // then ... we should get a valid response
      const result = await SUT._validateShaclFile({
        getShaclDataFromZip: getShaclDataFromZipStub,
        fetchShaclSchema: fetchShaclSchemaStub,
        loadDataset: loadDatasetStub,
        validateShacl: validateShaclStub,
      })(file as any)

      expect(loadDatasetStub).toHaveBeenNthCalledWith(1, 'SHACL_SCHEMA', 'text/turtle')
      expect(loadDatasetStub).toHaveBeenNthCalledWith(2, 'SHACL_DATA', 'application/ld+json')
      expect(validateShaclStub).toHaveBeenCalledWith('SCHEMA_QUADS')
      expect(validateShaclDataStub).toHaveBeenCalledWith('DATA_QUADS')
      expect(result).toEqual({
        isValid: true,
        data: {},
      })
    })
  })
})