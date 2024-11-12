import manifest from '../fixtures/manifest.json'
import * as SUT from './validateAndCreateMetadata.utils'

describe('common/asset/validateAndCreateMetadata.utils', () => {
  describe('createFilename', () => {
    it('should create a filename', async () => {
      const byteArray = 'BYTE_ARRAY'

      const jsonStub = {
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
        json: jsonStub,
        sha256: sha256Stub,
        CID: CIDStub,
      })(byteArray as any)

      expect(jsonStub.encode).toHaveBeenCalledWith('BYTE_ARRAY')
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
          'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
          'data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
        ],
        publicUser: [
          'metadata/domainMetadata.json',
          'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_01.png',
          'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_02.png',
          'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_03.png',
          'visualization/bbox.geojson',
          'visualization/roadNetwork.geojson',
        ],
        registeredUser: [
          'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation.pdf',
          'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation_stats.txt',
          'validation/qcReport.txt',
          'visualization/detailRoadNetwork.geojson',
        ],
      }

      const result = SUT.getFilesGroupedByAccessRoles(manifest as any)

      expect(result).toEqual(expected)
    })
  })

  describe('_getFilesWithPathAndByteArray', () => {
    it('should group manifest links by access roles', async () => {
      const expected = {
        owner: [
          {
            path: 'PATH',
            buffer: 'FILE_BUFFER',
          },
        ],
        publicUser: [
          {
            path: 'PATH',
            buffer: 'FILE_BUFFER',
          },
        ],
        registeredUser: [
          {
            path: 'PATH',
            buffer: 'FILE_BUFFER',
          },
        ],
      }

      const byteArray = 'BYTE_ARRAY' as any
      const getFilesFromByteArrayStub = jest.fn().mockReturnValue([
        {
          path: 'PATH',
          buffer: 'FILE_BUFFER',
        },
      ]) as any

      const result = await SUT._getFilesWithPathAndByteArrayFromManifest({
        getFilesFromByteArray: getFilesFromByteArrayStub,
      })(byteArray, manifest as any)

      expect(result).toEqual(expected)
    })
  })

  describe('getFilesFromByteArray', () => {
    it('should get multiple files from byte array', async () => {
      const files = ['data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr']

      const expected = [
        {
          path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
          buffer: 'FILE_BUFFER',
        },
      ]

      const byteArray = 'BYTE_ARRAY' as any
      const getFileFromByteArrayStub = jest.fn().mockResolvedValue({
        path: 'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
        buffer: 'FILE_BUFFER',
      }) as any

      const result = await SUT._getFilesFromByteArray({ getFileWithPathAndBuffer: getFileFromByteArrayStub })(
        byteArray,
        files,
      )

      expect(result).toEqual(expected)
    })
  })

  describe('getAllManifestLinks', () => {
    it('should group manifest links by access roles', () => {
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
    it('should group manifest links by access roles', () => {
      const result = SUT.formatManifestLinkPath('./metadata/domainMetadata.json')

      expect(result).toEqual('metadata/domainMetadata.json')
    })
  })

  describe('formatManifestLinkPath', () => {
    it('should group manifest links by access roles', () => {
      const result = SUT.getPathsOfManifestFiles([
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
        'data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
        'data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
      ])
    })
  })

  describe('formatManifestLinkPath', () => {
    it('should group manifest links by access roles', () => {
      const result = SUT.getManifestFilesAndFormatPaths(manifest as any)

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
})
