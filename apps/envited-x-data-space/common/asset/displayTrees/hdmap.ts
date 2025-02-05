export const hdmap = {
  format: 'ASAM OpenDrive',
  terms: [
    {
      name: 'Format',
      value: 'ASAM OpenDrive',
    },
    {
      name: 'Version',
      path: ['hdmap', 'general', 'general', 'data', 'general', 'version'],
    },
    {
      name: 'Recording time',
      path: ['hdmap', 'general', 'general', 'data', 'general', 'recordingTime'],
    },
    {
      name: 'Size',
      path: ['hdmap', 'general', 'general', 'data', 'general', 'size'],
    },
  ],
  categories: [
    {
      name: 'Content',
      sections: [
        {
          name: 'Quantity',
          items: [
            {
              name: 'Number intersections',
              path: ['hdmap', 'quantity', 'hdmap', 'numberIntersections'], 
            },
            {
              name: 'Length',
              path: ['hdmap', 'quantity', 'hdmap', 'length'], 
            },
            {
              name: 'Number traffic lights',
              path: ['hdmap', 'quantity', 'hdmap', 'numberTrafficLights'],
            },
            {
              name: 'Elevation range',
              path: ['hdmap', 'quantity', 'hdmap', 'elevationRange'], 
            },
            {
              name: 'Range of modeling',
              path: ['hdmap', 'quantity', 'hdmap', 'rangeOfModeling'],
            },
            {
              name: 'Number of objects',
              path: ['hdmap', 'quantity', 'hdmap', 'numberObjects'],
            },
            {
              name: 'Number of traffic signs',
              path: ['hdmap', 'quantity', 'hdmap', 'numberTrafficSigns'],
            },
            {
              name: 'Number outlines',
              path: ['hdmap', 'quantity', 'hdmap', 'numberOutlines'],
            },
            {
              name: 'Speed limit',
              paths: [
                {
                  name: 'Min',
                  path: ['hdmap', 'quantity', 'hdmap', 'speedLimit', 'general', 'min'],
                },
                {
                  name: 'Max',
                  path: ['hdmap', 'quantity', 'hdmap', 'speedLimit', 'general', 'max'],
                }
              ]
            }
          ],
        },
      ],
    }, {
      name: 'Product details',
      sections: [
        {
          name: 'Quality',
          items: [
            {
              name: 'Accuracy Signals',
              path: ['hdmap', 'quality', 'hdmap', 'accuracySignals'],
            },
            {
              name: 'Precision',
              path: ['hdmap', 'quality', 'hdmap', 'precision'],
            },
            {
              name: 'Accuracy Objects',
              path: ['hdmap', 'quality', 'hdmap', 'accuracyObjects'],
            },
            {
              name: 'Accuracy Lane Model 2d',
              path: ['hdmap', 'quality', 'hdmap', 'accuracyLaneModel2d'],
            },
            {
              name: 'Accuracy Lane Model Height',
              path: ['hdmap', 'quality', 'hdmap', 'accuracyLaneModelHeight'],
            },
          ],
        },
        {
          name: 'Data Source',
          items: [
            {
              name: 'Measurement System',
              path: ['hdmap', 'dataSource', 'hdmap', 'measurementSystem'],
            },
            {
              name: 'Used Data Sources',
              path: ['hdmap', 'dataSource', 'hdmap', 'usedDataSources'],
            },
          ],
        }
      ],
    }, {
      name: 'Location',
      sections: [
        {
          name: 'Project Location',
          items: [
            {
              name: 'Country',
              path: ['hdmap', 'georeference', 'georeference', 'projectLocation', 'georeference', 'country'],
            },
            {
              name: 'State',
              path: ['hdmap', 'georeference', 'georeference', 'projectLocation', 'georeference', 'state'],
            },
            {
              name: 'Region',
              path: ['hdmap', 'georeference', 'georeference', 'projectLocation', 'georeference', 'region'],
            },
            {
              name: 'City',
              path: ['hdmap', 'georeference', 'georeference', 'projectLocation', 'georeference', 'city'],
            },
            {
              name: 'Relation or Area',
              path: ['hdmap', 'georeference', 'georeference', 'projectLocation', 'georeference', 'relationOrArea'],
            },
          ],
        },
        {
          name: 'Geodetic Reference System',
          items: [
            {
              name: 'Origin',
              paths: [
                {
                  name: 'X', 
                  path: ['hdmap', 'georeference', 'georeference', 'geodeticReferenceSystem', 'georeference', 'origin', 'georeference','x'],
                },
                {
                  name: 'Y', 
                  path: ['hdmap', 'georeference', 'georeference', 'geodeticReferenceSystem', 'georeference', 'origin', 'georeference','y'],
                }
              ]
            },
            {
              name: 'Coordinate System',
              path: ['hdmap', 'georeference', 'georeference', 'geodeticReferenceSystem', 'georeference', 'coordinateSystem'],
            },
            {
              name: 'Height System',
              path: ['hdmap', 'georeference', 'georeference', 'geodeticReferenceSystem', 'georeference', 'heightSystem'],
            },
            {
              name: 'Bounding Box',
              paths: [
                {
                  name: 'X Min',
                  path: ['hdmap', 'georeference', 'georeference', 'projectLocation', 'georeference', 'boundingBox', 'georeference', 'xMin'],
                },
                {
                  name: 'Y Min',
                  path: ['hdmap', 'georeference', 'georeference', 'projectLocation', 'georeference', 'boundingBox', 'georeference', 'yMin'],
                },
                {
                  name: 'X Max',
                  path: ['hdmap', 'georeference', 'georeference', 'projectLocation', 'georeference', 'boundingBox', 'georeference', 'xMax'],
                },
                {
                  name: 'Y Max',
                  path: ['hdmap', 'georeference', 'georeference', 'projectLocation', 'georeference', 'boundingBox', 'georeference', 'yMax'],
                }
              ]
            }
          ]
        }
      ],
    }
  ]
}
