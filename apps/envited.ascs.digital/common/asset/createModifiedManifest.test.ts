import * as SUT from './createModifiedManifest'

describe('common/asset/createModifiedManifest', () => {
  describe('createModifiedManifest', () => {
    it('should create the modified manifest object', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const manifest = {
        '@context': {
          xsd: 'http://www.w3.org/2001/XMLSchema#',
          gx: 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
          skos: 'http://www.w3.org/2004/02/skos/core#',
          sh: 'http://www.w3.org/ns/shacl#',
          manifest: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/manifest/',
        },
        '@id': 'did:web:registry.gaia-x.eu:Manifest:ZNh9Z-tHQpkpxJhNobhUVmauYxrfTAZdQy9L',
        '@type': 'manifest:Manifest',
        'manifest:data': {
          '@type': 'manifest:Data',
          'manifest:assetData': [
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'owner',
              'manifest:type': 'assetData',
              'manifest:format': 'xodr',
              'manifest:relativePath': {
                '@value': './data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'owner',
              'manifest:type': 'assetData',
              'manifest:format': 'xodr',
              'manifest:relativePath': {
                '@value': './data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
                '@type': 'xsd:anyURI',
              },
            },
          ],
          'manifest:licenseType': 'providerSpecific',
          'manifest:licenseData': {
            '@type': 'manifest:Link',
            'manifest:accessRole': 'publicUser',
            'manifest:type': 'license',
            'manifest:format': 'md',
            'manifest:relativePath': {
              '@value': './LICENSE',
              '@type': 'xsd:anyURI',
            },
          },
          'manifest:contentData': [
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'metadata',
              'manifest:format': 'json',
              'manifest:relativePath': {
                '@value': './metadata/domainMetadata.json',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'documentation',
              'manifest:format': 'pdf',
              'manifest:relativePath': {
                '@value': './documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation.pdf',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'documentation',
              'manifest:format': 'txt',
              'manifest:relativePath': {
                '@value': './documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation_stats.txt',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'validation',
              'manifest:format': 'txt',
              'manifest:relativePath': {
                '@value': './validation/qcReport.txt',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:relativePath': {
                '@value': './visualization/TestfeldNiedersachsen_ALKS_ODR_sample_01.png',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:relativePath': {
                '@value': './visualization/TestfeldNiedersachsen_ALKS_ODR_sample_02.png',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:relativePath': {
                '@value': './visualization/TestfeldNiedersachsen_ALKS_ODR_sample_03.png',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:relativePath': {
                '@value': './visualization/bbox.geojson',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:relativePath': {
                '@value': './visualization/roadNetwork.geojson',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:relativePath': {
                '@value': './visualization/detailRoadNetwork.geojson',
                '@type': 'xsd:anyURI',
              },
            },
          ],
        },
      }

      const expected = {
        '@context': {
          xsd: 'http://www.w3.org/2001/XMLSchema#',
          gx: 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
          skos: 'http://www.w3.org/2004/02/skos/core#',
          sh: 'http://www.w3.org/ns/shacl#',
          manifest: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/manifest/',
        },
        '@id': 'did:web:registry.gaia-x.eu:Manifest:ZNh9Z-tHQpkpxJhNobhUVmauYxrfTAZdQy9L',
        '@type': 'manifest:Manifest',
        'manifest:data': {
          '@type': 'manifest:Data',
          'manifest:assetData': [
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'owner',
              'manifest:type': 'assetData',
              'manifest:format': 'xodr',
              'manifest:relativePath': {
                '@value': 'https://assets.envited-x.net/ASSET_CID/data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'owner',
              'manifest:type': 'assetData',
              'manifest:format': 'xodr',
              'manifest:relativePath': {
                '@value':
                  'https://assets.envited-x.net/ASSET_CID/data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
                '@type': 'xsd:anyURI',
              },
            },
          ],
          'manifest:licenseType': 'providerSpecific',
          'manifest:licenseData': {
            '@type': 'manifest:Link',
            'manifest:accessRole': 'publicUser',
            'manifest:type': 'license',
            'manifest:format': 'md',
            'manifest:relativePath': {
              '@value': 'https://metadata.envited-x.net/ASSET_CID/LICENSE',
              '@type': 'xsd:anyURI',
            },
          },
          'manifest:contentData': [
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'metadata',
              'manifest:format': 'json',
              'manifest:relativePath': {
                '@value': 'ipfs://DOMAIN_METADATA_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'documentation',
              'manifest:format': 'pdf',
              'manifest:relativePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation.pdf',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'documentation',
              'manifest:format': 'txt',
              'manifest:relativePath': {
                '@value':
                  'https://metadata.envited-x.net/ASSET_CID/documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation_stats.txt',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'validation',
              'manifest:format': 'txt',
              'manifest:relativePath': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/validation/qcReport.txt',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:relativePath': {
                '@value': 'ipfs://CREATE_UNIQUE_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:relativePath': {
                '@value': 'ipfs://CREATE_UNIQUE_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:relativePath': {
                '@value': 'ipfs://CREATE_UNIQUE_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:relativePath': {
                '@value': 'ipfs://CREATE_UNIQUE_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:relativePath': {
                '@value': 'ipfs://CREATE_UNIQUE_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:relativePath': {
                '@value': 'ipfs://CREATE_UNIQUE_CID',
                '@type': 'xsd:anyURI',
              },
            },
          ],
        },
      }

      const result = await SUT.createModifiedManifest({
        assetCID: 'ASSET_CID',
        domainMetadataCID: 'DOMAIN_METADATA_CID',
      })(manifest as any)

      expect(result).toEqual(expected)
    })
  })
})
