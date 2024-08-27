import * as SUT from './shacl'

describe('common/validator/shacl', () => {
  describe('_validateShaclFile', () => {
    it('Should return a valid result', async () => {
      // when ... we want to validate a asset file
      const file = 'ZIP'
      const validateManifestStub = jest.fn().mockReturnValue({
        conforms: true,
        data: {
          file: 'FILE_NAME',
        },
      })
      const validateDomainMetadataStub = jest.fn().mockReturnValue({
        conforms: true,
        data: {
          name: 'NAME',
        },
      })

      // then ... we should get a valid response
      const result = await SUT._validateShaclFile({
        validateManifest: validateManifestStub,
        validateDomainMetadata: validateDomainMetadataStub,
      })(file as any)

      expect(validateManifestStub).toHaveBeenCalledWith('ZIP')
      expect(validateDomainMetadataStub).toHaveBeenCalledWith('ZIP')
      expect(result).toEqual({
        isValid: true,
        data: {
          manifest: {
            file: 'FILE_NAME',
          },
          domainMetadata: {
            name: 'NAME',
          },
        },
      })
    })
  })

  describe('_validateManifest', () => {
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
      const result = await SUT._validateManifest({
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
      expect(validateShaclDataStub).toHaveBeenCalledWith('manifest')
      expect(result).toEqual({
        conforms: true,
        data: {
          '@context': {
            SHACL_SCHEMA: 'SCHEMA',
          },
        },
      })
    })
  })

  describe('_validateDomainMetadata', () => {
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
      const result = await SUT._validateDomainMetadata({
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
        conforms: true,
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
