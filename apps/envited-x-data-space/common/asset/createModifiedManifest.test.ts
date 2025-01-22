import manifest from '../fixtures/manifest.json'
import manifestLicenseRefCustomCommercialAgreement from '../fixtures/manifestLicenseRefCustomCommercialAgreement.json'
import manifestLicenseRefPolicySmartContract from '../fixtures/manifestLicenseRefPolicySmartContract.json'
import manifestRemoteAssetData from '../fixtures/manifestRemoteAssetData.json'
import * as SUT from './createModifiedManifest'

describe('common/asset/createModifiedManifest', () => {
  process.env.ASSETS_URL = 'https://assets.envited-x.net'
      process.env.METADATA_URL = 'https://metadata.envited-x.net'
  describe('createModifiedManifest', () => {
    it('should create the modified manifest object - LicenseRemote', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const visualizationFiles = [
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_01.png',
          type: 'visualization',
          cid: 'DISPLAY_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_02.png',
          type: 'visualization',
          cid: 'DISPLAY_CID_1',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_03.png',
          type: 'visualization',
          cid: 'DISPLAY_CID_2',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/bbox.geojson',
          type: 'visualization',
          cid: 'GEOJSON_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/roadNetwork.geojson',
          type: 'visualization',
          cid: 'ROAD_NETWORK_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/detailRoadNetwork.geojson',
          type: 'visualization',
          cid: 'DETAILED_ROAD_NETWORK_CID',
        },
      ]

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
                '@value': 'ipfs://DISPLAY_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': 'ipfs://DISPLAY_CID_1',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': 'ipfs://DISPLAY_CID_2',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'ipfs://GEOJSON_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'ipfs://ROAD_NETWORK_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/visualization/detailRoadNetwork.geojson',
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
        visualizationFiles: visualizationFiles as any,
      })(manifest as any)

      expect(result).toEqual(expected)
    })

    it('should create the modified manifest object - LicenseRef-Policy-Smart-Contract', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const visualizationFiles = [
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_01.png',
          type: 'visualization',
          cid: 'DISPLAY_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_02.png',
          type: 'visualization',
          cid: 'DISPLAY_CID_1',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_03.png',
          type: 'visualization',
          cid: 'DISPLAY_CID_2',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/bbox.geojson',
          type: 'visualization',
          cid: 'GEOJSON_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/roadNetwork.geojson',
          type: 'visualization',
          cid: 'ROAD_NETWORK_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/detailRoadNetwork.geojson',
          type: 'visualization',
          cid: 'DETAILED_ROAD_NETWORK_CID',
        },
      ]

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
                '@value': 'ipfs://DISPLAY_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': 'ipfs://DISPLAY_CID_1',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': 'ipfs://DISPLAY_CID_2',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'ipfs://GEOJSON_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'ipfs://ROAD_NETWORK_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/visualization/detailRoadNetwork.geojson',
                '@type': 'xsd:anyURI',
              },
            },
          ],
        },
        'manifest:license': {
          '@type': 'manifest:License',
          'manifest:spdxIdentifier': {
            '@value': 'LicenseRef-Policy-Smart-Contract',
            '@type': 'xsd:string',
          },
          'manifest:licenseData': {
            '@type': 'manifest:Link',
            'manifest:accessRole': 'publicUser',
            'manifest:type': 'license',
            'manifest:format': 'did',
            'manifest:path': {
              '@value': 'did:tezos:NetXdQprcVkpaWU:KT1PaDvx6vApsvZchR7m3LCRQLJ1cR6C778y',
              '@type': 'xsd:anyURI',
            },
          },
        },
      }

      const result = await SUT.createModifiedManifest({
        assetCID: 'ASSET_CID',
        domainMetadataCID: 'DOMAIN_METADATA_CID',
        visualizationFiles: visualizationFiles as any,
      })(manifestLicenseRefPolicySmartContract as any)

      expect(result).toEqual(expected)
    })

    it('should create the modified manifest object - LicenseRef-Custom-Commercial-Agreement', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const visualizationFiles = [
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_01.png',
          type: 'visualization',
          cid: 'DISPLAY_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_02.png',
          type: 'visualization',
          cid: 'DISPLAY_CID_1',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_03.png',
          type: 'visualization',
          cid: 'DISPLAY_CID_2',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/bbox.geojson',
          type: 'visualization',
          cid: 'GEOJSON_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/roadNetwork.geojson',
          type: 'visualization',
          cid: 'ROAD_NETWORK_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/detailRoadNetwork.geojson',
          type: 'visualization',
          cid: 'DETAILED_ROAD_NETWORK_CID',
        },
      ]

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
                '@value': 'ipfs://DISPLAY_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': 'ipfs://DISPLAY_CID_1',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': 'ipfs://DISPLAY_CID_2',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'ipfs://GEOJSON_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'ipfs://ROAD_NETWORK_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/visualization/detailRoadNetwork.geojson',
                '@type': 'xsd:anyURI',
              },
            },
          ],
        },
        'manifest:license': {
          '@type': 'manifest:License',
          'manifest:spdxIdentifier': {
            '@value': 'LicenseRef-Custom-Commercial-Agreement',
            '@type': 'xsd:string',
          },
          'manifest:licenseData': {
            '@type': 'manifest:Link',
            'manifest:accessRole': 'registeredUser',
            'manifest:type': 'license',
            'manifest:format': 'md',
            'manifest:path': {
              '@value': 'https://metadata.envited-x.net/ASSET_CID/LICENSE',
              '@type': 'xsd:anyURI',
            },
          },
        },
      }

      const result = await SUT.createModifiedManifest({
        assetCID: 'ASSET_CID',
        domainMetadataCID: 'DOMAIN_METADATA_CID',
        visualizationFiles: visualizationFiles as any,
      })(manifestLicenseRefCustomCommercialAgreement as any)

      expect(result).toEqual(expected)
    })

    it('should create the modified manifest object - Remote license link', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const visualizationFiles = [
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_01.png',
          type: 'visualization',
          cid: 'DISPLAY_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_02.png',
          type: 'visualization',
          cid: 'DISPLAY_CID_1',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/TestfeldNiedersachsen_ALKS_ODR_sample_03.png',
          type: 'visualization',
          cid: 'DISPLAY_CID_2',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/bbox.geojson',
          type: 'visualization',
          cid: 'GEOJSON_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/roadNetwork.geojson',
          type: 'visualization',
          cid: 'ROAD_NETWORK_CID',
        },
        {
          arrayBuffer: 'BUFFER',
          path: 'visualization/detailRoadNetwork.geojson',
          type: 'visualization',
          cid: 'DETAILED_ROAD_NETWORK_CID',
        },
      ]

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
                '@value': 'https://remote-asset-url.io/TestfeldNiedersachsen_ALKS_ODR_sample.xodr',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'owner',
              'manifest:type': 'assetData',
              'manifest:format': 'xodr',
              'manifest:path': {
                '@value': 'https://remote-asset-url.io/TestfeldNiedersachsen_ALKS_ODR_sample_offset.xodr',
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
                '@value': 'ipfs://DISPLAY_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': 'ipfs://DISPLAY_CID_1',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'png',
              'manifest:path': {
                '@value': 'ipfs://DISPLAY_CID_2',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'ipfs://GEOJSON_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'publicUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'ipfs://ROAD_NETWORK_CID',
                '@type': 'xsd:anyURI',
              },
            },
            {
              '@type': 'manifest:Link',
              'manifest:accessRole': 'registeredUser',
              'manifest:type': 'visualization',
              'manifest:format': 'geojson',
              'manifest:path': {
                '@value': 'https://metadata.envited-x.net/ASSET_CID/visualization/detailRoadNetwork.geojson',
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
        visualizationFiles: visualizationFiles as any,
      })(manifestRemoteAssetData as any)

      expect(result).toEqual(expected)
    })
  })
})
