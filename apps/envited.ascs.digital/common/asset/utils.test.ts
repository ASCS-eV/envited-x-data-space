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
})
