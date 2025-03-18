import manifest from '../fixtures/manifest.json'
import manifestRemoteAssetData from '../fixtures/manifestRemoteAssetData.json'
import { ManifestLink } from './types'
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

      expect(result).toBe('metadata/hdmap_instance.json')
    })
  })

  describe('getFilesGroupedByAccessRoles', () => {
    it('should group manifest links by access roles', () => {
      const expected = {
        owner: [
          {
            path: 'simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
            type: 'application/x-xodr',
          },
        ],
        registeredUser: [
          {
            path: 'simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
            type: 'application/json',
          },
          {
            path: 'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
            type: 'text/plain',
          },
          {
            path: 'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
            type: 'application/x-xqar',
          },
          {
            path: 'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
            type: 'application/x-xqar',
          },
          {
            path: 'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
            type: 'image/png',
          },
          {
            path: 'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
            type: 'image/png',
          },
          { path: 'media/bbox.geojson', type: 'application/x-geojson' },
          {
            path: 'media/roadNetwork.geojson',
            type: 'application/x-geojson',
          },
          {
            path: 'media/3d_preview/breakLines.json',
            type: 'application/json',
          },
          {
            path: 'media/3d_preview/junctions.json',
            type: 'application/json',
          },
          {
            path: 'media/3d_preview/laneSections.json',
            type: 'application/json',
          },
          { path: 'media/3d_preview/lanes.json', type: 'application/json' },
          { path: 'media/3d_preview/objects.json', type: 'application/json' },
          { path: 'media/3d_preview/refLine.json', type: 'application/json' },
          {
            path: 'media/3d_preview/roadMarks.json',
            type: 'application/json',
          },
          { path: 'media/3d_preview/roads.json', type: 'application/json' },
          { path: 'media/3d_preview/signals.json', type: 'application/json' },
          {
            path: 'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
            type: 'text/plain',
          },
        ],
        publicUser: [
          { path: 'manifest_reference.json', type: 'application/ld+json' },
          {
            path: 'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
            type: 'application/pdf',
          },
          {
            path: 'metadata/hdmap_instance.json',
            type: 'application/ld+json',
          },
          {
            path: 'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
            type: 'text/plain',
          },
          { path: 'README.md', type: 'text/markdown' },
          {
            path: 'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
            type: 'image/png',
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
        'manifest:hasManifestReference': {
          '@type': 'manifest:Link',
          'manifest:hasAccessRole': {
            '@type': 'manifest:AccessRole',
            '@id': 'envited-x:isPublic',
          },
          'manifest:hasCategory': {
            '@type': 'manifest:Category',
            '@id': 'envited-x:isManifest',
          },
          'manifest:hasFileMetadata': {
            '@type': 'manifest:FileMetadata',
            'manifest:filePath': {
              '@value': './manifest_reference.json',
              '@type': 'xsd:anyURI',
            },
            'manifest:mimeType': {
              '@value': 'application/ld+json',
              '@type': 'xsd:string',
            },
          },
        },
        'manifest:hasLicense': {
          '@type': 'manifest:License',
          'gx:license': {
            '@value': 'MPL-2.0',
          },
          'manifest:licenseData': {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isPublic',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isLicense',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://www.mozilla.org/en-US/MPL/2.0/',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/html',
                '@type': 'xsd:string',
              },
            },
          },
        },
        'manifest:hasArtifacts': [
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isOwner',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isSimulationData',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': './simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xodr',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 645096,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
                '@type': 'xsd:string',
              },
            },
          },
        ],
      }
      const expected = [
        {
          '@type': 'manifest:Link',
          'manifest:hasAccessRole': { '@type': 'manifest:AccessRole', '@id': 'envited-x:isPublic' },
          'manifest:hasCategory': { '@type': 'manifest:Category', '@id': 'envited-x:isManifest' },
          'manifest:hasFileMetadata': {
            '@type': 'manifest:FileMetadata',
            'manifest:filePath': {
              '@value': './manifest_reference.json',
              '@type': 'xsd:anyURI',
            },
            'manifest:mimeType': {
              '@value': 'application/ld+json',
              '@type': 'xsd:string',
            },
          },
        },
        {
          '@type': 'manifest:Link',
          'manifest:hasAccessRole': {
            '@type': 'manifest:AccessRole',
            '@id': 'envited-x:isPublic',
          },
          'manifest:hasCategory': {
            '@type': 'manifest:Category',
            '@id': 'envited-x:isLicense',
          },
          'manifest:hasFileMetadata': {
            '@type': 'manifest:FileMetadata',
            'manifest:filePath': {
              '@type': 'xsd:anyURI',
              '@value': 'https://www.mozilla.org/en-US/MPL/2.0/',
            },
            'manifest:mimeType': {
              '@type': 'xsd:string',
              '@value': 'text/html',
            },
          },
        },
        {
          '@type': 'manifest:Link',
          'manifest:hasAccessRole': { '@type': 'manifest:AccessRole', '@id': 'envited-x:isOwner' },
          'manifest:hasCategory': {
            '@type': 'manifest:Category',
            '@id': 'envited-x:isSimulationData',
          },
          'manifest:hasFileMetadata': {
            '@type': 'manifest:FileMetadata',
            'manifest:filePath': {
              '@value': './simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
              '@type': 'xsd:anyURI',
            },
            'manifest:mimeType': {
              '@value': 'application/x-xodr',
              '@type': 'xsd:string',
            },
            'manifest:fileSize': {
              '@type': 'xsd:integer',
              '@value': 645096,
            },
            'manifest:filename': {
              '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
              '@type': 'xsd:string',
            },
          },
        },
      ]

      const result = SUT.getAllManifestLinks(manifest as any)

      expect(result).toStrictEqual(expected)
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
      const manifestLinks = [
        {
          '@type': 'manifest:Link',
          'manifest:hasAccessRole': { '@type': 'manifest:AccessRole', '@id': 'envited-x:isOwner' },
          'manifest:hasCategory': {
            '@type': 'manifest:Category',
            '@id': 'envited-x:isSimulationData',
          },
          'manifest:hasFileMetadata': {
            '@type': 'manifest:FileMetadata',
            'manifest:filePath': {
              '@value': './simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
              '@type': 'xsd:anyURI',
            },
            'manifest:mimeType': {
              '@value': 'application/x-xodr',
              '@type': 'xsd:string',
            },
            'manifest:fileSize': {
              '@type': 'xsd:integer',
              '@value': 645096,
            },
            'manifest:filename': {
              '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
              '@type': 'xsd:string',
            },
          },
        },
      ] as ManifestLink[]
      const result = SUT.getPathsFromManifestLinks(manifestLinks)

      expect(result).toEqual([
        {
          path: 'simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
          type: 'application/x-xodr',
        },
      ])
    })
  })

  describe('getAllManifestLinksAndFormatPaths', () => {
    it('should return an array with all the declared files paths', () => {
      const result = SUT.getAllManifestLinksAndFormatPaths(manifest as any)

      expect(result).toEqual([
        'manifest_reference.json',
        'simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
        'simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
        'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
        'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
        'metadata/hdmap_instance.json',
        'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
        'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
        'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
        'README.md',
        'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
        'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
        'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
        'media/bbox.geojson',
        'media/roadNetwork.geojson',
        'media/3d_preview/breakLines.json',
        'media/3d_preview/junctions.json',
        'media/3d_preview/laneSections.json',
        'media/3d_preview/lanes.json',
        'media/3d_preview/objects.json',
        'media/3d_preview/refLine.json',
        'media/3d_preview/roadMarks.json',
        'media/3d_preview/roads.json',
        'media/3d_preview/signals.json',
        'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
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
