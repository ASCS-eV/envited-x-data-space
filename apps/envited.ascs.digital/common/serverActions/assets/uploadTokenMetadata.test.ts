import { Role, AssetStatus } from '../../types'
import * as SUT from './uploadTokenMetadata'

describe('serverActions/assets/uploadTokenMetadata', () => {
  describe('uploadAssetTokenMetadataToIPFS', () => {
    it('should upload the asset token metadata to IPFS as expected', async () => {
      // when ... we want to upload the asset token metadata to IPFS
      // then ... it should upload and return the asset token metadata as expected

      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_ID',
          pkh: 'USER_PKH',
          role: Role.provider,
        },
      })
      const getAssetStub = jest.fn().mockResolvedValue([
        {
          id: 'ASSET_ID',
          cid: 'ASSET_CID',
          metadata: 'METADATA',
          status: AssetStatus.processing,
          userId: 'USER_PKH',
        },
      ])

      const getUserByIdStub = jest.fn().mockResolvedValue([
        {
          id: 'USER_ID',
          issuerId: 'ISSUER_ID',
        },
      ])
      const dbStub = jest.fn().mockResolvedValue({
        getAsset: getAssetStub,
        getUserById: getUserByIdStub,
      })
      const logStub = {
        info: jest.fn(),
        error: jest.fn(),
      } as any

      const createGroupStub = jest.fn().mockResolvedValue('GROUP_ID')
      const uploadJsonStub = jest.fn().mockResolvedValue('IPFS URL')

      const result = await SUT.uploadTokenMetadataToIPFS({
        uploadJson: uploadJsonStub,
        createGroup: createGroupStub,
        db: dbStub,
        getServerSession: getServerSessionStub,
        log: logStub,
      })('ASSET_ID')

      expect(result).toEqual('IPFS URL')
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(getAssetStub).toHaveBeenCalledWith('ASSET_ID')
      expect(getUserByIdStub).toHaveBeenCalledWith('USER_ID')
      expect(createGroupStub).toHaveBeenCalledWith('ISSUER_ID')
      expect(uploadJsonStub).toHaveBeenCalledWith({ data: 'METADATA', filename: 'token_info.json', group: 'GROUP_ID' })
    })

    it('should fail to upload the asset token metadata to IPFS as expected when the asset ID is missing', async () => {
      // when ... we want to upload the asset token metadata to IPFS with a missing asset ID
      // then ... it should throw a bad request error as expected

      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_ID',
          pkh: 'USER_PKH',
          role: Role.provider,
        },
      })
      const getAssetStub = jest.fn().mockResolvedValue([
        {
          id: 'ASSET_ID',
          cid: 'ASSET_CID',
          metadata: 'METADATA',
          status: AssetStatus.processing,
          userId: 'USER_PKH',
        },
      ])

      const getUserByIdStub = jest.fn().mockResolvedValue([
        {
          id: 'USER_ID',
          issuerId: 'ISSUER_ID',
        },
      ])
      const dbStub = jest.fn().mockResolvedValue({
        getAsset: getAssetStub,
        getUserById: getUserByIdStub,
      })
      const logStub = {
        info: jest.fn(),
        error: jest.fn(),
      } as any

      const createGroupStub = jest.fn().mockResolvedValue('GROUP_ID')
      const uploadJsonStub = jest.fn().mockResolvedValue('IPFS URL')

      await expect(
        SUT.uploadTokenMetadataToIPFS({
          uploadJson: uploadJsonStub,
          createGroup: createGroupStub,
          db: dbStub,
          getServerSession: getServerSessionStub,
          log: logStub,
        })(''),
      ).rejects.toThrow('Missing ID')
    })

    it('should fail to upload the asset token metadata to IPFS as expected when we dont have a session', async () => {
      // when ... we want to upload the asset token metadata to IPFS when we dont have a session
      // then ... it should throw a bad request error as expected

      const getServerSessionStub = jest.fn().mockResolvedValue(null)
      const getAssetStub = jest.fn().mockResolvedValue([
        {
          id: 'ASSET_ID',
          cid: 'ASSET_CID',
          metadata: 'METADATA',
          status: AssetStatus.processing,
          userId: 'USER_PKH',
        },
      ])

      const getUserByIdStub = jest.fn().mockResolvedValue([
        {
          id: 'USER_ID',
          issuerId: 'ISSUER_ID',
        },
      ])
      const dbStub = jest.fn().mockResolvedValue({
        getAsset: getAssetStub,
        getUserById: getUserByIdStub,
      })
      const logStub = {
        info: jest.fn(),
        error: jest.fn(),
      } as any

      const createGroupStub = jest.fn().mockResolvedValue('GROUP_ID')
      const uploadJsonStub = jest.fn().mockResolvedValue('IPFS URL')

      await expect(
        SUT.uploadTokenMetadataToIPFS({
          uploadJson: uploadJsonStub,
          createGroup: createGroupStub,
          db: dbStub,
          getServerSession: getServerSessionStub,
          log: logStub,
        })('ASSET_ID'),
      ).rejects.toThrow()
      expect(getServerSessionStub).toHaveBeenCalledWith()
    })

    it('should fail to upload the asset token metadata to IPFS as expected when users role is not provider', async () => {
      // when ... we want to upload the asset token metadata to IPFS when the users role is not provider
      // then ... it should throw a bad request error as expected

      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_ID',
          pkh: 'USER_PKH',
          role: Role.principal,
        },
      })
      const getAssetStub = jest.fn().mockResolvedValue([
        {
          id: 'ASSET_ID',
          cid: 'ASSET_CID',
          metadata: 'METADATA',
          status: AssetStatus.processing,
          userId: 'USER_PKH',
        },
      ])

      const getUserByIdStub = jest.fn().mockResolvedValue([
        {
          id: 'USER_ID',
          issuerId: 'ISSUER_ID',
        },
      ])
      const dbStub = jest.fn().mockResolvedValue({
        getAsset: getAssetStub,
        getUserById: getUserByIdStub,
      })
      const logStub = {
        info: jest.fn(),
        error: jest.fn(),
      } as any

      const createGroupStub = jest.fn().mockResolvedValue('GROUP_ID')
      const uploadJsonStub = jest.fn().mockResolvedValue('IPFS URL')

      await expect(
        SUT.uploadTokenMetadataToIPFS({
          uploadJson: uploadJsonStub,
          createGroup: createGroupStub,
          db: dbStub,
          getServerSession: getServerSessionStub,
          log: logStub,
        })('ASSET_ID'),
      ).rejects.toThrow('Insufficient permissions')
    })

    it('should fail to upload the asset token metadata to IPFS as expected when asset cannot be found', async () => {
      // when ... we want to upload the asset token metadata to IPFS when asset cannot be found
      // then ... it should throw a bad request error as expected

      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_ID',
          pkh: 'USER_PKH',
          role: Role.provider,
        },
      })
      const getAssetStub = jest.fn().mockResolvedValue([])

      const getUserByIdStub = jest.fn().mockResolvedValue([
        {
          id: 'USER_ID',
          issuerId: 'ISSUER_ID',
        },
      ])
      const dbStub = jest.fn().mockResolvedValue({
        getAsset: getAssetStub,
        getUserById: getUserByIdStub,
      })
      const logStub = {
        info: jest.fn(),
        error: jest.fn(),
      } as any

      const createGroupStub = jest.fn().mockResolvedValue('GROUP_ID')
      const uploadJsonStub = jest.fn().mockResolvedValue('IPFS URL')

      await expect(
        SUT.uploadTokenMetadataToIPFS({
          uploadJson: uploadJsonStub,
          createGroup: createGroupStub,
          db: dbStub,
          getServerSession: getServerSessionStub,
          log: logStub,
        })('NON_EXISTENT_ASSET_ID'),
      ).rejects.toThrow('Not found')
    })

    it('should fail to upload the asset token metadata to IPFS as expected when user has no issuer', async () => {
      // when ... we want to upload the asset token metadata to IPFS when user has no issuer
      // then ... it should throw a bad request error as expected

      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_ID',
          pkh: 'USER_PKH',
          role: Role.provider,
        },
      })
      const getAssetStub = jest.fn().mockResolvedValue([
        {
          id: 'ASSET_ID',
          cid: 'ASSET_CID',
          metadata: 'METADATA',
          status: AssetStatus.processing,
          userId: 'USER_PKH',
        },
      ])

      const getUserByIdStub = jest.fn().mockResolvedValue([
        {
          id: 'USER_ID',
          issuerId: null,
        },
      ])
      const dbStub = jest.fn().mockResolvedValue({
        getAsset: getAssetStub,
        getUserById: getUserByIdStub,
      })
      const logStub = {
        info: jest.fn(),
        error: jest.fn(),
      } as any

      const createGroupStub = jest.fn().mockResolvedValue('GROUP_ID')
      const uploadJsonStub = jest.fn().mockResolvedValue('IPFS URL')

      await expect(
        SUT.uploadTokenMetadataToIPFS({
          uploadJson: uploadJsonStub,
          createGroup: createGroupStub,
          db: dbStub,
          getServerSession: getServerSessionStub,
          log: logStub,
        })('ASSET_ID'),
      ).rejects.toThrow('No issuer found')
    })
  })
})
