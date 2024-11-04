import * as SUT from './validateAndCreateMetadata'

describe('common/asset/validateAndCreateMetadata', () => {
  describe('_validateAndCreateMetadata', () => {
    it('should validate and return a metadata buffer', async () => {
      // when ... we want to validate and create a metadata buffer
      // then ... it should validate, extract and create a metadata buffer
      const manifest = {
        'manifest:data': {
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
          ],
        },
      }
      const getShaclSchemaAndValidateStub = jest.fn().mockResolvedValue({
        reports: [{ conforms: true }],
        data: { domainMetadata: { '@type': 'NAME' }, manifest },
      }) as any
      const createMetadataStub = jest.fn().mockReturnValue('METADATA_BUFFER') as any
      const createModifiedManifestStub = jest.fn().mockReturnValue('MODIFIED_MANIFEST_BUFFER') as any
      const createFilenameStub = jest.fn().mockReturnValue('HASH') as any
      const getFileFromByteArrayStub = jest.fn().mockResolvedValue('FILE DATA') as any

      const byteArray = 'ASSET_BYTE_ARRAY'
      const asset = {
        userId: 'USER_ID',
      }

      const result = await SUT._validateAndCreateMetadata({
        getShaclSchemaAndValidate: getShaclSchemaAndValidateStub,
        createTokenMetadata: createMetadataStub,
        createModifiedManifest: jest.fn().mockReturnValue(createModifiedManifestStub),
        createFilename: createFilenameStub,
        getFileFromByteArray: getFileFromByteArrayStub,
      })(byteArray as any, asset as any)

      expect(result).toEqual({
        conforms: undefined,
        reports: [{ conforms: true }],
        metadata: {
          tokenMetadata: 'METADATA_BUFFER',
          modifiedManifest: 'MODIFIED_MANIFEST_BUFFER',
        },
        assetCID: 'HASH',
        metadataCID: 'HASH',
      })
    })
  })

  describe('_getShaclSchemaAndValidate', () => {
    it('should select SHACLE schema and validate data', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const validateManifestStub = jest
        .fn()
        .mockResolvedValue({ conforms: true, report: { conforms: true }, data: { file: 'FILE_NAME' } }) as any
      const validateDomainMetadataStub = jest
        .fn()
        .mockResolvedValue({ conforms: true, reports: [{ conforms: true }], data: { name: 'NAME' } }) as any

      const byteArray = 'ASSET_BYTE_ARRAY'

      const result = await SUT._getShaclSchemaAndValidate({
        validateManifest: validateManifestStub,
        validateDomainMetadata: validateDomainMetadataStub,
      })(byteArray as any)

      expect(result).toEqual({
        conforms: true,
        reports: [{ conforms: true }, { conforms: true }],
        data: {
          domainMetadata: {
            name: 'NAME',
          },
          manifest: {
            file: 'FILE_NAME',
          },
        },
      })
    })

    describe('_validateManifest', () => {
      it('should extract manifest and validate against SHACL schemas', async () => {
        // when ... we want to validate data conform the data type
        // then ... it should get the type and validate with this schema
        const getFileFromByteArrayStub = jest
          .fn()
          .mockResolvedValue(JSON.stringify({ '@context': { SHACL_SCHEMA: 'SCHEMA' }, 'name': ['NAME'] })) as any
        const fsCreateReadStreamStub = jest.fn().mockReturnValue({})
        const fsStub = {
          createReadStream: fsCreateReadStreamStub,
        } as any

        const validateShaclDataSchemaStub = jest.fn().mockResolvedValue({ conforms: true }) as any

        const byteArray = 'ASSET_BYTE_ARRAY'

        const result = await SUT._validateManifest({
          getFileFromByteArray: getFileFromByteArrayStub,
          validateShaclDataWithSchema: validateShaclDataSchemaStub,
          fs: fsStub,
        })(byteArray as any)

        expect(result).toEqual({
          conforms: true,
          report: { conforms: true },
          data: { '@context': { SHACL_SCHEMA: 'SCHEMA' }, 'name': ['NAME'] },
        })
        expect(getFileFromByteArrayStub).toHaveBeenCalledWith('ASSET_BYTE_ARRAY', 'manifest.json')
        expect(fsCreateReadStreamStub).toHaveBeenCalledTimes(1)
      })
    })

    describe('_validateDomainMetadata', () => {
      it('should extract domainMetadata and validate against SHACL schemas', async () => {
        // when ... we want to validate data conform the data type
        // then ... it should get the type and validate with this schema
        const getFileFromByteArrayStub = jest
          .fn()
          .mockResolvedValue(JSON.stringify({ '@context': { SHACL_SCHEMA: 'SCHEMA' }, 'name': ['NAME'] })) as any
        const fsCreateReadStreamStub = jest.fn().mockReturnValue({})
        const fsStub = {
          createReadStream: fsCreateReadStreamStub,
        } as any

        const validateShaclDataSchemaStub = jest.fn().mockResolvedValue({ conforms: true }) as any

        const byteArray = 'ASSET_BYTE_ARRAY'

        const result = await SUT._validateDomainMetadata({
          getFileFromByteArray: getFileFromByteArrayStub,
          validateShaclDataWithSchema: validateShaclDataSchemaStub,
          fs: fsStub,
        })(byteArray as any)

        expect(result).toEqual({
          conforms: true,
          reports: [{ conforms: true }],
          data: { '@context': { SHACL_SCHEMA: 'SCHEMA' }, 'name': ['NAME'] },
        })
        expect(getFileFromByteArrayStub).toHaveBeenCalledWith('ASSET_BYTE_ARRAY', 'metadata/domainMetadata.json')
        expect(fsCreateReadStreamStub).toHaveBeenCalledTimes(1)
      })
    })
  })
})
