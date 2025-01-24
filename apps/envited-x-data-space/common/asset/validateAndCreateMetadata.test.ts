import manifest from '../fixtures/manifest.json'
import { Manifest } from './types'
import * as SUT from './validateAndCreateMetadata'

describe('common/asset/validateAndCreateMetadata', () => {
  process.env.ASSETS_URL = 'https://assets.envited-x.net'
  process.env.METADATA_URL = 'https://metadata.envited-x.net'
  describe('_validateAndCreateMetadata', () => {
    it('should validate and return a metadata buffer', async () => {
      // when ... we want to validate and create a metadata buffer
      // then ... it should validate, extract and create a metadata buffer
      const getShaclSchemaAndValidateStub = jest.fn().mockResolvedValue({
        reports: [{ conforms: true }],
        data: { domainMetadata: { '@type': 'NAME' }, manifest },
      }) as any
      const createMetadataStub = jest.fn().mockReturnValue('METADATA_BUFFER') as any
      const createModifiedManifestStub = jest.fn().mockReturnValue('MODIFIED_MANIFEST_BUFFER') as any
      const createFilenameStub = jest.fn().mockReturnValue('HASH') as any
      const getAllFilenamesFromFilesStub = jest.fn().mockResolvedValue([
        {
          path: 'PATH',
          arrayBuffer: 'FILE_BUFFER',
          cid: 'DISPLAY_HASH',
          type: 'visualization',
        },
        {
          path: 'PATH',
          arrayBuffer: 'FILE_BUFFER',
          cid: 'FILE_CID',
          type: 'visualization',
        },
      ]) as any
      const getFilesAsPathAndByteArrayFromManifestStub = jest.fn().mockResolvedValue({
        owner: [
          {
            path: 'PATH',
            arrayBuffer: 'FILE_BUFFER',
          },
        ],
        registeredUser: [
          {
            path: 'PATH',
            arrayBuffer: 'FILE_BUFFER',
          },
        ],
        publicUser: [
          {
            path: 'PATH',
            arrayBuffer: 'FILE_BUFFER',
          },
        ],
      }) as any
      const getUserByIdStub = jest.fn().mockResolvedValue({ id: 'USER_ID', issuerId: 'ISSUER_ID' }) as any
      const getUserWithProfileByIdStub = jest
        .fn()
        .mockResolvedValue([{ user: { id: 'ISSUER_ID' }, profile: { name: 'NAME' } }]) as any
      const dbStub = jest.fn().mockResolvedValue({
        getUserById: getUserByIdStub,
        getUserWithProfileById: getUserWithProfileByIdStub,
      })

      const byteArray = 'ASSET_BYTE_ARRAY'
      const asset = {
        userId: 'USER_ID',
        issuerId: 'ISSUER_ID',
      }

      const result = await SUT._validateAndCreateMetadata({
        getShaclSchemaAndValidate: getShaclSchemaAndValidateStub,
        createTokenMetadata: createMetadataStub,
        createModifiedManifest: jest.fn().mockReturnValue(createModifiedManifestStub),
        createFilename: createFilenameStub,
        getFilesAsPathAndByteArrayFromManifest: getFilesAsPathAndByteArrayFromManifestStub,
        getAllFilenamesFromFiles: getAllFilenamesFromFilesStub,
        db: dbStub,
      })(byteArray as any, asset as any)

      expect(result).toEqual({
        conforms: undefined,
        reports: [{ conforms: true }],
        metadata: 'METADATA_BUFFER',
        modifiedManifest: 'MODIFIED_MANIFEST_BUFFER',
        domainMetadata: {
          '@type': 'NAME',
        },
        assetCID: 'HASH',
        files: {
          owner: [
            {
              path: 'PATH',
              arrayBuffer: 'FILE_BUFFER',
            },
          ],
          registeredUser: [
            {
              path: 'PATH',
              arrayBuffer: 'FILE_BUFFER',
            },
          ],
          publicUser: [
            {
              path: 'PATH',
              arrayBuffer: 'FILE_BUFFER',
            },
          ],
        },
        visualizationFiles: [
          {
            path: 'PATH',
            arrayBuffer: 'FILE_BUFFER',
            cid: 'DISPLAY_HASH',
            type: 'visualization',
          },
          {
            path: 'PATH',
            arrayBuffer: 'FILE_BUFFER',
            cid: 'FILE_CID',
            type: 'visualization',
          },
        ],
      })

      expect(getUserByIdStub).toHaveBeenCalledWith('USER_ID')
      expect(getUserWithProfileByIdStub).toHaveBeenCalledWith('ISSUER_ID')
      expect(createMetadataStub).toHaveBeenCalledWith({
        asset: {
          cid: 'HASH',
          fileSize: 16,
        },
        manifest: {
          cid: 'HASH',
          data: manifest,
          fileSize: 26,
          modifiedData: 'MODIFIED_MANIFEST_BUFFER',
        },
        domainMetadata: {
          cid: 'HASH',
          data: { '@type': 'NAME' },
        },
        display: {
          cid: 'DISPLAY_HASH',
          uri: 'https://assets.envited-x.net/HASH/PATH',
          fileSize: undefined,
        },
        minter: 'ISSUER_ID',
        creator: 'NAME',
        rights: {
          identifier: 'MIT',
          path: 'https://opensource.org/license/mit',
        },
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
        })(byteArray as any, manifest as Manifest)

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
