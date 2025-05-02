import { AssetStatus } from '../types'
import * as SUT from './asset'

describe('common/asset/asset', () => {
  describe('asset', () => {
    it('should get the asset as expected', async () => {
      // when ... we want to get the asset by id
      // then ... it should update the asset as expected
      const dbStub = jest.fn().mockResolvedValue({
        getAssetByCID: jest.fn().mockResolvedValue([
          {
            id: 'ASSET_ID',
            tokenId: 'TOKEN_ID',
            cid: 'ASSET_CID',
            name: 'Asset Name',
            metadata: {
              name: 'Asset Name',
              symbol: 'SYMBOL',
              decimals: 0,
              shouldPreferSymbol: false,
              thumbnailUri: 'thumbnail.png',
            },
            status: AssetStatus.pending,
            userId: 'USER_PKH',
            ownerId: 'OWNER_ID',
            createdAt: new Date(),
          },
        ]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const result = await SUT._getAsset({ db: dbStub, log: logStub })('ASSET_CID')
      const db = await dbStub()
      expect(result).toEqual({
        id: 'ASSET_ID',
        tokenId: 'TOKEN_ID',
        cid: 'ASSET_CID',
        name: 'Asset Name',
        metadata: {
          name: 'Asset Name',
          symbol: 'SYMBOL',
          decimals: 0,
          shouldPreferSymbol: false,
          thumbnailUri: 'thumbnail.png',
        },
        status: AssetStatus.pending,
        userId: 'USER_PKH',
        ownerId: 'OWNER_ID',
        createdAt: expect.any(Date),
      })
      expect(db.getAssetByCID).toHaveBeenCalledWith('ASSET_CID')
    })
  })

  describe('getMinter', () => {
    it('should return the issuer pkh when user and issuer exist', async () => {
      // given an asset with a valid userId
      const asset = {
        id: 'ASSET_ID',
        tokenId: 'TOKEN_ID',
        cid: 'ASSET_CID',
        name: 'Asset Name',
        metadata: {
          name: 'Asset Name',
          symbol: 'SYMBOL',
          decimals: 0,
          shouldPreferSymbol: false,
          thumbnailUri: 'thumbnail.png',
        },
        status: AssetStatus.pending,
        userId: 'USER_ID',
        ownerId: 'OWNER_ID',
        createdAt: new Date(),
      }

      // and a database that returns a user and an issuer
      const mockUser = { id: 'USER_ID', issuerId: 'ISSUER_ID' }
      const mockIssuer = { id: 'ISSUER_ID', pkh: 'ISSUER_PKH', name: 'ISSUER_NAME' }

      const dbStub = jest.fn().mockResolvedValue({
        getUserById: jest.fn().mockResolvedValue(mockUser),
        getUserByIssuerId: jest.fn().mockResolvedValue(mockIssuer),
      })

      const logStub = {
        error: jest.fn(),
      } as any

      // when we call getMinter
      const result = await SUT._getMinter({ db: dbStub, log: logStub })(asset)
      const db = await dbStub()

      // then it should return the issuer's pkh
      expect(result).toStrictEqual({ id: 'ISSUER_ID', pkh: 'ISSUER_PKH', name: 'ISSUER_NAME' })
      expect(db.getUserById).toHaveBeenCalledWith('USER_ID')
      expect(db.getUserByIssuerId).toHaveBeenCalledWith('ISSUER_ID')
      expect(logStub.error).not.toHaveBeenCalled()
    })

    it('should return empty string when user is not found', async () => {
      // given an asset with a userId that doesn't exist in the database
      const asset = {
        id: 'ASSET_ID',
        tokenId: 'TOKEN_ID',
        cid: 'ASSET_CID',
        name: 'Asset Name',
        metadata: {
          name: 'Asset Name',
          symbol: 'SYMBOL',
          decimals: 0,
          shouldPreferSymbol: false,
          thumbnailUri: 'thumbnail.png',
        },
        status: AssetStatus.pending,
        userId: 'NONEXISTENT_USER_ID',
        ownerId: 'OWNER_ID',
        createdAt: new Date(),
      }

      // and a database that doesn't return a user
      const dbStub = jest.fn().mockResolvedValue({
        getUserById: jest.fn().mockResolvedValue(null),
        getUserByIssuerId: jest.fn(),
      })

      const logStub = {
        error: jest.fn(),
      } as any

      // when we call getMinter
      const result = await SUT._getMinter({ db: dbStub, log: logStub })(asset)
      const db = await dbStub()

      // then it should return an empty string and log the error
      expect(result).toStrictEqual({})
      expect(db.getUserById).toHaveBeenCalledWith('NONEXISTENT_USER_ID')
      expect(db.getUserByIssuerId).not.toHaveBeenCalled()
      expect(logStub.error).toHaveBeenCalledWith('User not found')
    })

    it('should return empty string when issuer is not found', async () => {
      // given an asset with a valid userId but no associated issuer
      const asset = {
        id: 'ASSET_ID',
        tokenId: 'TOKEN_ID',
        cid: 'ASSET_CID',
        name: 'Asset Name',
        metadata: {
          name: 'Asset Name',
          symbol: 'SYMBOL',
          decimals: 0,
          shouldPreferSymbol: false,
          thumbnailUri: 'thumbnail.png',
        },
        status: AssetStatus.pending,
        userId: 'USER_ID',
        ownerId: 'OWNER_ID',
        createdAt: new Date(),
      }

      // and a database that returns a user but no issuer
      const mockUser = { id: 'USER_ID', issuerId: 'NONEXISTENT_ISSUER_ID' }

      const dbStub = jest.fn().mockResolvedValue({
        getUserById: jest.fn().mockResolvedValue(mockUser),
        getUserByIssuerId: jest.fn().mockResolvedValue(null),
      })

      const logStub = {
        error: jest.fn(),
      } as any

      // when we call getMinter
      const result = await SUT._getMinter({ db: dbStub, log: logStub })(asset)
      const db = await dbStub()

      // then it should return an empty string and log the error
      expect(result).toStrictEqual({})
      expect(db.getUserById).toHaveBeenCalledWith('USER_ID')
      expect(db.getUserByIssuerId).toHaveBeenCalledWith('NONEXISTENT_ISSUER_ID')
      expect(logStub.error).toHaveBeenCalledWith('Issuer not found')
    })
  })

  describe('updateAssetStatus', () => {
    it('should update the asset as expected', async () => {
      // when ... we want to get the asset by id
      // then ... it should update the asset as expected
      const dbStub = jest.fn().mockResolvedValue({
        updateAssetByCID: jest.fn().mockResolvedValue([
          {
            id: 'ASSET_ID',
            cid: 'NEW_ASSET_CID',
            metadata: 'METADATA',
            status: AssetStatus.pending,
            userId: 'USER_PKH',
          },
        ]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const result = await SUT._updateAsset({ db: dbStub, log: logStub })(
        'NEW_ASSET_CID',
        'ASSET_CID',
        AssetStatus.pending,
        {} as any,
      )
      const db = await dbStub()
      expect(result).toEqual({
        id: 'ASSET_ID',
        cid: 'NEW_ASSET_CID',
        metadata: 'METADATA',
        status: AssetStatus.pending,
        userId: 'USER_PKH',
      })
      expect(db.updateAssetByCID).toHaveBeenCalledWith(
        {
          cid: 'NEW_ASSET_CID',
          metadata: {},
          manifest: {},
          status: 'pending',
          manifestGlobalIdentifierId: '',
        },
        'ASSET_CID',
      )
    })
  })
})
