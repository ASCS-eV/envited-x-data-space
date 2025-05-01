import manifest from '../fixtures/manifest.json'
import manifestHasReferencedArtifacts from '../fixtures/manifestHasReferencedArtifacts.json'
import manifestLicenseRefCustomCommercialAgreement from '../fixtures/manifestLicenseRefCustomCommercialAgreement.json'
import manifestLicenseRefPolicySmartContract from '../fixtures/manifestLicenseRefPolicySmartContract.json'
import manifestRemoteAssetData from '../fixtures/manifestRemoteAssetData.json'
import * as SUT from './manifest'

describe('common/asset/createModifiedManifest', () => {
  process.env.ASSETS_URL = 'https://assets.envited-x.net'
  process.env.METADATA_URL = 'https://metadata.envited-x.net'
  describe('createModifiedManifest', () => {
    it('should create the modified manifest object - LicenseRemote', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const media = [
        {
          arrayBuffer: 'BUFFER',
          path: 'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
          category: 'envited-x:isMedia',
          cid: 'DISPLAY_CID',
        },
      ]
      const getOrCreateGlobalIdentifierUuidStub = jest.fn().mockResolvedValue('UUID')
      const formatReferencedArtifactManifestIdStub = jest.fn().mockResolvedValue(null)

      const expected = {
        '@context': {
          'envited-x': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/envited-x/',
          'manifest': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/manifest/',
          'hdmap': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/',
          'gx': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
          'sh': 'http://www.w3.org/ns/shacl#',
          'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
          'xsd': 'http://www.w3.org/2001/XMLSchema#',
          'skos': 'http://www.w3.org/2004/02/skos/core#',
        },
        '@id': 'UUID',
        '@type': 'envited-x:Manifest',
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
              '@value': 'ipfs://ASSET_CID/manifest_reference.json',
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
                '@value':
                  'https://assets.envited-x.net/ASSET_CID/simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
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
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMiscellaneous',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 61104,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
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
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'ipfs://ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/pdf',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 101219,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 4536,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:iri': {
              '@id': 'did:web:registry.gaia-x.eu:HdMap:DjHgK5ErTBow1Ya3J05tW9l12skGWgZn6kA9',
            },
            'skos:note': {
              '@value': 'This is the domain metadata for a HD Map.',
              '@type': 'xsd:string',
            },
            'sh:conformsTo': [
              {
                '@id': 'https://ontologies.envited-x.net/hdmap/v3/ontology',
              },
            ],
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isPublic',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMetadata',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://DOMAIN_METADATA_CID',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/ld+json',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 3751,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'hdmap_instance.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xqar',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 9524,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
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
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'ipfs://ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 14106,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xqar',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 62409,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
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
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://ASSET_CID/README.md',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/markdown',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'README.md',
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
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://DISPLAY_CID',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/bbox.geojson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-geojson',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'bbox.geojson',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/roadNetwork.geojson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-geojson',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roadNetwork.geojson',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/breakLines.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'breakLines.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/junctions.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'junctions.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/laneSections.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'laneSections.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/lanes.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'lanes.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/objects.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'objects.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/refLine.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'refLine.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/roadMarks.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roadMarks.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/roads.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roads.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/signals.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'signals.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
                '@type': 'xsd:string',
              },
            },
          },
        ],
        'manifest:hasReferencedArtifacts': [],
      }

      const result = await SUT._createModifiedManifest({
        getOrCreateGlobalIdentifierUuid: getOrCreateGlobalIdentifierUuidStub,
        formatReferencedArtifactManifestId: formatReferencedArtifactManifestIdStub,
      })({
        assetCID: 'ASSET_CID',
        domainMetadataCID: 'DOMAIN_METADATA_CID',
        media: media as any,
      })(manifest as any)

      expect(result).toEqual(expected)
    })

    it('should create the modified manifest object - LicenseRef-Policy-Smart-Contract', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const media = [
        {
          arrayBuffer: 'BUFFER',
          path: 'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
          category: 'envited-x:isMedia',
          cid: 'DISPLAY_CID',
        },
      ]
      const getOrCreateGlobalIdentifierUuidStub = jest.fn().mockResolvedValue('UUID')
      const formatReferencedArtifactManifestIdStub = jest.fn().mockResolvedValue(null)

      const expected = {
        '@context': {
          'envited-x': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/envited-x/',
          'manifest': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/manifest/',
          'hdmap': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/',
          'gx': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
          'sh': 'http://www.w3.org/ns/shacl#',
          'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
          'xsd': 'http://www.w3.org/2001/XMLSchema#',
          'skos': 'http://www.w3.org/2004/02/skos/core#',
        },
        '@id': 'UUID',
        '@type': 'envited-x:Manifest',
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
              '@value': 'ipfs://ASSET_CID/manifest_reference.json',
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
            '@value': 'LicenseRef-Policy-Smart-Contract',
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
                '@value': 'urn:blockchain:tezos:NetXnHfVqm9iesp:contract:KT1PCaD2kmgCHy15wQ1gpqZUy9RLxyBVJdTF',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/vnd.eves.blockchain-urn+json',
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
                '@value':
                  'https://assets.envited-x.net/ASSET_CID/simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
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
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMiscellaneous',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 61104,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
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
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'ipfs://ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/pdf',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 101219,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 4536,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:iri': {
              '@id': 'did:web:registry.gaia-x.eu:HdMap:DjHgK5ErTBow1Ya3J05tW9l12skGWgZn6kA9',
            },
            'skos:note': {
              '@value': 'This is the domain metadata for a HD Map.',
              '@type': 'xsd:string',
            },
            'sh:conformsTo': [
              {
                '@id': 'https://ontologies.envited-x.net/hdmap/v3/ontology',
              },
            ],
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isPublic',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMetadata',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://DOMAIN_METADATA_CID',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/ld+json',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 3751,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'hdmap_instance.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xqar',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 9524,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
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
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'ipfs://ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 14106,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xqar',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 62409,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
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
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://ASSET_CID/README.md',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/markdown',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'README.md',
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
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://DISPLAY_CID',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/bbox.geojson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-geojson',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'bbox.geojson',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/roadNetwork.geojson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-geojson',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roadNetwork.geojson',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/breakLines.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'breakLines.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/junctions.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'junctions.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/laneSections.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'laneSections.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/lanes.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'lanes.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/objects.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'objects.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/refLine.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'refLine.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/roadMarks.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roadMarks.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/roads.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roads.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/signals.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'signals.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
                '@type': 'xsd:string',
              },
            },
          },
        ],
        'manifest:hasReferencedArtifacts': [],
      }

      const result = await SUT._createModifiedManifest({
        getOrCreateGlobalIdentifierUuid: getOrCreateGlobalIdentifierUuidStub,
        formatReferencedArtifactManifestId: formatReferencedArtifactManifestIdStub,
      })({
        assetCID: 'ASSET_CID',
        domainMetadataCID: 'DOMAIN_METADATA_CID',
        media: media as any,
      })(manifestLicenseRefPolicySmartContract as any)

      expect(result).toEqual(expected)
    })

    it('should create the modified manifest object - LicenseRef-Custom-Commercial-Agreement', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const media = [
        {
          arrayBuffer: 'BUFFER',
          path: 'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
          category: 'envited-x:isMedia',
          cid: 'DISPLAY_CID',
        },
      ]
      const getOrCreateGlobalIdentifierUuidStub = jest.fn().mockResolvedValue('UUID')
      const formatReferencedArtifactManifestIdStub = jest.fn().mockResolvedValue(null)

      const expected = {
        '@context': {
          'envited-x': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/envited-x/',
          'manifest': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/manifest/',
          'hdmap': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/',
          'gx': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
          'sh': 'http://www.w3.org/ns/shacl#',
          'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
          'xsd': 'http://www.w3.org/2001/XMLSchema#',
          'skos': 'http://www.w3.org/2004/02/skos/core#',
        },
        '@id': 'UUID',
        '@type': 'envited-x:Manifest',
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
              '@value': 'ipfs://ASSET_CID/manifest_reference.json',
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
            '@value': 'LicenseRef-Custom-Commercial-Agreement',
          },
          'manifest:licenseData': {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isLicense',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/LICENSE',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'md',
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
                '@value':
                  'https://assets.envited-x.net/ASSET_CID/simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
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
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMiscellaneous',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 61104,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
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
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'ipfs://ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/pdf',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 101219,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 4536,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:iri': {
              '@id': 'did:web:registry.gaia-x.eu:HdMap:DjHgK5ErTBow1Ya3J05tW9l12skGWgZn6kA9',
            },
            'skos:note': {
              '@value': 'This is the domain metadata for a HD Map.',
              '@type': 'xsd:string',
            },
            'sh:conformsTo': [
              {
                '@id': 'https://ontologies.envited-x.net/hdmap/v3/ontology',
              },
            ],
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isPublic',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMetadata',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://DOMAIN_METADATA_CID',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/ld+json',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 3751,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'hdmap_instance.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xqar',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 9524,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
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
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'ipfs://ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 14106,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xqar',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 62409,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
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
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://ASSET_CID/README.md',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/markdown',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'README.md',
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
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://DISPLAY_CID',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/bbox.geojson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-geojson',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'bbox.geojson',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/roadNetwork.geojson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-geojson',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roadNetwork.geojson',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/breakLines.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'breakLines.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/junctions.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'junctions.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/laneSections.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'laneSections.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/lanes.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'lanes.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/objects.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'objects.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/refLine.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'refLine.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/roadMarks.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roadMarks.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/roads.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roads.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/signals.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'signals.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
                '@type': 'xsd:string',
              },
            },
          },
        ],
        'manifest:hasReferencedArtifacts': [],
      }

      const result = await SUT._createModifiedManifest({
        getOrCreateGlobalIdentifierUuid: getOrCreateGlobalIdentifierUuidStub,
        formatReferencedArtifactManifestId: formatReferencedArtifactManifestIdStub,
      })({
        assetCID: 'ASSET_CID',
        domainMetadataCID: 'DOMAIN_METADATA_CID',
        media: media as any,
      })(manifestLicenseRefCustomCommercialAgreement as any)

      expect(result).toEqual(expected)
    })

    it('should create the modified manifest object - Remote license link', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const media = [
        {
          arrayBuffer: 'BUFFER',
          path: 'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
          category: 'envited-x:isMedia',
          cid: 'DISPLAY_CID',
        },
      ]
      const getOrCreateGlobalIdentifierUuidStub = jest.fn().mockResolvedValue('UUID')
      const formatReferencedArtifactManifestIdStub = jest.fn().mockResolvedValue(null)

      const expected = {
        '@context': {
          'envited-x': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/envited-x/',
          'manifest': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/manifest/',
          'hdmap': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/',
          'gx': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
          'sh': 'http://www.w3.org/ns/shacl#',
          'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
          'xsd': 'http://www.w3.org/2001/XMLSchema#',
          'skos': 'http://www.w3.org/2004/02/skos/core#',
        },
        '@id': 'UUID',
        '@type': 'envited-x:Manifest',
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
              '@value': 'ipfs://ASSET_CID/manifest_reference.json',
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
                '@value': 'https://remote-asset-url.io/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
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
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMiscellaneous',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 61104,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
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
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'ipfs://ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/pdf',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 101219,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 4536,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:iri': {
              '@id': 'did:web:registry.gaia-x.eu:HdMap:DjHgK5ErTBow1Ya3J05tW9l12skGWgZn6kA9',
            },
            'skos:note': {
              '@value': 'This is the domain metadata for a HD Map.',
              '@type': 'xsd:string',
            },
            'sh:conformsTo': [
              {
                '@id': 'https://ontologies.envited-x.net/hdmap/v3/ontology',
              },
            ],
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isPublic',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMetadata',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://DOMAIN_METADATA_CID',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/ld+json',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 3751,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'hdmap_instance.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xqar',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 9524,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
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
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'ipfs://ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 14106,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xqar',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 62409,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
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
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://ASSET_CID/README.md',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/markdown',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'README.md',
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
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://DISPLAY_CID',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/bbox.geojson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-geojson',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'bbox.geojson',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/roadNetwork.geojson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-geojson',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roadNetwork.geojson',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/breakLines.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'breakLines.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/junctions.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'junctions.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/laneSections.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'laneSections.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/lanes.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'lanes.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/objects.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'objects.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/refLine.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'refLine.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/roadMarks.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roadMarks.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/roads.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roads.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/signals.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'signals.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
                '@type': 'xsd:string',
              },
            },
          },
        ],
        'manifest:hasReferencedArtifacts': [],
      }

      const result = await SUT._createModifiedManifest({
        getOrCreateGlobalIdentifierUuid: getOrCreateGlobalIdentifierUuidStub,
        formatReferencedArtifactManifestId: formatReferencedArtifactManifestIdStub,
      })({
        assetCID: 'ASSET_CID',
        domainMetadataCID: 'DOMAIN_METADATA_CID',
        media: media as any,
      })(manifestRemoteAssetData as any)

      expect(result).toEqual(expected)
    })

    it('should create the modified manifest object - With referenced artifacts', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const media = [
        {
          arrayBuffer: 'BUFFER',
          path: 'media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
          category: 'envited-x:isMedia',
          cid: 'DISPLAY_CID',
        },
      ]
      const getOrCreateGlobalIdentifierUuidStub = jest.fn().mockResolvedValue('UUID')
      const formatReferencedArtifactManifestIdStub = jest
        .fn()
        .mockResolvedValueOnce({
          '@type': 'manifest:Link',
          'manifest:iri': {
            '@id': 'UUID',
          },
          'skos:note': {
            '@value':
              'Referenced HD Map Simulation Asset from <https://github.com/GAIA-X4PLC-AAD/hd-map-asset-example>.',
            '@type': 'xsd:string',
          },
          'sh:conformsTo': [
            {
              '@id': 'https://ontologies.envited-x.net/hdmap/v4/ontology',
            },
            {
              '@id': 'https://ontologies.envited-x.net/manifest/v4/ontology',
            },
          ],
          'manifest:hasAccessRole': {
            '@type': 'manifest:AccessRole',
            '@id': 'envited-x:isPublic',
          },
          'manifest:hasCategory': {
            '@type': 'manifest:Category',
            '@id': 'envited-x:isReferencedSimulationData',
          },
          'manifest:hasFileMetadata': {
            '@type': 'manifest:FileMetadata',
            'manifest:filePath': {
              '@value':
                'https://github.com/GAIA-X4PLC-AAD/hd-map-asset-example/releases/download/v0.2.2/Testfeld_Niedersachsen_ALKS_xodr_sample.zip',
              '@type': 'xsd:anyURI',
            },
            'manifest:mimeType': {
              '@value': 'application/zip',
              '@type': 'xsd:string',
            },
            'manifest:fileSize': {
              '@value': 7711574,
              '@type': 'xsd:integer',
            },
            'manifest:filename': {
              '@value': 'Testfeld_Niedersachsen_ALKS_xodr_sample.zip',
              '@type': 'xsd:string',
            },
          },
        })
        .mockResolvedValueOnce({
          '@type': 'manifest:Link',
          'manifest:iri': {
            '@id': 'UUID',
          },
          'skos:note': {
            '@value':
              'Reference to Environment Model Simulation Asset from: <https://github.com/GAIA-X4PLC-AAD/environment-model-asset-example>.',
            '@type': 'xsd:string',
          },
          'sh:conformsTo': [
            {
              '@id': 'https://ontologies.envited-x.net/environment-model/v4/ontology',
            },
            {
              '@id': 'https://ontologies.envited-x.net/manifest/v4/ontology',
            },
          ],
          'manifest:hasAccessRole': {
            '@type': 'manifest:AccessRole',
            '@id': 'envited-x:isPublic',
          },
          'manifest:hasCategory': {
            '@type': 'manifest:Category',
            '@id': 'envited-x:isReferencedSimulationData',
          },
          'manifest:hasFileMetadata': {
            '@type': 'manifest:FileMetadata',
            'manifest:filePath': {
              '@value':
                'https://github.com/GAIA-X4PLC-AAD/environment-model-asset-example/releases/download/v0.2.1/Testfeld_Niedersachsen_ALKS_3DModel_opt_osgb_sample.zip',
              '@type': 'xsd:anyURI',
            },
            'manifest:mimeType': {
              '@value': 'application/zip',
              '@type': 'xsd:string',
            },
            'manifest:fileSize': {
              '@value': 157944593,
              '@type': 'xsd:integer',
            },
            'manifest:filename': {
              '@value': 'Testfeld_Niedersachsen_ALKS_3DModel_opt_osgb_sample.zip',
              '@type': 'xsd:string',
            },
          },
        })
        .mockResolvedValueOnce({
          '@type': 'manifest:Link',
          'manifest:hasAccessRole': {
            '@type': 'manifest:AccessRole',
            '@id': 'envited-x:isPublic',
          },
          'manifest:hasCategory': {
            '@type': 'manifest:Category',
            '@id': 'envited-x:isReferencedSimulationData',
          },
          'skos:note': {
            '@value':
              'Reference to ALKS Vehicle Catalog from: <https://github.com/openMSL/sl-3-1-osc-alks-scenarios/releases/tag/v0.4.2>.',
            '@type': 'xsd:string',
          },
          'manifest:hasFileMetadata': {
            '@type': 'manifest:FileMetadata',
            'manifest:filePath': {
              '@value':
                'https://github.com/openMSL/sl-3-1-osc-alks-scenarios/blob/master/logical_scenarios/concrete_scenarios/catalogs/vehicles/vehicle_catalog.xosc',
              '@type': 'xsd:anyURI',
            },
            'manifest:mimeType': {
              '@value': 'application/x-xosc',
              '@type': 'xsd:string',
            },
            'manifest:fileSize': {
              '@value': 10500,
              '@type': 'xsd:integer',
            },
            'manifest:filename': {
              '@value': 'vehicle_catalog.xosc',
              '@type': 'xsd:string',
            },
          },
        })
        .mockResolvedValueOnce({
          '@type': 'manifest:Link',
          'manifest:hasAccessRole': {
            '@type': 'manifest:AccessRole',
            '@id': 'envited-x:isPublic',
          },
          'manifest:hasCategory': {
            '@type': 'manifest:Category',
            '@id': 'envited-x:isReferencedSimulationData',
          },
          'skos:note': {
            '@value':
              'Reference to ALKS Pedestrian Catalog from: <https://github.com/openMSL/sl-3-1-osc-alks-scenarios/releases/tag/v0.4.2>.',
            '@type': 'xsd:string',
          },
          'manifest:hasFileMetadata': {
            '@type': 'manifest:FileMetadata',
            'manifest:filePath': {
              '@value':
                'https://github.com/openMSL/sl-3-1-osc-alks-scenarios/blob/master/logical_scenarios/concrete_scenarios/catalogs/pedestrians/pedestrian_catalog.xosc',
              '@type': 'xsd:anyURI',
            },
            'manifest:mimeType': {
              '@value': 'application/x-xosc',
              '@type': 'xsd:string',
            },
            'manifest:fileSize': {
              '@value': 818,
              '@type': 'xsd:integer',
            },
            'manifest:filename': {
              '@value': 'pedestrian_catalog.xosc',
              '@type': 'xsd:string',
            },
          },
        })

      const expected = {
        '@context': {
          'envited-x': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/envited-x/',
          'manifest': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/manifest/',
          'hdmap': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/',
          'gx': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
          'sh': 'http://www.w3.org/ns/shacl#',
          'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
          'xsd': 'http://www.w3.org/2001/XMLSchema#',
          'skos': 'http://www.w3.org/2004/02/skos/core#',
        },
        '@id': 'UUID',
        '@type': 'envited-x:Manifest',
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
              '@value': 'ipfs://ASSET_CID/manifest_reference.json',
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
                '@value':
                  'https://assets.envited-x.net/ASSET_CID/simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
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
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMiscellaneous',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/simulation-data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 61104,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset.bjson',
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
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'ipfs://ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/pdf',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 101219,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation.pdf',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 4536,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_Documentation_stats.txt',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:iri': {
              '@id': 'did:web:registry.gaia-x.eu:HdMap:DjHgK5ErTBow1Ya3J05tW9l12skGWgZn6kA9',
            },
            'skos:note': {
              '@value': 'This is the domain metadata for a HD Map.',
              '@type': 'xsd:string',
            },
            'sh:conformsTo': [
              {
                '@id': 'https://ontologies.envited-x.net/hdmap/v3/ontology',
              },
            ],
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isPublic',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMetadata',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://DOMAIN_METADATA_CID',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/ld+json',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 3751,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'hdmap_instance.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xqar',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 9524,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr.xqar',
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
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'ipfs://ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 14106,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_asam_cb_xodr_QCReport.txt',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xqar',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 62409,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr.xqar',
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
              '@id': 'envited-x:isDocumentation',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://ASSET_CID/README.md',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/markdown',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'README.md',
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
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'ipfs://DISPLAY_CID',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-01.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-02.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/media/TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'image/png',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_impression-03.png',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/bbox.geojson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-geojson',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'bbox.geojson',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/roadNetwork.geojson',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-geojson',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roadNetwork.geojson',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/breakLines.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'breakLines.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/junctions.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'junctions.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/laneSections.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'laneSections.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/lanes.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'lanes.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/objects.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'objects.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/refLine.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'refLine.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/roadMarks.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roadMarks.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/roads.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'roads.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isMedia',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/media/3d_preview/signals.json',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/json',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'signals.json',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isRegistered',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isValidationReport',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/validation-reports/TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'text/plain',
                '@type': 'xsd:string',
              },
              'manifest:filename': {
                '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample_offset_openmsl_cb_xodr_QCReport.txt',
                '@type': 'xsd:string',
              },
            },
          },
        ],
        'manifest:hasReferencedArtifacts': [
          {
            '@type': 'manifest:Link',
            'manifest:iri': {
              '@id': 'UUID',
            },
            'skos:note': {
              '@value':
                'Referenced HD Map Simulation Asset from <https://github.com/GAIA-X4PLC-AAD/hd-map-asset-example>.',
              '@type': 'xsd:string',
            },
            'sh:conformsTo': [
              {
                '@id': 'https://ontologies.envited-x.net/hdmap/v4/ontology',
              },
              {
                '@id': 'https://ontologies.envited-x.net/manifest/v4/ontology',
              },
            ],
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isPublic',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isReferencedSimulationData',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://github.com/GAIA-X4PLC-AAD/hd-map-asset-example/releases/download/v0.2.2/Testfeld_Niedersachsen_ALKS_xodr_sample.zip',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/zip',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 7711574,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'Testfeld_Niedersachsen_ALKS_xodr_sample.zip',
                '@type': 'xsd:string',
              },
            },
          },
          {
            '@type': 'manifest:Link',
            'manifest:iri': {
              '@id': 'UUID',
            },
            'skos:note': {
              '@value':
                'Reference to Environment Model Simulation Asset from: <https://github.com/GAIA-X4PLC-AAD/environment-model-asset-example>.',
              '@type': 'xsd:string',
            },
            'sh:conformsTo': [
              {
                '@id': 'https://ontologies.envited-x.net/environment-model/v4/ontology',
              },
              {
                '@id': 'https://ontologies.envited-x.net/manifest/v4/ontology',
              },
            ],
            'manifest:hasAccessRole': {
              '@type': 'manifest:AccessRole',
              '@id': 'envited-x:isPublic',
            },
            'manifest:hasCategory': {
              '@type': 'manifest:Category',
              '@id': 'envited-x:isReferencedSimulationData',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://github.com/GAIA-X4PLC-AAD/environment-model-asset-example/releases/download/v0.2.1/Testfeld_Niedersachsen_ALKS_3DModel_opt_osgb_sample.zip',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/zip',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 157944593,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'Testfeld_Niedersachsen_ALKS_3DModel_opt_osgb_sample.zip',
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
              '@id': 'envited-x:isReferencedSimulationData',
            },
            'skos:note': {
              '@value':
                'Reference to ALKS Vehicle Catalog from: <https://github.com/openMSL/sl-3-1-osc-alks-scenarios/releases/tag/v0.4.2>.',
              '@type': 'xsd:string',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://github.com/openMSL/sl-3-1-osc-alks-scenarios/blob/master/logical_scenarios/concrete_scenarios/catalogs/vehicles/vehicle_catalog.xosc',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xosc',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 10500,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'vehicle_catalog.xosc',
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
              '@id': 'envited-x:isReferencedSimulationData',
            },
            'skos:note': {
              '@value':
                'Reference to ALKS Pedestrian Catalog from: <https://github.com/openMSL/sl-3-1-osc-alks-scenarios/releases/tag/v0.4.2>.',
              '@type': 'xsd:string',
            },
            'manifest:hasFileMetadata': {
              '@type': 'manifest:FileMetadata',
              'manifest:filePath': {
                '@value':
                  'https://github.com/openMSL/sl-3-1-osc-alks-scenarios/blob/master/logical_scenarios/concrete_scenarios/catalogs/pedestrians/pedestrian_catalog.xosc',
                '@type': 'xsd:anyURI',
              },
              'manifest:mimeType': {
                '@value': 'application/x-xosc',
                '@type': 'xsd:string',
              },
              'manifest:fileSize': {
                '@value': 818,
                '@type': 'xsd:integer',
              },
              'manifest:filename': {
                '@value': 'pedestrian_catalog.xosc',
                '@type': 'xsd:string',
              },
            },
          },
        ],
      }

      const result = await SUT._createModifiedManifest({
        getOrCreateGlobalIdentifierUuid: getOrCreateGlobalIdentifierUuidStub,
        formatReferencedArtifactManifestId: formatReferencedArtifactManifestIdStub,
      })({
        assetCID: 'ASSET_CID',
        domainMetadataCID: 'DOMAIN_METADATA_CID',
        media: media as any,
      })(manifestHasReferencedArtifacts as any)

      expect(result).toEqual(expected)
    })
  })
})
