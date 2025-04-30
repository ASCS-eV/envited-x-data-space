import { TOKEN_TAGS } from '../constants/tokenTags'
import domainMetadata from '../fixtures/domainMetadata.json'
import manifest from '../fixtures/manifest.json'
import manifestLicenseRefCustomCommercialAgreement from '../fixtures/manifestLicenseRefCustomCommercialAgreement.json'
import manifestLicenseRefPolicySmartContract from '../fixtures/manifestLicenseRefPolicySmartContract.json'
import manifestRemoteAssetData from '../fixtures/manifestRemoteAssetData.json'
import * as SUT from './metadata'

export const TEST_TOKEN_TAGS = {
  ASAM_OPENDRIVE_VERSION: 'ASAM OpenDRIVE 1.6',
}

describe('common/asset/createTokenMetadata', () => {
  process.env.ASSETS_URL = 'https://assets.envited-x.net'
  process.env.METADATA_URL = 'https://metadata.envited-x.net'
  describe('createTokenMetadata', () => {
    it('should extract data from manifest and domainMetadata and create a token metadata object', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const expected = {
        decimals: 0,
        isBooleanAmount: true,
        name: 'TestfeldNiedersachsen_ALKS_ODR_sample',
        description: 'simple hdmap example file on Testfeld Niedersachsen for ALKS scenario',
        tags: [
          TOKEN_TAGS.GAIA_X,
          TOKEN_TAGS.ASCS,
          TOKEN_TAGS.ENVITED_X,
          TOKEN_TAGS.EVES,
          TOKEN_TAGS.NFT,
          TEST_TOKEN_TAGS.ASAM_OPENDRIVE_VERSION,
          TOKEN_TAGS.THIRD_PARTY_HOSTED,
        ],
        minter: 'MINTER',
        creators: ['CREATOR'],
        publishers: ['Automotive Solution Center for Simulation e.V.', 'ENVITED-X Data Space'],
        date: expect.any(String),
        type: 'EVES-003 https://github.com/ASCS-eV/EVES',
        rights: 'MIT',
        rightsUri: 'https://opensource.org/license/mit',
        language: 'en',
        artifactUri: 'https://assets.envited-x.net/ASSET_CID',
        identifier: 'did:web:registry.gaia-x.eu:HdMap:DjHgK5ErTBow1Ya3J05tW9l12skGWgZn6kA9',
        externalUri: 'ipfs://MODIFIED_MANIFEST_CID',
        displayUri: 'ipfs://DISPLAY_URI_CID',
        formats: [
          {
            uri: 'https://assets.envited-x.net/ASSET_CID',
            hash: 'ASSET_CID',
            mimeType: 'application/zip',
            fileSize: 1024,
            fileName: 'ASSET_CID.zip',
          },
          {
            uri: 'ipfs://MODIFIED_MANIFEST_CID',
            hash: 'MODIFIED_MANIFEST_CID',
            mimeType: 'application/json',
            fileSize: 2048,
            fileName: 'manifest.json',
          },
          {
            uri: 'ipfs://DISPLAY_URI_CID',
            hash: 'DISPLAY_URI_CID',
            fileSize: 512,
            fileName: 'DISPLAY_URI',
          },
        ],
        attributes: [
          {
            name: 'de.gaiax4plcaad.ontology-management-base.hdmap.ontology',
            value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/hdmap/',
            type: 'uri',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.hdmap.metadata',
            value: 'ipfs://DOMAIN_METADATA_CID',
            type: 'application/json',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.manifest.ontology',
            value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/manifest/',
            type: 'uri',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.manifest.metadata',
            value: 'ipfs://MODIFIED_MANIFEST_CID',
            type: 'application/json',
          },
        ],
      }

      const result = SUT.createTzip21Metadata({
        asset: {
          cid: 'ASSET_CID',
          fileSize: 1024,
        },
        creator: 'CREATOR',
        display: {
          cid: 'DISPLAY_URI_CID',
          uri: 'DISPLAY_URI',
          fileSize: 512,
        },
        domainMetadata: {
          cid: 'DOMAIN_METADATA_CID',
          data: domainMetadata,
        },
        manifest: {
          cid: 'MODIFIED_MANIFEST_CID',
          fileSize: 2048,
          data: manifest as any,
        },
        minter: 'MINTER',
        rights: {
          identifier: 'MIT',
          path: 'https://opensource.org/license/mit',
        },
      })

      expect(result).toEqual(expected)
    })

    it('should extract data from manifest and domainMetadata and create a token metadata object - Remote AssetData', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const expected = {
        decimals: 0,
        isBooleanAmount: true,
        name: 'TestfeldNiedersachsen_ALKS_ODR_sample',
        description: 'simple hdmap example file on Testfeld Niedersachsen for ALKS scenario',
        tags: [
          TOKEN_TAGS.GAIA_X,
          TOKEN_TAGS.ASCS,
          TOKEN_TAGS.ENVITED_X,
          TOKEN_TAGS.EVES,
          TOKEN_TAGS.NFT,
          TEST_TOKEN_TAGS.ASAM_OPENDRIVE_VERSION,
          TOKEN_TAGS.THIRD_PARTY_HOSTED,
        ],
        minter: 'MINTER',
        creators: ['CREATOR'],
        publishers: ['Automotive Solution Center for Simulation e.V.', 'ENVITED-X Data Space'],
        date: expect.any(String),
        type: 'EVES-003 https://github.com/ASCS-eV/EVES',
        rights: 'MIT',
        rightsUri: 'https://opensource.org/license/mit',
        language: 'en',
        artifactUri: 'https://assets.envited-x.net/ASSET_CID',
        identifier: 'did:web:registry.gaia-x.eu:HdMap:DjHgK5ErTBow1Ya3J05tW9l12skGWgZn6kA9',
        externalUri: 'ipfs://MODIFIED_MANIFEST_CID',
        displayUri: 'ipfs://DISPLAY_URI_CID',
        formats: [
          {
            uri: 'https://assets.envited-x.net/ASSET_CID',
            hash: 'ASSET_CID',
            mimeType: 'application/zip',
            fileSize: 1024,
            fileName: 'ASSET_CID.zip',
          },
          {
            uri: 'ipfs://MODIFIED_MANIFEST_CID',
            hash: 'MODIFIED_MANIFEST_CID',
            mimeType: 'application/json',
            fileSize: 2048,
            fileName: 'manifest.json',
          },
          {
            uri: 'ipfs://DISPLAY_URI_CID',
            hash: 'DISPLAY_URI_CID',
            fileSize: 512,
            fileName: 'DISPLAY_URI',
          },
        ],
        attributes: [
          {
            name: 'de.gaiax4plcaad.ontology-management-base.hdmap.ontology',
            value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/hdmap/',
            type: 'uri',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.hdmap.metadata',
            value: 'ipfs://DOMAIN_METADATA_CID',
            type: 'application/json',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.manifest.ontology',
            value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/manifest/',
            type: 'uri',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.manifest.metadata',
            value: 'ipfs://MODIFIED_MANIFEST_CID',
            type: 'application/json',
          },
        ],
      }

      const result = SUT.createTzip21Metadata({
        asset: {
          cid: 'ASSET_CID',
          fileSize: 1024,
        },
        creator: 'CREATOR',
        display: {
          cid: 'DISPLAY_URI_CID',
          uri: 'DISPLAY_URI',
          fileSize: 512,
        },
        domainMetadata: {
          cid: 'DOMAIN_METADATA_CID',
          data: domainMetadata,
        },
        manifest: {
          cid: 'MODIFIED_MANIFEST_CID',
          fileSize: 2048,
          data: manifestRemoteAssetData as any,
        },
        minter: 'MINTER',
        rights: {
          identifier: 'MIT',
          path: 'https://opensource.org/license/mit',
        },
      })

      expect(result).toEqual(expected)
    })

    it('should extract data from manifest and domainMetadata and create a token metadata object - manifestLicenseRefPolicySmartContract', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const expected = {
        decimals: 0,
        isBooleanAmount: true,
        name: 'TestfeldNiedersachsen_ALKS_ODR_sample',
        description: 'simple hdmap example file on Testfeld Niedersachsen for ALKS scenario',
        tags: [
          TOKEN_TAGS.GAIA_X,
          TOKEN_TAGS.ASCS,
          TOKEN_TAGS.ENVITED_X,
          TOKEN_TAGS.EVES,
          TOKEN_TAGS.NFT,
          TEST_TOKEN_TAGS.ASAM_OPENDRIVE_VERSION,
        ],
        minter: 'MINTER',
        creators: ['CREATOR'],
        publishers: ['Automotive Solution Center for Simulation e.V.', 'ENVITED-X Data Space'],
        date: expect.any(String),
        type: 'EVES-003 https://github.com/ASCS-eV/EVES',
        rights: 'LicenseRef-Policy-Smart-Contract',
        rightsUri: 'urn:blockchain:tezos:NetXnHfVqm9iesp:contract:KT1PCaD2kmgCHy15wQ1gpqZUy9RLxyBVJdTF',
        language: 'en',
        artifactUri: 'https://assets.envited-x.net/ASSET_CID',
        identifier: 'did:web:registry.gaia-x.eu:HdMap:DjHgK5ErTBow1Ya3J05tW9l12skGWgZn6kA9',
        externalUri: 'ipfs://MODIFIED_MANIFEST_CID',
        displayUri: 'ipfs://DISPLAY_URI_CID',
        formats: [
          {
            uri: 'https://assets.envited-x.net/ASSET_CID',
            hash: 'ASSET_CID',
            mimeType: 'application/zip',
            fileSize: 1024,
            fileName: 'ASSET_CID.zip',
          },
          {
            uri: 'ipfs://MODIFIED_MANIFEST_CID',
            hash: 'MODIFIED_MANIFEST_CID',
            mimeType: 'application/json',
            fileSize: 2048,
            fileName: 'manifest.json',
          },
          {
            uri: 'ipfs://DISPLAY_URI_CID',
            hash: 'DISPLAY_URI_CID',
            fileSize: 512,
            fileName: 'DISPLAY_URI',
          },
        ],
        attributes: [
          {
            name: 'de.gaiax4plcaad.ontology-management-base.hdmap.ontology',
            value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/hdmap/',
            type: 'uri',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.hdmap.metadata',
            value: 'ipfs://DOMAIN_METADATA_CID',
            type: 'application/json',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.manifest.ontology',
            value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/manifest/',
            type: 'uri',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.manifest.metadata',
            value: 'ipfs://MODIFIED_MANIFEST_CID',
            type: 'application/json',
          },
        ],
      }

      const result = SUT.createTzip21Metadata({
        asset: {
          cid: 'ASSET_CID',
          fileSize: 1024,
        },
        creator: 'CREATOR',
        display: {
          cid: 'DISPLAY_URI_CID',
          uri: 'DISPLAY_URI',
          fileSize: 512,
        },
        domainMetadata: {
          cid: 'DOMAIN_METADATA_CID',
          data: domainMetadata,
        },
        manifest: {
          cid: 'MODIFIED_MANIFEST_CID',
          fileSize: 2048,
          data: manifestLicenseRefPolicySmartContract as any,
        },
        minter: 'MINTER',
        rights: {
          identifier: 'LicenseRef-Policy-Smart-Contract',
          path: 'urn:blockchain:tezos:NetXnHfVqm9iesp:contract:KT1PCaD2kmgCHy15wQ1gpqZUy9RLxyBVJdTF',
        },
      })

      expect(result).toEqual(expected)
    })

    it('should extract data from manifest and domainMetadata and create a token metadata object - manifestLicenseRefCustomCommercialAgreement', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const expected = {
        decimals: 0,
        isBooleanAmount: true,
        name: 'TestfeldNiedersachsen_ALKS_ODR_sample',
        description: 'simple hdmap example file on Testfeld Niedersachsen for ALKS scenario',
        tags: [
          TOKEN_TAGS.GAIA_X,
          TOKEN_TAGS.ASCS,
          TOKEN_TAGS.ENVITED_X,
          TOKEN_TAGS.EVES,
          TOKEN_TAGS.NFT,
          TEST_TOKEN_TAGS.ASAM_OPENDRIVE_VERSION,
        ],
        minter: 'MINTER',
        creators: ['CREATOR'],
        publishers: ['Automotive Solution Center for Simulation e.V.', 'ENVITED-X Data Space'],
        date: expect.any(String),
        type: 'EVES-003 https://github.com/ASCS-eV/EVES',
        rights: 'LicenseRef-Custom-Commercial-Agreement',
        rightsUri: 'https://assets.envited-x.net/ASSET_CID/LICENSE',
        language: 'en',
        artifactUri: 'https://assets.envited-x.net/ASSET_CID',
        identifier: 'did:web:registry.gaia-x.eu:HdMap:DjHgK5ErTBow1Ya3J05tW9l12skGWgZn6kA9',
        externalUri: 'ipfs://MODIFIED_MANIFEST_CID',
        displayUri: 'ipfs://DISPLAY_URI_CID',
        formats: [
          {
            uri: 'https://assets.envited-x.net/ASSET_CID',
            hash: 'ASSET_CID',
            mimeType: 'application/zip',
            fileSize: 1024,
            fileName: 'ASSET_CID.zip',
          },
          {
            uri: 'ipfs://MODIFIED_MANIFEST_CID',
            hash: 'MODIFIED_MANIFEST_CID',
            mimeType: 'application/json',
            fileSize: 2048,
            fileName: 'manifest.json',
          },
          {
            uri: 'ipfs://DISPLAY_URI_CID',
            hash: 'DISPLAY_URI_CID',
            fileSize: 512,
            fileName: 'DISPLAY_URI',
          },
        ],
        attributes: [
          {
            name: 'de.gaiax4plcaad.ontology-management-base.hdmap.ontology',
            value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/hdmap/',
            type: 'uri',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.hdmap.metadata',
            value: 'ipfs://DOMAIN_METADATA_CID',
            type: 'application/json',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.manifest.ontology',
            value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/manifest/',
            type: 'uri',
          },
          {
            name: 'de.gaiax4plcaad.ontology-management-base.manifest.metadata',
            value: 'ipfs://MODIFIED_MANIFEST_CID',
            type: 'application/json',
          },
        ],
      }

      const result = SUT.createTzip21Metadata({
        asset: {
          cid: 'ASSET_CID',
          fileSize: 1024,
        },
        creator: 'CREATOR',
        display: {
          cid: 'DISPLAY_URI_CID',
          uri: 'DISPLAY_URI',
          fileSize: 512,
        },
        domainMetadata: {
          cid: 'DOMAIN_METADATA_CID',
          data: domainMetadata,
        },
        manifest: {
          cid: 'MODIFIED_MANIFEST_CID',
          fileSize: 2048,
          data: manifestLicenseRefCustomCommercialAgreement as any,
        },
        minter: 'MINTER',
        rights: {
          identifier: 'LicenseRef-Custom-Commercial-Agreement',
          path: './LICENSE',
        },
      })

      expect(result).toEqual(expected)
    })
  })
})
