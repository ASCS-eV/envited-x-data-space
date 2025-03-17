import fs from 'fs'
import { map, mergeAll } from 'ramda'

import { SCHEMA_MAP } from '../../validator/shacl/shacl.constants'
import { extractAllShaclMetadata, extractShaclMetadata, organizeDataIntoSections } from './utils'

describe('common/asset/displayTrees/utils', () => {
  let ttlContent
  let jsonData

  beforeAll(() => {
    ttlContent = fs.readFileSync(`${process.cwd()}/apps/envited-x-data-space/common/fixtures/hdmap_shacl.ttl`, 'utf-8')
    jsonData = JSON.parse(
      fs.readFileSync(`${process.cwd()}/apps/envited-x-data-space/common/fixtures/hdmap_metadata.json`, 'utf-8'),
    )
  })

  describe('extractShaclMetadata', () => {
    it('Extracts sections and properties from SHACL TTL', () => {
      const sections = extractShaclMetadata(ttlContent)

      expect(sections).toStrictEqual({
        'hdmap:HdMap': {
          name: 'hdmap:HdMap',
          properties: {
            'hdmap:general': {
              name: 'general object',
              description: 'General properties common for all simulation assets.',
            },
            'hdmap:format': {
              name: 'format object',
              description: 'Contains properties to describe the format of the HD map asset.',
            },
            'hdmap:content': {
              name: 'content object',
              description:
                'Defines the content (road types, lane types, object types, traffic direction) of the HD map asset.',
            },
            'hdmap:quantity': {
              name: 'quantity object',
              description:
                'Contains properties to describe the quantity (e.g. number of intersections, traffic lights, signs, length, range of speed limits/elevations) of the HD map asset.',
            },
            'hdmap:quality': {
              name: 'quality object',
              description: 'Contains properties to describe the accuracy of the HD map asset.',
            },
            'hdmap:dataSource': {
              name: 'dataSource object',
              description: 'Defines which data resources or measurement systems were used to create the HD map asset.',
            },
            'hdmap:georeference': {
              name: 'georeference object',
              description: 'General properties for defining the location and projection of the HD map asset.',
            },
          },
        },
        'hdmap:Content': {
          name: 'hdmap:Content',
          properties: {
            'hdmap:roadTypes': {
              name: 'road types',
              description:
                'Lists the road types used in the HD map asset. See ASAM OpenDRIVE 1.8.1 Chapter 10.4 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/10_roads/10_04_road_type.html)',
            },
            'hdmap:laneTypes': {
              name: 'lane types',
              description:
                'Lists the lanes types used in the HD map asset. See ASAM OpenDRIVE 1.8.1 Chapter 11.7.1 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/11_lanes/11_07_lane_properties.html).',
            },
            'hdmap:levelOfDetail': {
              name: 'level of detail',
              description:
                'Lists the object types used in the HD map asset. See ASAM OpenDRIVE 1.8.1 Annex A.4.5 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/16_annexes/enumerations/map_uml_enumerations.html#top-EAID_C47587D0_7173_42df_8BB7_36B2C598D95F)',
            },
            'hdmap:trafficDirection': {
              name: 'traffic direction',
              description: 'Indicates whether the HD map is designed for left or right-hand traffic.',
            },
          },
        },
        'hdmap:DataSource': {
          name: 'hdmap:DataSource',
          properties: {
            'hdmap:measurementSystem': {
              name: 'measurement system',
              description: 'Specifies the name of the primary acquisition device.',
            },
            'hdmap:usedDataSources': {
              name: 'used data sources',
              description: 'Indicates the source data used to create the HD map.',
            },
          },
        },
        'hdmap:Format': {
          name: 'hdmap:Format',
          properties: {
            'hdmap:version': {
              name: 'version',
              description: 'Defines the version of the data format used for the HD map asset.',
            },
            'hdmap:formatType': {
              name: 'type',
              description: 'Defines the type of data format used for the HD map asset.',
            },
          },
        },
        'hdmap:Quality': {
          name: 'hdmap:Quality',
          properties: {
            'hdmap:accuracySignals': {
              name: 'accuracy signals',
              description: 'Specifies the accuracy of traffic-relevant signals, signs and objects in metres.',
            },
            'hdmap:accuracyObjects': {
              name: 'accuracy objects',
              description:
                'Specifies the accuracy, in metres, of objects within the traffic area that do not directly affect traffic.',
            },
            'hdmap:accuracyLaneModelHeight': {
              name: 'accuracy lane model height',
              description: "Specifies the accuracy of the lane model's height in metres.",
            },
            'hdmap:precision': {
              name: 'precision',
              description: 'Specifies the relative precision of the measured road network in metres.',
            },
            'hdmap:accuracyLaneModel2d': {
              name: 'accuracy lane model 2d',
              description: 'Specifies the accuracy of the lane model in the 2D plane in metres.',
            },
          },
        },
        'hdmap:Quantity': {
          name: 'hdmap:Quantity',
          properties: {
            'hdmap:numberIntersections': {
              name: 'number intersections',
              description:
                'Specifies the total number of intersections defined in the HD map. See ASAM OpenDRIVE 1.8.1 Chapter 12.1 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/12_junctions/12_01_introduction.html)',
            },
            'hdmap:numberTrafficLights': {
              name: 'number traffic lights',
              description: 'Specifies the number of all traffic lights defined in the HD map.',
            },
            'hdmap:rangeOfModeling': {
              name: 'range of modeling',
              description:
                'Indicates the distance (in metres) to which the area beyond the traffic area has been modeled.',
            },
            'hdmap:numberOutlines': {
              name: 'number outlines',
              description:
                'Specifies the number of all outline objects defined in the HD map. See ASAM OpenDRIVE 1.8.1 Chapter 13.3 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/13_objects/13_03_object_outline.html)',
            },
            'hdmap:speedLimit': {
              name: 'speed limit',
              description:
                'Specifies the range of speed limits defined in the HD map, using the unit specified in the HD map. See ASAM OpenDRIVE 1.8.1 Annex A.1.4 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/16_annexes/enumerations/map_uml_enumerations.html#top-EAID_491DC05E_01C6_49b3_83BE_A06DD81F9C35)',
            },
            'hdmap:length': {
              name: 'length',
              description: 'Defines the total length (sum of road lengths) of the road network in kilometres.',
            },
            'hdmap:elevationRange': {
              name: 'elevation range',
              description:
                'Specifies the difference between the maximum and minimum height of the road elevation profiles in metres. See ASAM OpenDRIVE 1.8.1 Chapter 10.5 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/10_roads/10_05_elevation.html)',
            },
            'hdmap:numberObjects': {
              name: 'number objects',
              description:
                'Specifies the number of all objects in the HD map. See ASAM OpenDRIVE 1.8.1 Chapter 13.1 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/13_objects/13_01_introduction.html)',
            },
            'hdmap:numberTrafficSigns': {
              name: 'number traffic signs',
              description:
                'Specifies the number of all traffic signs (signals) in the HD map. See ASAM OpenDRIVE 1.8.1 Chapter 14.1 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/14_signals/14_01_introduction.html)',
            },
          },
        },
        'hdmap:Range2D': {
          name: 'hdmap:Range2D',
          properties: {
            'hdmap:max': {
              name: 'max',
              description: 'The maximum value of the range.',
            },
            'hdmap:min': {
              name: 'min',
              description: 'The minimum value of the range.',
            },
          },
        },
      })
      expect(sections).toHaveProperty('hdmap:HdMap')
      expect(sections['hdmap:Content'].properties).toHaveProperty('hdmap:roadTypes')
      expect(sections['hdmap:Content'].properties['hdmap:roadTypes']).toEqual({
        name: 'road types',
        description:
          'Lists the road types used in the HD map asset. See ASAM OpenDRIVE 1.8.1 Chapter 10.4 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/10_roads/10_04_road_type.html)',
      })

      expect(sections).toHaveProperty('hdmap:Quality')
      expect(sections['hdmap:Quality'].properties).toHaveProperty('hdmap:precision')
      expect(sections['hdmap:Quality'].properties['hdmap:precision']).toEqual({
        name: 'precision',
        description: 'Specifies the relative precision of the measured road network in metres.',
      })
    })
  })

  describe('organizeDataIntoSections', () => {
    it('Organizes JSON data into structured sections with descriptions', () => {
      const sections = extractShaclMetadata(ttlContent)
      const structuredData = organizeDataIntoSections(jsonData, sections)

      expect(structuredData).toStrictEqual({
        'hdmap:Content': {
          name: 'hdmap:Content',
          properties: {
            'hdmap:laneTypes': {
              description:
                'Lists the lanes types used in the HD map asset. See ASAM OpenDRIVE 1.8.1 Chapter 11.7.1 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/11_lanes/11_07_lane_properties.html).',
              name: 'lane types',
              type: null,
              value: ['shoulder', 'driving', 'exit', 'none', 'stop', 'restricted', 'entry', 'walking'],
            },
            'hdmap:levelOfDetail': {
              description:
                'Lists the object types used in the HD map asset. See ASAM OpenDRIVE 1.8.1 Annex A.4.5 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/16_annexes/enumerations/map_uml_enumerations.html#top-EAID_C47587D0_7173_42df_8BB7_36B2C598D95F)',
              name: 'level of detail',
              type: null,
              value: 'car',
            },
            'hdmap:roadTypes': {
              description:
                'Lists the road types used in the HD map asset. See ASAM OpenDRIVE 1.8.1 Chapter 10.4 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/10_roads/10_04_road_type.html)',
              name: 'road types',
              type: null,
              value: 'Motorway',
            },
            'hdmap:trafficDirection': {
              description: 'Indicates whether the HD map is designed for left or right-hand traffic.',
              name: 'traffic direction',
              type: null,
              value: 'right-hand',
            },
          },
        },
        'hdmap:DataSource': {
          name: 'hdmap:DataSource',
          properties: {
            'hdmap:measurementSystem': {
              description: 'Specifies the name of the primary acquisition device.',
              name: 'measurement system',
              type: 'xsd:string',
              value: '3DMS system',
            },
            'hdmap:usedDataSources': {
              description: 'Indicates the source data used to create the HD map.',
              name: 'used data sources',
              type: 'xsd:string',
              value: 'laserscanner',
            },
          },
        },
        'hdmap:Format': {
          name: 'hdmap:Format',
          properties: {
            'hdmap:formatType': {
              description: 'Defines the type of data format used for the HD map asset.',
              name: 'type',
              type: null,
              value: 'ASAM OpenDRIVE',
            },
            'hdmap:version': {
              description: 'Defines the version of the data format used for the HD map asset.',
              name: 'version',
              type: 'xsd:string',
              value: '1.6',
            },
          },
        },
        'hdmap:Quality': {
          name: 'hdmap:Quality',
          properties: {
            'hdmap:accuracyLaneModel2d': {
              description: 'Specifies the accuracy of the lane model in the 2D plane in metres.',
              name: 'accuracy lane model 2d',
              type: 'xsd:float',
              value: '0.1',
            },
            'hdmap:accuracyLaneModelHeight': {
              description: "Specifies the accuracy of the lane model's height in metres.",
              name: 'accuracy lane model height',
              type: 'xsd:float',
              value: '0.1',
            },
            'hdmap:accuracyObjects': {
              description:
                'Specifies the accuracy, in metres, of objects within the traffic area that do not directly affect traffic.',
              name: 'accuracy objects',
              type: 'xsd:float',
              value: '0',
            },
            'hdmap:accuracySignals': {
              description: 'Specifies the accuracy of traffic-relevant signals, signs and objects in metres.',
              name: 'accuracy signals',
              type: 'xsd:float',
              value: '0',
            },
            'hdmap:precision': {
              description: 'Specifies the relative precision of the measured road network in metres.',
              name: 'precision',
              type: 'xsd:float',
              value: '0.01',
            },
          },
        },
        'hdmap:Quantity': {
          name: 'hdmap:Quantity',
          properties: {
            'hdmap:elevationRange': {
              description:
                'Specifies the difference between the maximum and minimum height of the road elevation profiles in metres. See ASAM OpenDRIVE 1.8.1 Chapter 10.5 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/10_roads/10_05_elevation.html)',
              name: 'elevation range',
              type: 'xsd:float',
              value: '5.6',
            },
            'hdmap:length': {
              description: 'Defines the total length (sum of road lengths) of the road network in kilometres.',
              name: 'length',
              type: 'xsd:float',
              value: '2.68',
            },
            'hdmap:numberIntersections': {
              description:
                'Specifies the total number of intersections defined in the HD map. See ASAM OpenDRIVE 1.8.1 Chapter 12.1 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/12_junctions/12_01_introduction.html)',
              name: 'number intersections',
              type: 'xsd:unsignedInt',
              value: '3',
            },
            'hdmap:numberObjects': {
              description:
                'Specifies the number of all objects in the HD map. See ASAM OpenDRIVE 1.8.1 Chapter 13.1 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/13_objects/13_01_introduction.html)',
              name: 'number objects',
              type: 'xsd:unsignedInt',
              value: '0',
            },
            'hdmap:numberOutlines': {
              description:
                'Specifies the number of all outline objects defined in the HD map. See ASAM OpenDRIVE 1.8.1 Chapter 13.3 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/13_objects/13_03_object_outline.html)',
              name: 'number outlines',
              type: 'xsd:unsignedInt',
              value: '0',
            },
            'hdmap:numberTrafficLights': {
              description: 'Specifies the number of all traffic lights defined in the HD map.',
              name: 'number traffic lights',
              type: 'xsd:unsignedInt',
              value: '0',
            },
            'hdmap:numberTrafficSigns': {
              description:
                'Specifies the number of all traffic signs (signals) in the HD map. See ASAM OpenDRIVE 1.8.1 Chapter 14.1 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/14_signals/14_01_introduction.html)',
              name: 'number traffic signs',
              type: 'xsd:unsignedInt',
              value: '0',
            },
            'hdmap:rangeOfModeling': {
              description:
                'Indicates the distance (in metres) to which the area beyond the traffic area has been modeled.',
              name: 'range of modeling',
              type: 'xsd:float',
              value: '0',
            },
            'hdmap:speedLimit': {
              description:
                'Specifies the range of speed limits defined in the HD map, using the unit specified in the HD map. See ASAM OpenDRIVE 1.8.1 Annex A.1.4 (https://publications.pages.asam.net/standards/ASAM_OpenDRIVE/ASAM_OpenDRIVE_Specification/latest/specification/16_annexes/enumerations/map_uml_enumerations.html#top-EAID_491DC05E_01C6_49b3_83BE_A06DD81F9C35)',
              name: 'speed limit',
              type: 'general:Range2D',
              value: {
                '@type': 'general:Range2D',
                'general:max': { '@type': 'xsd:float', '@value': '250' },
                'general:min': { '@type': 'xsd:float', '@value': '50' },
              },
            },
          },
        },
      })
    })
  })

  describe('extractAllShaclMetadata', () => {
    it('Organizes JSON data into structured sections with descriptions', () => {
      const schemas = extractAllShaclMetadata(jsonData)
      const allSections = map(schema => {
        const schaclSchema = fs.readFileSync(
          `${process.cwd()}/apps/envited-x-data-space/public${SCHEMA_MAP[schema]}`,
          'utf-8',
        )

        return extractShaclMetadata(schaclSchema)
      })(schemas)

      const sections = mergeAll(allSections)
      const structuredData = organizeDataIntoSections(jsonData, sections)

      // console.log(structuredData)
    })
  })
})
