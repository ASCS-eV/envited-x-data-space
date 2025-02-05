import * as SUT from './utils'

describe('listener/utils', () => {
  // describe('extractAttributesUri', () => {
    // it('should return an empty array if the attributes array is empty', () => {
    //   // when ... we want to extract the attributes uri
    //   // then ... it should extract the attributes uri as expected

    //   const attributes = [
    //     {
    //       name: 'ASSET_NAME.ASSET_TYPE',
    //       value: 'ASSET_URI',
    //       type: 'uri',
    //     },
    //     {
    //       name: 'ASSET_NAME.ASSET_TYPE',
    //       value: 'ASSET_IPFS_URI',
    //       type: 'application/json',
    //     },
    //     {
    //       name: 'ASSET_NAME.manifest',
    //       value: 'ASSET_DEFINITION_URI',
    //       type: 'uri',
    //     },
    //     {
    //       name: 'ASSET_NAME.manifest',
    //       value: 'ASSET_MANIFEST_IFPS_URI',
    //       type: 'application/json',
    //     },
    //   ]

    //   const expected = 'ASSET_IPFS_URI'

    //   const result = SUT.extractAttributesUri(attributes)

    //   expect(result).toEqual(expected)
    // })
  // })

  describe('extractKeyValuePairs', () => {
    it('should return key value pairs from the manifest', () => {
      // when ... we want to extract the key value pairs
      // then ... it should extract the key value pairs as expected
      const manifest = 
      {
      "@context": {
      "gx": "https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#",
      "general": "https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/",
      "sh": "http://www.w3.org/ns/shacl#",
      "hdmap": "https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/",
      "xsd": "http://www.w3.org/2001/XMLSchema#",
      "skos": "http://www.w3.org/2004/02/skos/core#",
      "georeference": "https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/georeference/"
      },
      "@id": "did:web:registry.gaia-x.eu:HdMap:DjHgK5ErTBow1Ya3J05tW9l12skGWgZn6kA9",
      "@type": "hdmap:HdMap",
      "hdmap:general": {
      "@type": "general:General",
      "general:description": {
      "@type": "general:Description",
      "general:name": {
      "@value": "TestfeldNiedersachsen_ALKS_ODR_sample",
      "@type": "xsd:string"
      },
      "general:description": {
      "@value": "simple hdmap example file on Testfeld Niedersachsen for ALKS scenario",
      "@type": "xsd:string"
      }
      },
      "general:data": {
      "@type": "general:Data",
      "general:size": {
      "@value": "5",
      "@type": "xsd:float"
      },
      "general:recordingTime": {
      "@value": "2020-05-26T12:00:00",
      "@type": "xsd:dateTime"
      }
      },
      "general:range2D": {
      "@type": "general:Range2D"
      }
      },
      "hdmap:format": {
      "@type": "hdmap:Format",
      "hdmap:formatType": "ASAM OpenDRIVE",
      "hdmap:version": {
      "@value": "1.6",
      "@type": "xsd:string"
      }
      },
      "hdmap:content": {
      "@type": "hdmap:Content",
      "hdmap:roadTypes": "Motorway",
      "hdmap:laneTypes": [
      "shoulder",
      "driving",
      "exit",
      "none",
      "stop",
      "restricted",
      "entry",
      "walking"
      ],
      "hdmap:levelOfDetail": "car",
      "hdmap:trafficDirection": "right-hand"
      },
      "hdmap:quantity": {
      "@type": "hdmap:Quantity",
      "hdmap:length": {
      "@value": "2.68",
      "@type": "xsd:float"
      },
      "hdmap:elevationRange": {
      "@value": "5.6",
      "@type": "xsd:float"
      },
      "hdmap:numberIntersections": {
      "@value": "3",
      "@type": "xsd:unsignedInt"
      },
      "hdmap:numberTrafficLights": {
      "@value": "0",
      "@type": "xsd:unsignedInt"
      },
      "hdmap:numberTrafficSigns": {
      "@value": "0",
      "@type": "xsd:unsignedInt"
      },
      "hdmap:numberObjects": {
      "@value": "0",
      "@type": "xsd:unsignedInt"
      },
      "hdmap:numberOutlines": {
      "@value": "0",
      "@type": "xsd:unsignedInt"
      },
      "hdmap:speedLimit": {
      "@type": "general:Range2D",
      "general:min": {
      "@value": "50",
      "@type": "xsd:float"
      },
      "general:max": {
      "@value": "250",
      "@type": "xsd:float"
      }
      },
      "hdmap:rangeOfModeling": {
      "@value": "0",
      "@type": "xsd:float"
      }
      },
      "hdmap:quality": {
      "@type": "hdmap:Quality",
      "hdmap:precision": {
      "@value": "0.01",
      "@type": "xsd:float"
      },
      "hdmap:accuracyLaneModel2d": {
      "@value": "0.1",
      "@type": "xsd:float"
      },
      "hdmap:accuracyLaneModelHeight": {
      "@value": "0.1",
      "@type": "xsd:float"
      },
      "hdmap:accuracySignals": {
      "@value": "0",
      "@type": "xsd:float"
      },
      "hdmap:accuracyObjects": {
      "@value": "0",
      "@type": "xsd:float"
      }
      },
      "hdmap:dataSource": {
      "@type": "hdmap:DataSource",
      "hdmap:usedDataSources": {
      "@value": "laserscanner",
      "@type": "xsd:string"
      },
      "hdmap:measurementSystem": {
      "@value": "3DMS system",
      "@type": "xsd:string"
      }
      },
      "hdmap:georeference": {
      "@type": "georeference:Georeference",
      "georeference:projectLocation": {
      "@type": "georeference:ProjectLocation",
      "georeference:country": {
      "@value": "DE",
      "@type": "xsd:string"
      },
      "georeference:state": {
      "@value": "DE-NI",
      "@type": "xsd:string"
      },
      "georeference:region": {
      "@value": "Landkreis Helmstedt",
      "@type": "xsd:string"
      },
      "georeference:city": {
      "@value": "Königslutter am Elm",
      "@type": "xsd:string"
      },
      "georeference:relationOrArea": {
      "@value": "A39 Wolfsburg - Braunschweig",
      "@type": "xsd:string"
      },
      "georeference:boundingBox": {
      "@type": "georeference:BoundingBox",
      "georeference:xMin": {
      "@value": "10.72024",
      "@type": "xsd:float"
      },
      "georeference:yMin": {
      "@value": "52.29648",
      "@type": "xsd:float"
      },
      "georeference:xMax": {
      "@value": "10.732000",
      "@type": "xsd:float"
      },
      "georeference:yMax": {
      "@value": "52.31636",
      "@type": "xsd:float"
      }
      }
      },
      "georeference:geodeticReferenceSystem": {
      "@type": "georeference:GeodeticReferenceSystem",
      "georeference:coordinateSystem": {
      "@value": "25832",
      "@type": "xsd:string"
      },
      "georeference:origin": {
      "@type": "georeference:Coordinate2D",
      "georeference:x": {
      "@value": "115000",
      "@type": "xsd:float"
      },
      "georeference:y": {
      "@value": "5793000",
      "@type": "xsd:float"
      }
      },
      "georeference:heightSystem": "Orthometric height"
      }
      },
      "hdmap:speedLimit": {
      "@type": "general:Range2D",
      "general:min": {
      "@value": "50",
      "@type": "xsd:float"
      },
      "general:max": {
      "@value": "250",
      "@type": "xsd:float"
      }
      }
      }
      const expected = [
        {
          name: 'hdmap:general:general:description:general:name',
          value: 'TestfeldNiedersachsen_ALKS_ODR_sample'
        },
        {
          name: 'hdmap:general:general:description:general:description',
          value: 'simple hdmap example file on Testfeld Niedersachsen for ALKS scenario'
        },
        { name: 'hdmap:general:general:data:general:size', value: '5' },
        {
          name: 'hdmap:general:general:data:general:recordingTime',
          value: '2020-05-26T12:00:00'
        },
        { name: 'hdmap:format:hdmap:version', value: '1.6' },
        { name: 'hdmap:quantity:hdmap:length', value: '2.68' },
        { name: 'hdmap:quantity:hdmap:elevationRange', value: '5.6' },
        { name: 'hdmap:quantity:hdmap:numberIntersections', value: '3' },
        { name: 'hdmap:quantity:hdmap:numberTrafficLights', value: '0' },
        { name: 'hdmap:quantity:hdmap:numberTrafficSigns', value: '0' },
        { name: 'hdmap:quantity:hdmap:numberObjects', value: '0' },
        { name: 'hdmap:quantity:hdmap:numberOutlines', value: '0' },
        { name: 'hdmap:quantity:hdmap:speedLimit:general:min', value: '50' },
        { name: 'hdmap:quantity:hdmap:speedLimit:general:max', value: '250' },
        { name: 'hdmap:quantity:hdmap:rangeOfModeling', value: '0' },
        { name: 'hdmap:quality:hdmap:precision', value: '0.01' },
        { name: 'hdmap:quality:hdmap:accuracyLaneModel2d', value: '0.1' },
        { name: 'hdmap:quality:hdmap:accuracyLaneModelHeight', value: '0.1' },
        { name: 'hdmap:quality:hdmap:accuracySignals', value: '0' },
        { name: 'hdmap:quality:hdmap:accuracyObjects', value: '0' },
        {
          name: 'hdmap:dataSource:hdmap:usedDataSources',
          value: 'laserscanner'
        },
        {
          name: 'hdmap:dataSource:hdmap:measurementSystem',
          value: '3DMS system'
        },
        {
          name: 'hdmap:georeference:georeference:projectLocation:georeference:country',
          value: 'DE'
        },
        {
          name: 'hdmap:georeference:georeference:projectLocation:georeference:state',
          value: 'DE-NI'
        },
        {
          name: 'hdmap:georeference:georeference:projectLocation:georeference:region',
          value: 'Landkreis Helmstedt'
        },
        {
          name: 'hdmap:georeference:georeference:projectLocation:georeference:city',
          value: 'Königslutter am Elm'
        },
        {
          name: 'hdmap:georeference:georeference:projectLocation:georeference:relationOrArea',
          value: 'A39 Wolfsburg - Braunschweig'
        },
        {
          name: 'hdmap:georeference:georeference:projectLocation:georeference:boundingBox:georeference:xMin',
          value: '10.72024'
        },
        {
          name: 'hdmap:georeference:georeference:projectLocation:georeference:boundingBox:georeference:yMin',
          value: '52.29648'
        },
        {
          name: 'hdmap:georeference:georeference:projectLocation:georeference:boundingBox:georeference:xMax',
          value: '10.732000'
        },
        {
          name: 'hdmap:georeference:georeference:projectLocation:georeference:boundingBox:georeference:yMax',
          value: '52.31636'
        },
        {
          name: 'hdmap:georeference:georeference:geodeticReferenceSystem:georeference:coordinateSystem',
          value: '25832'
        },
        {
          name: 'hdmap:georeference:georeference:geodeticReferenceSystem:georeference:origin:georeference:x',
          value: '115000'
        },
        {
          name: 'hdmap:georeference:georeference:geodeticReferenceSystem:georeference:origin:georeference:y',
          value: '5793000'
        },
        { name: 'hdmap:speedLimit:general:min', value: '50' },
        { name: 'hdmap:speedLimit:general:max', value: '250' }
      ]
      const result = SUT.extractKeyValuePairs(manifest)
      expect(result).toEqual(expected)
    })
  })
})
