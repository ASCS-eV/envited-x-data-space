import * as SUT from './shacl'

describe('common/validator/shacl', () => {
  describe('_validateShaclFile', () => {
    it('Should return a valid result', async () => {
      // when ... we want to validate a asset file
      const file = 'ZIP'
      const validateReadmeStub = jest.fn().mockResolvedValue('FILE_NAME')
      const validateManifestStub = jest.fn().mockResolvedValue({
        conforms: true,
        data: {
          file: 'FILE_NAME',
        },
      })
      const validateDomainMetadataStub = jest.fn().mockResolvedValue({
        conforms: true,
        data: {
          name: 'NAME',
        },
      })

      const checkIfAllFilesInManifestExistStub = jest.fn().mockResolvedValue({
        errors: [],
        amount: 12,
      })

      const countAmountOfFilesInZipStub = jest.fn().mockResolvedValue(13)

      // then ... we should get a valid response
      const result = await SUT._validateShaclFile({
        validateManifest: validateManifestStub,
        validateDomainMetadata: validateDomainMetadataStub,
        checkIfAllFilesInManifestExist: checkIfAllFilesInManifestExistStub,
        countAmountOfFilesInZip: countAmountOfFilesInZipStub,
        validateReadme: validateReadmeStub,
      })(file as any)

      expect(validateManifestStub).toHaveBeenCalledWith('ZIP')
      expect(validateDomainMetadataStub).toHaveBeenCalledWith('ZIP', { file: 'FILE_NAME' })
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
      const manifest = {}

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
      const getDomainMetadataPathStub = jest.fn().mockReturnValue('DOMAIN_METADATA_PATH')

      // then ... we should get a valid response
      const result = await SUT._validateDomainMetadata({
        getShaclDataFromZip: getShaclDataFromZipStub,
        loadDataset: loadDatasetStub,
        validateShaclSchema: validateShaclStub,
        getDomainMetadataPath: getDomainMetadataPathStub,
      })(file as any, manifest as any)

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
