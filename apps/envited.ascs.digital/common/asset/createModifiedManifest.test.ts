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
              'manifest:path': {
                '@value': './data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'owner',
              'manifest:type': 'assetData',
              'manifest:format': 'xodr',
              'manifest:path': {
                '@value': './data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
                '@type': 'xsd:anyURI',
              },
            },
          ],
          'manifest:contentData': [
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'metadata',
              'manifest:format': 'json',
              'manifest:path': {
                '@value': './metadata/domainMetadata.json',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'documentation',
              'manifest:format': 'pdf',
              'manifest:path': {
                '@value': './documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation.pdf',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'documentation',
              'manifest:format': 'txt',
              'manifest:path': {
                '@value': './documentation/TestfeldNiedersachsen_ALKS_ODR_sample_Documentation_stats.txt',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'validation',
              'manifest:format': 'txt',
              'manifest:path': {
                '@value': './validation/qcReport.txt',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': './visualization/TestfeldNiedersachsen_ALKS_ODR_sample_01.png',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': './visualization/TestfeldNiedersachsen_ALKS_ODR_sample_02.png',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': './visualization/TestfeldNiedersachsen_ALKS_ODR_sample_03.png',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': './visualization/bbox.geojson',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': './visualization/roadNetwork.geojson',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': './visualization/detailRoadNetwork.geojson',
                '@type': 'xsd:anyURI',
              },
            },
          ],
        },
        'manifest:license': {
          '@type': 'manifest:License',
          'manifest:spdxIdentifier': {
            '@value': 'MIT',
            '@type': 'xsd:string',
          },
          'manifest:licenseData': {
            '@type': 'manifest:Link',
            'manifest:accessRole': 'publicUser',
            'manifest:type': 'license',
            'manifest:format': 'html',
            'manifest:path': {
              '@value': 'https://opensource.org/license/mit',
              '@type': 'xsd:anyURI',
            },
          },
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
              'manifest:path': {
                '@value': 'https://assets.envited-x.net/ASSET_CID/data/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'owner',
              'manifest:type': 'assetData',
              'manifest:format': 'xodr',
              'manifest:path': {
                '@value':
                  'https://assets.envited-x.net/ASSET_CID/data/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
                '@type': 'xsd:anyURI',
              },
            },
          ],
          'manifest:contentData': [
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'metadata',
              'manifest:format': 'json',
              'manifest:path': {
                '@value': 'ipfs://DOMAIN_METADATA_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'documentation',
              'manifest:format': 'pdf',
              'manifest:path': {
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
              'manifest:path': {
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
              'manifest:path': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/validation/qcReport.txt',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': 'ipfs://QmPg2xq9HAH45tF9EhLfGpYvtjhRL1LnB2jrHx7WUxKDzg',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': 'ipfs://QmVgViCWeYCgu1Xv2rAJGFApCd4qUgmHWNVskPcYRAgsuf',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': 'ipfs://QmTcZJaHir2CGJKaGjUV316GiTkUYhHbai9jxKEodAAfFf',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'ipfs://QmXmRRCutfE3LN9g4ggmVkKb1WdBMLWVKFngdqdkh64q3S',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'ipfs://QmUkN3ktmtqF8muBP8VLxMC9JWr8u8iqnswNo2BtWGVWZ7',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'ipfs://Qmf7FLUveSyy6jjXt7EbnokWQRPSbbm3tT47HZ1KAWPYjr',
                '@type': 'xsd:anyURI',
              },
            },
          ],
        },
        'manifest:license': {
          '@type': 'manifest:License',
          'manifest:spdxIdentifier': {
            '@value': 'MIT',
            '@type': 'xsd:string',
          },
          'manifest:licenseData': {
            '@type': 'manifest:Link',
            'manifest:accessRole': 'publicUser',
            'manifest:type': 'license',
            'manifest:format': 'html',
            'manifest:path': {
              '@value': 'https://opensource.org/license/mit',
              '@type': 'xsd:anyURI',
            },
          },
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
