import * as SUT from './shacl'

describe('common/validator/shacl', () => {
  describe('_validateShaclFile', () => {
    it('Should return a valid result', async () => {
      // when ... we want to validate a asset file
      const file = 'ZIP'

      const getShaclDataFromZipStub = jest.fn().mockResolvedValue(
        JSON.stringify({
          '@context': {
            SHACL_SCHEMA: 'SCHEMA',
          },
        }),
      )
      const loadDatasetStub = jest.fn().mockResolvedValueOnce('DATA_QUADS')
      const validateShaclDataStub = jest.fn().mockReturnValue(true)
      const validateShaclStub = jest.fn().mockReturnValue(validateShaclDataStub)

      // then ... we should get a valid response
      const result = await SUT._validateShaclFile({
        getShaclDataFromZip: getShaclDataFromZipStub,
        loadDataset: loadDatasetStub,
        validateShaclSchema: validateShaclStub,
      })(file as any)

      expect(loadDatasetStub).toHaveBeenCalledWith(
        JSON.stringify({
          '@context': {
            SHACL_SCHEMA: 'SCHEMA',
          },
        }),
        'application/ld+json',
      )
      expect(validateShaclStub).toHaveBeenCalledWith('DATA_QUADS')
      expect(validateShaclDataStub).toHaveBeenCalledWith('SHACL_SCHEMA')
      expect(result).toEqual({
        isValid: true,
        data: {
          '@context': {
            SHACL_SCHEMA: 'SCHEMA',
          },
        },
      })
    })
  })

  describe('_validateShaclDataWithSchema', () => {
    it('Should return a valid result', async () => {
      // when ... we want to validate a asset file on a NodeJS server
      const data = 'DATA'
      const schema = 'SCHEMA'

      const parseStreamToDatasetStub = jest.fn().mockResolvedValue('SHACL_QUADS')
      const loadDatasetStub = jest.fn().mockResolvedValueOnce('DATA_QUADS')
      const validateShaclDataStub = jest.fn().mockReturnValue({
        conforms: true,
        dataset: {},
      })
      const validateShaclSchemaStub = jest.fn().mockReturnValue(validateShaclDataStub)

      // then ... we should get a valid response
      const result = await SUT._validateShaclDataWithSchema({
        parseStreamToDataset: parseStreamToDatasetStub,
        loadDataset: loadDatasetStub,
        validateShacl: validateShaclSchemaStub,
      })(data as any, schema as any)

      expect(parseStreamToDatasetStub).toHaveBeenCalledWith('SCHEMA', 'text/turtle')
      expect(loadDatasetStub).toHaveBeenCalledWith('DATA', 'application/ld+json')
      expect(validateShaclSchemaStub).toHaveBeenCalledWith('SHACL_QUADS')
      expect(validateShaclDataStub).toHaveBeenCalledWith('DATA_QUADS')
      expect(result).toEqual({
        conforms: true,
        dataset: {},
      })
    })
  })
})
