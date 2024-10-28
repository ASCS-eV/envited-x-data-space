import { ERRORS } from '../../constants'
import { Role, AssetStatus } from '../../types'
import * as SUT from './update'

describe('serverActions/assets/update', () => {
  describe('update', () => {
    it('should update the asset as expected', async () => {
      // when ... we want to update the asset
      // then ... it should update and return the asset as expected
      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_ID',
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
            status: AssetStatus.processing,
            userId: 'USER_PKH',
          },
        ]),
        updateAsset: jest.fn().mockResolvedValue([
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

      const result = await SUT._update({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(
        'USER_PKH',
        'ASSET_ID',
        '',
        AssetStatus.pending,
      )
      const db = await dbStub()
      expect(result).toEqual({
        id: 'ASSET_ID',
        cid: 'ASSET_CID',
        metadata: 'METADATA',
        status: AssetStatus.pending,
        userId: 'USER_PKH',
      })
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(db.updateAsset).toHaveBeenCalledWith('USER_PKH', 'ASSET_ID', {
        cid: 'ASSET_CID',
        id: 'ASSET_ID',
        metadata: '',
        status: 'pending',
        userId: 'USER_PKH',
      })
    })

    it('should throw an error when there is no session', async () => {
      // when ... we want to update a asset without session
      // then ... it should throw an error
      const getServerSessionStub = jest.fn().mockResolvedValue(null)
      const logStub = {
        error: jest.fn(),
      } as any

      const dbStub = jest.fn().mockResolvedValue({
        getAsset: jest.fn().mockResolvedValue([
          {
            id: 'ASSET_ID',
            cid: 'ASSET_CID',
            metadata: 'METADATA',
            status: AssetStatus.processing,
            userId: 'USER_PKH',
          },
        ]),
        updateAsset: jest.fn().mockResolvedValue([]),
      })

      await expect(
        SUT._update({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(
          'USER_PKH',
          'ASSET_CID',
          '',
          AssetStatus.pending,
        ),
      ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    })
  })
})
