import manifest from '../fixtures/manifest.json'
import manifestRemoteAssetData from '../fixtures/manifestRemoteAssetData.json'
import * as SUT from './utils'

describe('common/asset/utils', () => {
  describe('createFilename', () => {
    it('should create a filename', async () => {
      const byteArray = 'BYTE_ARRAY'

      const rawStub = {
        encode: jest.fn().mockReturnValue('JSON_BYTES'),
        code: 'JSON_CODE',
      } as any

      const sha256Stub = {
        digest: jest.fn().mockReturnValue('SHA256_HASH'),
      } as any

      const CIDStub = {
        create: jest.fn().mockReturnValue({
          toString: jest.fn().mockReturnValue('CID'),
        }),
      } as any

      const result = await SUT._createFilename({
        raw: rawStub,
        sha256: sha256Stub,
        CID: CIDStub,
      })(byteArray as any)

      expect(rawStub.encode).toHaveBeenCalledWith('BYTE_ARRAY')
      expect(CIDStub.create).toHaveBeenCalledWith(1, 'JSON_CODE', 'SHA256_HASH')
      expect(result).toBe('CID')
    })
  })

  describe('getDomainMetadataPath', () => {
    it('should return domainMetadata path', () => {
      const result = SUT.getDomainMetadataPath(manifest as any)

      expect(result).toBe('metadata/domainMetadata.json')
    })
  })

  describe('getFilesGroupedByAccessRoles', () => {
    it('should group manifest links by access roles', () => {
      const expected = {
        owner: [
          {
            path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
            type: 'assetData',
          },
          {
            path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
            type: 'assetData',
          },
        ],
        publicUser: [
          {
            path: 'metadata/domainMetadata.json',
            type: 'metadata',
          },
          {
            path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_01.png',
            type: 'visualization',
          },
          {
            path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_02.png',
            type: 'visualization',
          },
          {
            path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_03.png',
            type: 'visualization',
          },
          {
            path: 'visualization/bbox.geojson',
            type: 'visualization',
          },
          {
            path: 'visualization/roadNetwork.geojson',
            type: 'visualization',
          },
        ],
        registeredUser: [
          {
            path: 'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation.pdf',
            type: 'documentation',
          },
          {
            path: 'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation_stats.txt',
            type: 'documentation',
          },
          {
            path: 'validation/qcReport.txt',
            type: 'validation',
          },
          {
            path: 'visualization/detailRoadNetwork.geojson',
            type: 'visualization',
          },
        ],
      }

      const result = SUT.getFilesGroupedByAccessRoles(manifest as any)

      expect(result).toEqual(expected)
    })
  })

  describe('_getFilesAsPathAndByteArrayFromManifest', () => {
    it('should group manifest links by access roles', async () => {
      const expected = {
        owner: [
          {
            path: 'PATH',
            type: 'FILE_TYPE',
            buffer: 'FILE_BUFFER',
          },
        ],
        publicUser: [
          {
            path: 'PATH',
            type: 'FILE_TYPE',
            buffer: 'FILE_BUFFER',
          },
        ],
        registeredUser: [
          {
            path: 'PATH',
            type: 'FILE_TYPE',
            buffer: 'FILE_BUFFER',
          },
        ],
      }

      const byteArray = 'BYTE_ARRAY' as any
      const getPathsAndBuffersFromByteArrayStub = jest.fn().mockReturnValue([
        {
          path: 'PATH',
          type: 'FILE_TYPE',
          buffer: 'FILE_BUFFER',
        },
      ]) as any

      const result = await SUT._getFilesAsPathAndByteArrayFromManifest({
        getPathsAndBuffersFromByteArray: getPathsAndBuffersFromByteArrayStub,
      })(byteArray, manifest as any)

      expect(result).toEqual(expected)
    })
  })

  describe('_getPathsAndBuffersFromByteArray', () => {
    it('should get multiple files from byte array', async () => {
      const files = [
        {
          path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
          type: 'FILE_TYPE',
        },
      ]

      const expected = [
        {
          arrayBuffer: 'FILE_BUFFER',
          path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
          type: 'FILE_TYPE',
        },
      ]

      const byteArray = 'BYTE_ARRAY' as any
      const getFileFromByteArrayStub = jest.fn().mockResolvedValue({
        path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
        type: 'FILE_TYPE',
        arrayBuffer: 'FILE_BUFFER',
      }) as any

      const result = await SUT._getPathsAndBuffersFromByteArray({
        getPathAndBufferFromFile: getFileFromByteArrayStub,
      })(byteArray, files)

      expect(result).toEqual(expected)
    })
  })

  describe('_getAllFilenamesFromFiles', () => {
    it('should get multiple files from byte array', async () => {
      const files = [
        {
          path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
          type: 'FILE_TYPE',
          arrayBuffer: 'FILE_BUFFER',
        },
      ]

      const expected = [
        {
          arrayBuffer: 'FILE_BUFFER',
          cid: 'FILE_CID',
          path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
          type: 'FILE_TYPE',
        },
      ]

      const getFilenameFromFileStub = jest.fn().mockResolvedValue({
        arrayBuffer: 'FILE_BUFFER',
        cid: 'FILE_CID',
        path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
        type: 'FILE_TYPE',
      }) as any

      const result = await SUT._getAllFilenamesFromFiles({
        getFilenameFromFile: getFilenameFromFileStub,
      })(files as any)

      expect(result).toEqual(expected)
    })
  })

  describe('getAllManifestLinks', () => {
    it('should return all manifest links as array', () => {
      const manifest = {
        'manifest:data': {
          'manifest:assetData': [
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'owner',
              'manifest:format': 'xodr',
              'manifest:path': { '@type': 'xsd:anyURI', '@value': './data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr' },
              'manifest:type': 'assetData',
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'owner',
              'manifest:format': 'xodr',
              'manifest:path': {
                '@type': 'xsd:anyURI',
                '@value': './data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
              },
              'manifest:type': 'assetData',
            },
          ],
          'manifest:contentData': [
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:format': 'json',
              'manifest:path': { '@type': 'xsd:anyURI', '@value': './metadata/domainMetadata.json' },
              'manifest:type': 'metadata',
            },
          ],
        },
      }
      const expected = [
        {
          '@type': 'manifest:Link',
          'manifest:accessRole': 'owner',
          'manifest:format': 'xodr',
          'manifest:path': { '@type': 'xsd:anyURI', '@value': './data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr' },
          'manifest:type': 'assetData',
        },
        {
          '@type': 'manifest:Link',
          'manifest:accessRole': 'owner',
          'manifest:format': 'xodr',
          'manifest:path': {
            '@type': 'xsd:anyURI',
            '@value': './data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
          },
          'manifest:type': 'assetData',
        },
        {
          '@type': 'manifest:Link',
          'manifest:accessRole': 'publicUser',
          'manifest:format': 'json',
          'manifest:path': { '@type': 'xsd:anyURI', '@value': './metadata/domainMetadata.json' },
          'manifest:type': 'metadata',
        },
      ]

      const result = SUT.getAllManifestLinks(manifest as any)

      expect(result).toEqual(expected)
    })
  })

  describe('formatManifestLinkPath', () => {
    it('should format manifest link path', () => {
      const result = SUT.formatManifestLinkPath('./metadata/domainMetadata.json')

      expect(result).toEqual('metadata/domainMetadata.json')
    })
  })

  describe('getPathsFromManifestLinks', () => {
    it('should return an array with paths', () => {
      const result = SUT.getPathsFromManifestLinks([
        {
          '@type': 'manifest:Link',
          'manifest:accessRole': 'owner',
          'manifest:format': 'xodr',
          'manifest:path': { '@type': 'xsd:anyURI', '@value': './data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr' },
          'manifest:type': 'assetData',
        },
        {
          '@type': 'manifest:Link',
          'manifest:accessRole': 'owner',
          'manifest:format': 'xodr',
          'manifest:path': {
            '@type': 'xsd:anyURI',
            '@value': './data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
          },
          'manifest:type': 'assetData',
        },
      ] as any)

      expect(result).toEqual([
        {
          path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
          type: 'assetData',
        },
        {
          path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
          type: 'assetData',
        },
      ])
    })
  })

  describe('getAllManifestLinksAndFormatPaths', () => {
    it('should return an array with all the declared files paths', () => {
      const result = SUT.getAllManifestLinksAndFormatPaths(manifest as any)

      expect(result).toEqual([
        'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
        'data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
        'metadata/domainMetadata.json',
        'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation.pdf',
        'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation_stats.txt',
        'validation/qcReport.txt',
        'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_01.png',
        'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_02.png',
        'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_03.png',
        'visualization/bbox.geojson',
        'visualization/roadNetwork.geojson',
        'visualization/detailRoadNetwork.geojson',
      ])
    })
  })

  describe('hasManifestThirdPartyLinks', () => {
    it('should return true when there is a external link', () => {
      const result = SUT.hasManifestThirdPartyLinks(manifest as any)

      expect(result).toEqual(true)
    })

    it('should return false when there are not external links found', () => {
      const result = SUT.hasManifestThirdPartyLinks(manifestRemoteAssetData as any)

      expect(result).toEqual(true)
    })
  })

  describe('extractValue', () => {
    it('should handle primitive values', () => {
      expect(SUT.extractValue('test string')).toEqual('test string')
      expect(SUT.extractValue(123)).toEqual(123)
      expect(SUT.extractValue(true)).toEqual(true)
      expect(SUT.extractValue(null)).toEqual(null)
      expect(SUT.extractValue(undefined)).toEqual(undefined)
    })

    it('should extract @value from objects that have it', () => {
      expect(SUT.extractValue({ '@value': 'extracted value' })).toEqual('extracted value')
      expect(SUT.extractValue({ '@value': 42, '@type': 'xsd:integer' })).toEqual(42)
    })

    it('should process arrays recursively', () => {
      const input = [{ '@value': 'value1' }, { '@value': 'value2' }, 'plain value']
      const expected = ['value1', 'value2', 'plain value']
      expect(SUT.extractValue(input)).toEqual(expected)
    })

    it('should process nested objects recursively', () => {
      const input = {
        prop1: { '@value': 'value1' },
        prop2: { '@value': 'value2' },
        nested: {
          prop3: { '@value': 'value3' },
          array: [{ '@value': 'value4' }],
        },
      }
      const expected = {
        prop1: 'value1',
        prop2: 'value2',
        nested: {
          prop3: 'value3',
          array: ['value4'],
        },
      }
      expect(SUT.extractValue(input)).toEqual(expected)
    })

    it('should skip @type and @id properties', () => {
      const input = {
        '@type': 'hdmap:SomeType',
        '@id': 'some-id',
        'prop': { '@value': 'value' },
      }
      const expected = {
        prop: 'value',
      }
      expect(SUT.extractValue(input)).toEqual(expected)
    })
  })

  describe('extractDomainMetadata', () => {
    it('should extract basic info from dataResource', () => {
      const input = {
        'hdmap:hasDataResource': {
          'gx:name': { '@value': 'Sample HD Map' },
          'gx:description': { '@value': 'A sample HD map for testing' },
        },
      }
      const result = SUT.extractDomainMetadata(input)
      expect(result).toEqual({
        name: 'Sample HD Map',
        description: 'A sample HD map for testing',
      })
    })

    it('should extract metadata from dataResourceExtension', () => {
      const input = {
        'hdmap:hasDataResource': {
          'gx:name': { '@value': 'Sample HD Map' },
          'gx:description': { '@value': 'A sample HD map for testing' },
        },
        'hdmap:hasDataResourceExtension': {
          'hdmap:hasGeoreference': {
            '@type': 'hdmap:Georeference',
            'hdmap:hasGeodeticReferenceSystem': {
              '@type': 'hdmap:GeodeticReferenceSystem',
              'hdmap:hasEPSGCode': { '@value': '4326' },
              'hdmap:hasHeightSystem': { '@value': 'WGS84' },
            },
            'hdmap:hasBoundingBox': {
              'hdmap:hasMinX': { '@value': '10.0' },
              'hdmap:hasMinY': { '@value': '20.0' },
              'hdmap:hasMaxX': { '@value': '30.0' },
              'hdmap:hasMaxY': { '@value': '40.0' },
            },
          },
        },
      }
      const result = SUT.extractDomainMetadata(input)
      expect(result).toEqual({
        'name': 'Sample HD Map',
        'description': 'A sample HD map for testing',
        'hdmap:Georeference': {
          'hdmap:hasGeodeticReferenceSystem': {
            'hdmap:hasEPSGCode': '4326',
            'hdmap:hasHeightSystem': 'WGS84',
          },
          'hdmap:hasBoundingBox': {
            'hdmap:hasMinX': '10.0',
            'hdmap:hasMinY': '20.0',
            'hdmap:hasMaxX': '30.0',
            'hdmap:hasMaxY': '40.0',
          },
        },
      })
    })

    it('should work with different namespace prefixes', () => {
      const input = {
        'environment-model:hasDataResource': {
          'gx:name': { '@value': 'Environment Model' },
          'gx:description': { '@value': 'A sample environment model' },
        },
        'environment-model:hasDataResourceExtension': {
          'environment-model:hasContent': {
            '@type': 'environment-model:Content',
            'environment-model:hasFormat': { '@value': 'OpenSceneGraph' },
          },
        },
      }
      const result = SUT.extractDomainMetadata(input)
      expect(result).toEqual({
        'name': 'Environment Model',
        'description': 'A sample environment model',
        'environment-model:Content': {
          'environment-model:hasFormat': 'OpenSceneGraph',
        },
      })
    })

    it('should handle missing or empty data', () => {
      const empty = {}
      const result = SUT.extractDomainMetadata(empty)
      expect(result).toEqual({
        name: '',
        description: '',
      })
    })
  })
})
