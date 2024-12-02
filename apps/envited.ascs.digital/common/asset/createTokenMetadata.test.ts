import domainMetadata from '../fixtures/domainMetadata.json'
import manifest from '../fixtures/manifest.json'
import manifestLicenseRefCustomCommercialAgreement from '../fixtures/manifestLicenseRefCustomCommercialAgreement.json'
import manifestLicenseRefPolicySmartContract from '../fixtures/manifestLicenseRefPolicySmartContract.json'
import manifestRemoteAssetData from '../fixtures/manifestRemoteAssetData.json'
import * as SUT from './createTokenMetadata'

describe('common/asset/createTokenMetadata', () => {
  describe('createTokenMetadata', () => {
    it('should extract data from manifest and domainMetadata and create a token metadata object', async () => {
      // when ... we want to validate data conform the data type
      // then ... it should get the type and validate with this schema
      const expected = {
        decimals: 0,
        isBooleanAmount: true,
        name: 'TestfeldNiedersachsen_ALKS_ODR_sample',
        description: 'simple hdmap example file on Testfeld Niedersachsen for ALKS scenario',
        tags: ['GaiaX', 'ASCS', 'ENVITED-X', 'EVES', 'nft', 'ASAM OpenDRIVE 1.6'],
        minter: 'MINTER',
        creators: ['CREATOR'],
        publishers: ['Automotive Solution Center for Simulation e.V.', 'ENVITED-X Data Space'],
        date: expect.any(String),
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
            mimeType: 'image/png',
            dimensions: {
              value: '1095x850',
              unit: 'px',
            },
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

      const result = await SUT.createTokenMetadata({
        asset: {
          cid: 'ASSET_CID',
          fileSize: 1024,
        },
        creator: 'CREATOR',
        display: {
          cid: 'DISPLAY_URI_CID',
          uri: 'DISPLAY_URI',
          fileSize: 512,
          dimensions: '1095x850',
          mimeType: 'image/png',
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
        tags: ['GaiaX', 'ASCS', 'ENVITED-X', 'EVES', 'nft', 'ASAM OpenDRIVE 1.6'],
        minter: 'MINTER',
        creators: ['CREATOR'],
        publishers: ['Automotive Solution Center for Simulation e.V.', 'ENVITED-X Data Space'],
        date: expect.any(String),
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
            mimeType: 'image/png',
            dimensions: {
              value: '1095x850',
              unit: 'px',
            },
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

      const result = await SUT.createTokenMetadata({
        asset: {
          cid: 'ASSET_CID',
          fileSize: 1024,
        },
        creator: 'CREATOR',
        display: {
          cid: 'DISPLAY_URI_CID',
          uri: 'DISPLAY_URI',
          fileSize: 512,
          dimensions: '1095x850',
          mimeType: 'image/png',
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
        tags: ['GaiaX', 'ASCS', 'ENVITED-X', 'EVES', 'nft', 'ASAM OpenDRIVE 1.6'],
        minter: 'MINTER',
        creators: ['CREATOR'],
        publishers: ['Automotive Solution Center for Simulation e.V.', 'ENVITED-X Data Space'],
        date: expect.any(String),
        type: 'EVES-003 https://github.com/ASCS-eV/EVES',
        rights: 'LicenseRef-Policy-Smart-Contract',
        rightsUri: 'did:tezos:NetXdQprcVkpaWU:KT1PaDvx6vApsvZchR7m3LCRQLJ1cR6C778y',
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
            mimeType: 'image/png',
            dimensions: {
              value: '1095x850',
              unit: 'px',
            },
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

      const result = await SUT.createTokenMetadata({
        asset: {
          cid: 'ASSET_CID',
          fileSize: 1024,
        },
        creator: 'CREATOR',
        display: {
          cid: 'DISPLAY_URI_CID',
          uri: 'DISPLAY_URI',
          fileSize: 512,
          dimensions: '1095x850',
          mimeType: 'image/png',
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
          path: 'did:tezos:NetXdQprcVkpaWU:KT1PaDvx6vApsvZchR7m3LCRQLJ1cR6C778y',
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
        tags: ['GaiaX', 'ASCS', 'ENVITED-X', 'EVES', 'nft', 'ASAM OpenDRIVE 1.6'],
        minter: 'MINTER',
        creators: ['CREATOR'],
        publishers: ['Automotive Solution Center for Simulation e.V.', 'ENVITED-X Data Space'],
        date: expect.any(String),
        type: 'EVES-003 https://github.com/ASCS-eV/EVES',
        rights: 'LicenseRef-Custom-Commercial-Agreement',
        rightsUri: 'https://assets.envited-x.net/ASSET_CID/LICENSE',
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
            mimeType: 'image/png',
            dimensions: {
              value: '1095x850',
              unit: 'px',
            },
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

      const result = await SUT.createTokenMetadata({
        asset: {
          cid: 'ASSET_CID',
          fileSize: 1024,
        },
        creator: 'CREATOR',
        display: {
          cid: 'DISPLAY_URI_CID',
          uri: 'DISPLAY_URI',
          fileSize: 512,
          dimensions: '1095x850',
          mimeType: 'image/png',
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
