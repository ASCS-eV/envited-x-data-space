import * as SUT from './createTokenMetadata'

describe('common/asset/createTokenMetadata', () => {
  describe('createTokenMetadata', () => {
    it('should extract data from manifest and domainMetadata and create a token metadata object', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const domainMetadata = {
        '@context': {
          gx: 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#',
          general: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/',
          sh: 'http://www.w3.org/ns/shacl#',
          hdmap: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/',
          xsd: 'http://www.w3.org/2001/XMLSchema#',
          skos: 'http://www.w3.org/2004/02/skos/core#',
          georeference: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/georeference/',
        },
        '@id': 'did:web:registry.gaia-x.eu:HdMap:DjHgK5ErTBow1Ya3J05tW9l12skGWgZn6kA9',
        '@type': 'hdmap:HdMap',
        'hdmap:general': {
          '@type': 'general:General',
          'general:description': {
            '@type': 'general:Description',
            'general:name': {
              '@value': 'TestfeldNiedersachsen_ALKS_ODR_sample',
              '@type': 'xsd:string',
            },
            'general:description': {
              '@value': 'simple hdmap example file on Testfeld Niedersachsen for ALKS scenario',
              '@type': 'xsd:string',
            },
          },
          'general:data': {
            '@type': 'general:Data',
            'general:size': {
              '@value': '5',
              '@type': 'xsd:float',
            },
            'general:recordingTime': {
              '@value': '2020-05-26T12:00:00',
              '@type': 'xsd:dateTime',
            },
          },
          'general:range2D': {
            '@type': 'general:Range2D',
          },
        },
        'hdmap:format': {
          '@type': 'hdmap:Format',
          'hdmap:formatType': 'ASAM OpenDRIVE',
          'hdmap:version': {
            '@value': '1.6',
            '@type': 'xsd:string',
          },
        },
        'hdmap:content': {
          '@type': 'hdmap:Content',
          'hdmap:roadTypes': 'Motorway',
          'hdmap:laneTypes': ['shoulder', 'driving', 'exit', 'none', 'stop', 'restricted', 'entry', 'walking'],
          'hdmap:levelOfDetail': 'car',
          'hdmap:trafficDirection': 'right-hand',
        },
        'hdmap:quantity': {
          '@type': 'hdmap:Quantity',
          'hdmap:length': {
            '@value': '2.68',
            '@type': 'xsd:float',
          },
          'hdmap:elevationRange': {
            '@value': '5.6',
            '@type': 'xsd:float',
          },
          'hdmap:numberIntersections': {
            '@value': '3',
            '@type': 'xsd:unsignedInt',
          },
          'hdmap:numberTrafficLights': {
            '@value': '0',
            '@type': 'xsd:unsignedInt',
          },
          'hdmap:numberTrafficSigns': {
            '@value': '0',
            '@type': 'xsd:unsignedInt',
          },
          'hdmap:numberObjects': {
            '@value': '0',
            '@type': 'xsd:unsignedInt',
          },
          'hdmap:numberOutlines': {
            '@value': '0',
            '@type': 'xsd:unsignedInt',
          },
          'hdmap:speedLimit': {
            '@type': 'general:Range2D',
            'general:min': {
              '@value': '50',
              '@type': 'xsd:float',
            },
            'general:max': {
              '@value': '250',
              '@type': 'xsd:float',
            },
          },
          'hdmap:rangeOfModeling': {
            '@value': '0',
            '@type': 'xsd:float',
          },
        },
        'hdmap:quality': {
          '@type': 'hdmap:Quality',
          'hdmap:precision': {
            '@value': '0.01',
            '@type': 'xsd:float',
          },
          'hdmap:accuracyLaneModel2d': {
            '@value': '0.1',
            '@type': 'xsd:float',
          },
          'hdmap:accuracyLaneModelHeight': {
            '@value': '0.1',
            '@type': 'xsd:float',
          },
          'hdmap:accuracySignals': {
            '@value': '0',
            '@type': 'xsd:float',
          },
          'hdmap:accuracyObjects': {
            '@value': '0',
            '@type': 'xsd:float',
          },
        },
        'hdmap:dataSource': {
          '@type': 'hdmap:DataSource',
          'hdmap:usedDataSources': {
            '@value': 'laserscanner',
            '@type': 'xsd:string',
          },
          'hdmap:measurementSystem': {
            '@value': '3DMS system',
            '@type': 'xsd:string',
          },
        },
        'hdmap:georeference': {
          '@type': 'georeference:Georeference',
          'georeference:projectLocation': {
            '@type': 'georeference:ProjectLocation',
            'georeference:country': {
              '@value': 'DE',
              '@type': 'xsd:string',
            },
            'georeference:state': {
              '@value': 'DE-NI',
              '@type': 'xsd:string',
            },
            'georeference:region': {
              '@value': 'Landkreis Helmstedt',
              '@type': 'xsd:string',
            },
            'georeference:city': {
              '@value': 'Königslutter am Elm',
              '@type': 'xsd:string',
            },
            'georeference:relationOrArea': {
              '@value': 'A39 Wolfsburg - Braunschweig',
              '@type': 'xsd:string',
            },
            'georeference:boundingBox': {
              '@type': 'georeference:BoundingBox',
              'georeference:xMin': {
                '@value': '10.72024',
                '@type': 'xsd:float',
              },
              'georeference:yMin': {
                '@value': '52.29648',
                '@type': 'xsd:float',
              },
              'georeference:xMax': {
                '@value': '10.732000',
                '@type': 'xsd:float',
              },
              'georeference:yMax': {
                '@value': '52.31636',
                '@type': 'xsd:float',
              },
            },
          },
          'georeference:geodeticReferenceSystem': {
            '@type': 'georeference:GeodeticReferenceSystem',
            'georeference:coordinateSystem': {
              '@value': '25832',
              '@type': 'xsd:string',
            },
            'georeference:origin': {
              '@type': 'georeference:Coordinate2D',
              'georeference:x': {
                '@value': '115000',
                '@type': 'xsd:float',
              },
              'georeference:y': {
                '@value': '5793000',
                '@type': 'xsd:float',
              },
            },
            'georeference:heightSystem': 'Orthometric height',
          },
        },
        'hdmap:speedLimit': {
          '@type': 'general:Range2D',
          'general:min': {
            '@value': '50',
            '@type': 'xsd:float',
          },
          'general:max': {
            '@value': '250',
            '@type': 'xsd:float',
          },
        },
      }

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
        decimals: 0,
        isBooleanAmount: true,
        name: 'TestfeldNiedersachsen_ALKS_ODR_sample',
        description: 'simple hdmap example file on Testfeld Niedersachsen for ALKS scenario',
        tags: ['GaiaX', 'ASCS', 'ENVITED-X', 'EVES', 'nft', 'ASAM OpenDRIVE 1.6'],
        minter: 'MINTER',
        creators: ['CREATOR'],
        publishers: ['Automotive Solution Center for Simulation e.V.', 'ENVITED-X Data Space'],
        date: '2024-10-29T00:00:00+00:00',
        type: 'EVES-003 https://github.com/ASCS-eV/EVES',
        rights: 'MIT',
        rightsUri: 'https://opensource.org/license/mit',
        language: 'en',
        artifactUri: 'https://assets.envited-x.net/ASSET_CID',
        identifier: 'ASSET_CID',
        externalUri: 'ipfs://MODIFIED_MANIFEST_CID',
        displayUri: 'ipfs://DISPLAY_URI_CID',
        formats: [
          {
            uri: 'https://assets.envited-x.net/ASSET_CID',
            hash: 'ASSET_CID',
            mimeType: 'application/zip',
            fileSize: 3158016,
            fileName: 'ASSET_CID.zip',
          },
          {
            uri: 'ipfs://MODIFIED_MANIFEST_CID',
            hash: 'MODIFIED_MANIFEST_CID',
            mimeType: 'application/json',
            fileSize: 8192,
            fileName: 'manifest.json',
          },
          {
            uri: 'ipfs://DISPLAY_URI_CID',
            hash: 'DISPLAY_URI_CID',
            mimeType: 'image/png',
            dimensions: {
              value: '1095x850',
              unit: 'px',
            },
            fileSize: 2400256,
            fileName: 'DISPLAY_URI',
          },
        ],
        attributes: [
          {
            name: 'de.gaiax4plcaad.ontology-management-base.hdmap',
            value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/hdmap/',
            type: 'uri',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.hdmap',
            value: 'ipfs://DOMAIN_METADATA_CID',
            type: 'application/json',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.manifest',
            value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/manifest/',
            type: 'uri',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.manifest',
            value: 'ipfs://MODIFIED_MANIFEST_CID',
            type: 'application/json',
          },
        ],
      }

      const result = await SUT.createTokenMetadata({
        assetCID: 'ASSET_CID',
        manifestCID: 'MODIFIED_MANIFEST_CID',
        domainMetadataCID: 'DOMAIN_METADATA_CID',
        displayUriCID: 'DISPLAY_URI_CID',
        displayUri: 'DISPLAY_URI',
        minter: 'MINTER',
        creator: 'CREATOR',
        manifest: manifest as any,
        domainMetadata,
      })

      expect(result).toEqual(expected)
    })
  })
})
