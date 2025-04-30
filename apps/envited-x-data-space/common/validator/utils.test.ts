import * as SUT from './utils'

jest.mock('../featureFlags', () => ({
  FEATURE_FLAGS: {
    development: {
      uniqueAsset: true,
      uniqueGlobalIdentifier: true,
    },
  },
}))

describe('common/validator/utils', () => {
  describe('_validateAsset', () => {
    it('Should return a valid result', async () => {
      // when ... we want to validate a asset file
      const file = {
        arrayBuffer: () => 'ASSET.ZIP',
      }
      const predetermineCIDStub = jest.fn().mockResolvedValue('CID')
      const fetchAssetDataByCIDStub = jest.fn().mockResolvedValue([])
      const fetchTokenByScopedIdentifierStub = jest.fn().mockResolvedValue(null)
      const fetchGlobalIdentifierByScopedIdentifierStub = jest.fn().mockResolvedValue(null)
      const validateAssetStub = jest.fn().mockResolvedValue({
        isValid: true,
        data: {
          domainMetadata: {
            '@id': 'did:web:fqdn:type:scopedIdentifier',
          },
          manifest: {
            'manifest:hasReferencedArtifacts': [],
          },
        },
        error: false,
      })

      // then ... we should get a valid response
      const result = await SUT._validateAsset({
        predetermineCID: predetermineCIDStub,
        fetchAssetDataByCID: fetchAssetDataByCIDStub,
        fetchTokenByScopedIdentifier: fetchTokenByScopedIdentifierStub,
        fetchGlobalIdentifierByScopedIdentifier: fetchGlobalIdentifierByScopedIdentifierStub,
        validateAsset: validateAssetStub,
      })(file as any)

      expect(predetermineCIDStub).toHaveBeenCalledTimes(1)
      expect(fetchAssetDataByCIDStub).toHaveBeenCalledWith('CID')
      expect(fetchTokenByScopedIdentifierStub).toHaveBeenCalledWith('type:scopedIdentifier')
      expect(result).toEqual({
        isValid: true,
        data: {
          domainMetadata: {
            '@id': 'did:web:fqdn:type:scopedIdentifier',
          },
          manifest: {
            'manifest:hasReferencedArtifacts': [],
          },
          referencedAssets: {},
        },
        error: false,
      })
    })

    it('Should return a valid result with referencedAssets', async () => {
      // when ... we want to validate a asset file
      const file = {
        arrayBuffer: () => 'ASSET.ZIP',
      }
      const predetermineCIDStub = jest.fn().mockResolvedValue('CID')
      const fetchAssetDataByCIDStub = jest.fn().mockResolvedValue([])
      const fetchTokenByScopedIdentifierStub = jest
        .fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValue('GLOBAL_IDENTIFIER')
      const fetchGlobalIdentifierByScopedIdentifierStub = jest.fn().mockResolvedValue(null)
      const validateAssetStub = jest.fn().mockResolvedValue({
        isValid: true,
        data: {
          domainMetadata: {
            '@id': 'did:web:fqdn:type:scopedIdentifier',
          },
          manifest: {
            'manifest:hasReferencedArtifacts': [
              {
                'manifest:iri': {
                  '@id': 'did:web:domainname.com:Type:Identifier',
                },
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/zip',
                  },
                },
              },
              {
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/zip',
                  },
                },
              },
              {
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/x-xosc',
                  },
                },
              },
            ],
          },
        },
        error: false,
      })

      // then ... we should get a valid response
      const result = await SUT._validateAsset({
        predetermineCID: predetermineCIDStub,
        fetchAssetDataByCID: fetchAssetDataByCIDStub,
        fetchTokenByScopedIdentifier: fetchTokenByScopedIdentifierStub,
        fetchGlobalIdentifierByScopedIdentifier: fetchGlobalIdentifierByScopedIdentifierStub,
        validateAsset: validateAssetStub,
      })(file as any)

      expect(predetermineCIDStub).toHaveBeenCalledTimes(1)
      expect(fetchAssetDataByCIDStub).toHaveBeenCalledWith('CID')
      expect(fetchTokenByScopedIdentifierStub).toHaveBeenCalledWith('type:scopedIdentifier')
      expect(result).toEqual({
        isValid: true,
        data: {
          domainMetadata: {
            '@id': 'did:web:fqdn:type:scopedIdentifier',
          },
          manifest: {
            'manifest:hasReferencedArtifacts': [
              {
                'manifest:iri': {
                  '@id': 'did:web:domainname.com:Type:Identifier',
                },
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/zip',
                  },
                },
              },
              {
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/zip',
                  },
                },
              },
              {
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/x-xosc',
                  },
                },
              },
            ],
          },
          referencedAssets: {
            true: [
              {
                exists: true,
                id: 'did:web:domainname.com:Type:Identifier',
              },
            ],
          },
        },
        error: false,
      })
    })

    it('Should return a invalid result with referencedAssets', async () => {
      // when ... we want to validate a asset file
      const file = {
        arrayBuffer: () => 'ASSET.ZIP',
      }
      const predetermineCIDStub = jest.fn().mockResolvedValue('CID')
      const fetchAssetDataByCIDStub = jest.fn().mockResolvedValue([])
      const fetchTokenByScopedIdentifierStub = jest
        .fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValue('GLOBAL_IDENTIFIER')
      const fetchGlobalIdentifierByScopedIdentifierStub = jest.fn().mockResolvedValue(null)
      const validateAssetStub = jest.fn().mockResolvedValue({
        isValid: true,
        data: {
          domainMetadata: {
            '@id': 'did:web:fqdn:type:scopedIdentifier',
          },
          manifest: {
            'manifest:hasReferencedArtifacts': [
              {
                'manifest:iri': {
                  '@id': 'did:web:domainname.com:Type:Identifier',
                },
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/zip',
                  },
                },
              },
              {
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/zip',
                  },
                },
              },
              {
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/x-xosc',
                  },
                },
              },
            ],
          },
        },
        error: false,
      })

      // then ... we should get a valid response
      const result = await SUT._validateAsset({
        predetermineCID: predetermineCIDStub,
        fetchAssetDataByCID: fetchAssetDataByCIDStub,
        fetchTokenByScopedIdentifier: fetchTokenByScopedIdentifierStub,
        fetchGlobalIdentifierByScopedIdentifier: fetchGlobalIdentifierByScopedIdentifierStub,
        validateAsset: validateAssetStub,
      })(file as any)

      expect(predetermineCIDStub).toHaveBeenCalledTimes(1)
      expect(fetchAssetDataByCIDStub).toHaveBeenCalledWith('CID')
      expect(fetchTokenByScopedIdentifierStub).toHaveBeenCalledWith('type:scopedIdentifier')
      expect(result).toEqual({
        isValid: true,
        data: {
          domainMetadata: {
            '@id': 'did:web:fqdn:type:scopedIdentifier',
          },
          manifest: {
            'manifest:hasReferencedArtifacts': [
              {
                'manifest:iri': {
                  '@id': 'did:web:domainname.com:Type:Identifier',
                },
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/zip',
                  },
                },
              },
              {
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/zip',
                  },
                },
              },
              {
                'manifest:hasFileMetadata': {
                  'manifest:mimeType': {
                    '@value': 'application/x-xosc',
                  },
                },
              },
            ],
          },
          referencedAssets: {
            true: [
              {
                exists: true,
                id: 'did:web:domainname.com:Type:Identifier',
              },
            ],
          },
        },
        error: false,
      })
    })

    it('Should return a already global identifier exists result', async () => {
      // when ... we want to validate a asset file
      const file = {
        arrayBuffer: () => 'ASSET.ZIP',
      }
      const predetermineCIDStub = jest.fn().mockResolvedValue('CID')
      const fetchAssetDataByCIDStub = jest.fn().mockResolvedValue([])
      const fetchTokenByScopedIdentifierStub = jest.fn().mockResolvedValue(['GLOBAL_IDENTIFIER'])
      const fetchGlobalIdentifierByScopedIdentifierStub = jest.fn().mockResolvedValue(null)
      const validateShaclFileStub = jest.fn().mockResolvedValue({
        isValid: true,
        data: {
          domainMetadata: {
            '@id': 'did:web:fqdn:type:scopedIdentifier',
          },
        },
        error: false,
      })

      // then ... we should get a already exists response
      const result = await SUT._validateAsset({
        predetermineCID: predetermineCIDStub,
        fetchAssetDataByCID: fetchAssetDataByCIDStub,
        fetchTokenByScopedIdentifier: fetchTokenByScopedIdentifierStub,
        fetchGlobalIdentifierByScopedIdentifier: fetchGlobalIdentifierByScopedIdentifierStub,
        validateAsset: validateShaclFileStub,
      })(file as any)

      expect(predetermineCIDStub).toHaveBeenCalledTimes(1)
      expect(fetchAssetDataByCIDStub).toHaveBeenCalledWith('CID')
      expect(result).toEqual({
        isValid: false,
        data: {},
        error: 'Global identifier already exists',
      })
    })

    it('Should return a already exists result', async () => {
      // when ... we want to validate a asset file
      const file = {
        arrayBuffer: () => 'ASSET.ZIP',
      }
      const predetermineCIDStub = jest.fn().mockResolvedValue('CID')
      const fetchAssetDataByCIDStub = jest.fn().mockResolvedValue(['ASSET'])
      const fetchTokenByScopedIdentifierStub = jest.fn().mockResolvedValue(null)
      const fetchGlobalIdentifierByScopedIdentifierStub = jest.fn().mockResolvedValue(null)
      const validateAssetStub = jest.fn().mockResolvedValue({
        isValid: true,
        data: {},
        error: false,
      })

      // then ... we should get a already exists response
      const result = await SUT._validateAsset({
        predetermineCID: predetermineCIDStub,
        fetchAssetDataByCID: fetchAssetDataByCIDStub,
        fetchTokenByScopedIdentifier: fetchTokenByScopedIdentifierStub,
        fetchGlobalIdentifierByScopedIdentifier: fetchGlobalIdentifierByScopedIdentifierStub,
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
