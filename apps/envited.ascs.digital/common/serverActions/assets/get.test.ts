import { ERRORS } from '../../constants'
import { Role, AssetStatus } from '../../types'
import * as SUT from './get'

describe('serverActions/assets/get', () => {
  describe('_get', () => {
    it('should get the asset as expected', async () => {
      // when ... we want to get the asset by id
      // then ... it should get the asset as expected
      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_PKH',
          pkh: 'USER_PKH',
          role: Role.principal,
        },
      })

      const dbStub = jest.fn().mockResolvedValue({
        getAsset: jest.fn().mockResolvedValue([
          {
            id: 'ASSET_ID',
            cid: 'ASSET_CID',
            metadata: 'METADATA',
            status: AssetStatus.pending,
            userId: 'USER_PKH',
          },
        ]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const result = await SUT._get({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })('ASSET_ID')
      const db = await dbStub()
      expect(result).toEqual({
        id: 'ASSET_ID',
        cid: 'ASSET_CID',
        metadata: 'METADATA',
        status: AssetStatus.pending,
        userId: 'USER_PKH',
      })
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(db.getAsset).toHaveBeenCalled()
    })

    it('should throw an error when there is no session', async () => {
      // when ... we want to get a error when there is no session
      // then ... it should throw an error
      const getServerSessionStub = jest.fn().mockResolvedValue(null)
      const logStub = {
        error: jest.fn(),
      } as any

      const dbStub = jest.fn().mockResolvedValue({
        getAsset: jest.fn().mockResolvedValue([]),
      })

      await expect(
        SUT._get({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })('ASSET_ID'),
      ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    })
  })

  describe('_getAssetsByUserId', () => {
    it('should get the asset as expected', async () => {
      // when ... we want to get the asset by id
      // then ... it should get the asset as expected
      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_PKH',
          pkh: 'USER_PKH',
          role: Role.principal,
        },
      })

      const dbStub = jest.fn().mockResolvedValue({
        getAssetsByUserId: jest.fn().mockResolvedValue([
          {
            id: 'ASSET_ID',
            cid: 'ASSET_CID',
            metadata: 'METADATA',
            status: AssetStatus.pending,
            userId: 'USER_PKH',
          },
        ]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const result = await SUT._getAssets({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })()
      const db = await dbStub()
      expect(result).toEqual([
        {
          id: 'ASSET_ID',
          cid: 'ASSET_CID',
          metadata: 'METADATA',
          status: AssetStatus.pending,
          userId: 'USER_PKH',
        },
      ])
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(db.getAssetsByUserId).toHaveBeenCalled()
    })

    it('should throw an error when there is no session', async () => {
      // when ... we want to get a error when there is no session
      // then ... it should throw an error
      const getServerSessionStub = jest.fn().mockResolvedValue(null)
      const logStub = {
        error: jest.fn(),
      } as any

      const dbStub = jest.fn().mockResolvedValue({
        getAssetsByUserId: jest.fn().mockResolvedValue([]),
      })

      await expect(
        SUT._getAssets({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(),
      ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    })
  })
})
