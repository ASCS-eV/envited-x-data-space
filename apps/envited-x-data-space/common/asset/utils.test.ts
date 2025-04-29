import { ERRORS } from '../constants'
import domainMetadata from '../fixtures/domainMetadata.json'
import manifest from '../fixtures/manifest.json'
import manifestRemoteAssetData from '../fixtures/manifestRemoteAssetData.json'
import { ASSET_TYPE } from './constants'
import { ManifestLink, MetadataType } from './types'
import * as SUT from './utils'

describe('common/asset/utils', () => {
  describe('getDomainMetadataPath', () => {
    it('should return domainMetadata path', () => {
      const result = SUT.getDomainMetadataPath(manifest as any)

      expect(result).toBe('metadata/hdmap_instance.json')
    })
  })

  describe('getMediaFiles', () => {
    it('should filter files with media category', () => {
      // given a list of items with the media category
      const items = [
        { path: 'file1.json', mimeType: 'application/json', category: 'regular-category' },
        { path: 'file2.png', mimeType: 'image/png', category: 'envited-x:isMedia' },
        { path: 'file3.txt', mimeType: 'text/plain', category: 'another-category' },
        { path: 'file4.jpg', mimeType: 'image/jpeg', category: 'envited-x:isMedia' },
        { path: 'file5.geojson', mimeType: 'application/geo+json', category: 'envited-x:isMedia' },
        { path: 'file6.json', mimeType: 'application/json', category: 'yet-another-category' },
      ]

      const result = SUT.getMediaFiles(items)

      expect(result).toEqual([
        { path: 'file2.png', mimeType: 'image/png', category: 'envited-x:isMedia' },
        { path: 'file4.jpg', mimeType: 'image/jpeg', category: 'envited-x:isMedia' },
        { path: 'file5.geojson', mimeType: 'application/geo+json', category: 'envited-x:isMedia' },
      ])
    })

    it('should return empty array when no media files exist', () => {
      // given a list with no media files
      const items = [
        { path: 'file1.json', mimeType: 'application/json', category: 'regular-category' },
        { path: 'file3.txt', mimeType: 'text/plain', category: 'another-category' },
        { path: 'file6.json', mimeType: 'application/json', category: 'yet-another-category' },
      ]

      // when filtering for media files using the actual function
      const result = SUT.getMediaFiles(items)

      // then an empty array should be returned since no items match
      expect(result).toEqual([])
    })
  })

  describe('getFilesGroupedByAccessRoles', () => {
    it('should group manifest links by access roles', () => {
      const expected = {
        isOwner: [
          {
            path: 'simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
            category: 'envited-x:isSimulationData',
            mimeType: 'application/x-xodr',
          },
        ],
        isRegistered: [
          {
            path: 'simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
            category: 'envited-x:isMiscellaneous',
            mimeType: 'application/json',
          },
          {
            path: 'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
            category: 'envited-x:isDocumentation',
            mimeType: 'text/plain',
          },
          {
            path: 'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
            category: 'envited-x:isValidationReport',
            mimeType: 'application/x-xqar',
          },
          {
            path: 'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
            category: 'envited-x:isValidationReport',
            mimeType: 'application/x-xqar',
          },
          {
            path: 'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
            category: 'envited-x:isMedia',
            mimeType: 'image/png',
          },
          {
            path: 'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
            category: 'envited-x:isMedia',
            mimeType: 'image/png',
          },
          {
            path: 'media/bbox.geojson',
            category: 'envited-x:isMedia',
            mimeType: 'application/x-geojson',
          },
          {
            path: 'media/roadNetwork.geojson',
            category: 'envited-x:isMedia',
            mimeType: 'application/x-geojson',
          },
          {
            path: 'media/3d_preview/breakLines.json',
            category: 'envited-x:isMedia',
            mimeType: 'application/json',
          },
          {
            path: 'media/3d_preview/junctions.json',
            category: 'envited-x:isMedia',
            mimeType: 'application/json',
          },
          {
            path: 'media/3d_preview/laneSections.json',
            category: 'envited-x:isMedia',
            mimeType: 'application/json',
          },
          {
            path: 'media/3d_preview/lanes.json',
            category: 'envited-x:isMedia',
            mimeType: 'application/json',
          },
          {
            path: 'media/3d_preview/objects.json',
            category: 'envited-x:isMedia',
            mimeType: 'application/json',
          },
          {
            path: 'media/3d_preview/refLine.json',
            category: 'envited-x:isMedia',
            mimeType: 'application/json',
          },
          {
            path: 'media/3d_preview/roadMarks.json',
            category: 'envited-x:isMedia',
            mimeType: 'application/json',
          },
          {
            path: 'media/3d_preview/roads.json',
            category: 'envited-x:isMedia',
            mimeType: 'application/json',
          },
          {
            path: 'media/3d_preview/signals.json',
            category: 'envited-x:isMedia',
            mimeType: 'application/json',
          },
          {
            path: 'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
            category: 'envited-x:isValidationReport',
            mimeType: 'text/plain',
          },
        ],
        isPublic: [
          {
            path: 'manifest_reference.json',
            category: 'envited-x:isManifest',
            mimeType: 'application/ld+json',
          },
          {
            path: 'documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
            category: 'envited-x:isDocumentation',
            mimeType: 'application/pdf',
          },
          {
            path: 'metadata/hdmap_instance.json',
            category: 'envited-x:isMetadata',
            mimeType: 'application/ld+json',
          },
          {
            path: 'validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
            category: 'envited-x:isValidationReport',
            mimeType: 'text/plain',
          },
          {
            path: 'README.md',
            category: 'envited-x:isDocumentation',
            mimeType: 'text/markdown',
          },
          {
            path: 'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
            category: 'envited-x:isMedia',
            mimeType: 'image/png',
          },
        ],
      }

      const result = SUT.getFilesGroupedByAccessRoles(manifest as any)

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
                '@type': 'xsd:anyURI',
                '@value': 'https://www.mozilla.org/en-US/MPL/2.0/',
              },
              'manifest:mimeType': {
                '@type': 'xsd:string',
                '@value': 'text/html',
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
                '@type': 'xsd:integer',
                '@value': 645096,
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
          category: 'envited-x:isSimulationData',
          mimeType: 'application/x-xodr',
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

  describe('hasRemoteLinks', () => {
    it('should return true when there is a external link', () => {
      const result = SUT.hasRemoteLinks(manifest as any)

      expect(result).toEqual(true)
    })

    it('should return false when there are not external links found', () => {
      const result = SUT.hasRemoteLinks(manifestRemoteAssetData as any)

      expect(result).toEqual(true)
    })
  })

  describe('extractGeneralInformationFromMetadata', () => {
    it('should extract general information from metadata', () => {
      // when ... we want to extact general information from the metadata
      // then ... it should return name, description, formatType and the version
      const expected = {
        name: 'TestfeldNiedersachsen_ALKS_ODR_sample',
        description: 'simple hdmap example file on Testfeld Niedersachsen for ALKS scenario',
        formatType: 'ASAM OpenDRIVE',
        version: '1.6',
      }

      const result = SUT.extractGeneralInformationFromMetadata(ASSET_TYPE[domainMetadata['@type'] as MetadataType])(
        domainMetadata,
      )

      expect(result).toEqual(expected)
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

  describe('transformDomainMetadata', () => {
    it('should extract basic info from dataResource', () => {
      const input = {
        'hdmap:hasDataResource': {
          'gx:name': { '@value': 'Sample HD Map' },
          'gx:description': { '@value': 'A sample HD map for testing' },
        },
      }
      const result = SUT.transformDomainMetadata(input)
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
      const result = SUT.transformDomainMetadata(input)
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
      const result = SUT.transformDomainMetadata(input)
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
      const result = SUT.transformDomainMetadata(empty)
      expect(result).toEqual({
        name: '',
        description: '',
      })
    })
  })

  describe('formatFilesErrorMessage', () => {
    it('should format error messages correctly', () => {
      const errors = [{ error: 'file1.json' }, { error: 'file2.txt' }]

      const result = SUT.formatFilesErrorMessage(errors)

      expect(result).toEqual(`${ERRORS.FILES_NOT_FOUND} - file1.json, file2.txt`)
    })
  })
})
