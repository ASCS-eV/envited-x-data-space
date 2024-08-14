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

  describe('extractTokenMetadataFromHDMap', () => {
    it('should extract data from json', () => {
      const data = {
        "@context": {
          "general": "https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/",
          "gx": "https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#",
          "sh": "http://www.w3.org/ns/shacl#",
          "hdmap": "https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/",
          "xsd": "http://www.w3.org/2001/XMLSchema#",
          "skos": "http://www.w3.org/2004/02/skos/core#",
          "georeference": "https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/georeference/"
        },
        "@id": "did:web:envited.register.market:HdMap:0190fed8-aa5b-75fe-b4a8-e513c8ef8c5f",
        "@type": "hdmap:HdMap",
        "hdmap:general": {
          "@type": "general:General",
          "general:description": {
            "@type": "general:Description",
            "gx:name": {
              "@value": "Gaia_X_Example_Asset_TestfeldNiedersachsen_ALKS_ODR_offset",
              "@type": "xsd:string"
            },
            "gx:description": {
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
            "general:contractId": {
              "@value": "123456789",
              "@type": "xsd:string"
            },
            "general:recordingTime": {
              "@value": "2020-05-26T12:00:00",
              "@type": "xsd:dateTime"
            }
          },
          "general:links": {
            "@type": "general:Links",
            "general:data_protected": {
              "@type": "general:Link",
              "general:url": {
                "@value": "./asset.zip",
                "@type": "xsd:anyURI"
              },
              "general:type": "Asset"
            },
            "general:media": {
              "@type": "general:Link",
              "general:url": {
                "@value": "./asset/metadata/domainMetadata.json",
                "@type": "xsd:anyURI"
              },
              "general:type": "Metadata"
            },
           "general:media": {
              "@type": "general:Link",
              "general:url": {
                "@value": "./asset/metadata/gxMetadata.json",
                "@type": "xsd:anyURI"
              },
              "general:type": "Metadata"
            },
            "general:media": {
              "@type": "general:Link",
              "general:url": {
                "@value": "./asset/LICENSE",
                "@type": "xsd:anyURI"
              },
              "general:type": "License"
            },
            "general:media": {
              "@type": "general:Link",
              "general:url": {
                "@value": "./asset/visualization/Gaia_X_Example_Asset_TestfeldNiedersachsen_ALKS_ODR_eyecatcher.png",
                "@type": "xsd:anyURI"
              },
              "general:type": "Image"
            },
            "general:media": {
              "@type": "general:Link",
              "general:url": {
                "@value": "./asset/visualization/Gaia_X_Example_Asset_TestfeldNiedersachsen_ALKS_ODR_impression-01.png",
                "@type": "xsd:anyURI"
              },
              "general:type": "Image"
            },
            "general:media": {
              "@type": "general:Link",
              "general:url": {
                  "@value": "./asset/visualization/Gaia_X_Example_Asset_TestfeldNiedersachsen_ALKS_ODR_impression-02.png",
                  "@type": "xsd:anyURI"
              },
              "general:type": "Image"
            },   
            "general:media": {
              "@type": "general:Link",
              "general:url": {
                  "@value": "./asset/visualization/bbox.geojson",
                  "@type": "xsd:anyURI"
              },
              "general:type": "3DPreview"
            }, 
            "general:media": {
              "@type": "general:Link",
              "general:url": {
                  "@value": "./asset/visualization/roadNetwork.geojson",
                  "@type": "xsd:anyURI"
              },
              "general:type": "3DPreview"
            },  
            "general:media": {
              "@type": "general:Link",
              "general:url": {
                "@value": "./asset/documentation/Gaia_X_Example_Asset_TestfeldNiedersachsen_ALKS_ODR_technicalDocumentation.pdf",
                "@type": "xsd:anyURI"
              },
              "general:type": "Document"
            },
            "general:media": {
              "@type": "general:Link",
              "general:url": {
                "@value": "./asset/documentation/Gaia_X_Example_Asset_TestfeldNiedersachsen_ALKS_ODR_technicalDocumentation_stats.txt",
                "@type": "xsd:anyURI"
              },
              "general:type": "Document"
            },
            "general:media": {
              "@type": "general:Link",
              "general:url": {
                  "@value": "./asset/visualization/detailRoadNetwork.geojson",
                  "@type": "xsd:anyURI"
              },
              "general:type": "3DPreview"
            },  
            "general:media": {
              "@type": "general:Link",
              "general:url": {
                  "@value": "./asset/validation/qcReport.txt",
                  "@type": "xsd:anyURI"
              },
              "general:type": "Validation"
            } 
          },
          "general:bundleData": {
            "@type": "general:BundleData",
            "general:requiredData": {
              "@type": "general:Link"
            },
              "general:relatedData": {
              "@type": "general:Link",
              "general:url": {
                "@value": "did:web:envited.register.market:scenario:0190fed8-aa5b-75fe-b4a8-e513c8ef8c5f",
                "@type": "xsd:anyURI"
              },
              "general:type": "Asset"
            }
          }
        },
        "hdmap:format": {
          "@type": "hdmap:Format",
          "hdmap:type": "ASAM OpenDRIVE",
          "hdmap:version": {
            "@value": "1.6",
            "@type": "xsd:string"
          }
        },
        "hdmap:content": {
          "@type": "hdmap:Content",
          "hdmap:roadTypes": "motorway",
          "hdmap:laneTypes": [
            "none",
            "shoulder",
            "driving",
            "exit",
            "border",
            "stop",
            "restricted",
            "entry",
            "walking"
          ],
          "hdmap:levelOfDetail": "",
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
              "@value": "250",
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
          "@type": "georeference:GeoreferenceShape",
          "georeference:projectLocation": {
            "@type": "georeference:ProjectLocation",
            "georeference:country": {
              "@value": "DE",
              "@type": "xsd:string"
            },
            "georeference:state": {
              "@value": "Lower Saxony",
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
        }
      }
      const result = SUT.extractTokenMetadataFromHDMap(data)
      
      console.log(result)

      return result
    })
  })
})
