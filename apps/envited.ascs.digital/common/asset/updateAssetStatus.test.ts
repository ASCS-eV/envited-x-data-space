import { ERRORS } from '../constants'
import { AssetStatus } from '../types'
import * as SUT from './updateAssetStatus'

describe('common/asset/updateAssetStatus', () => {
  describe('updateAssetStatus', () => {
    it('should get the asset as expected', async () => {
      // when ... we want to get the asset by id
      // then ... it should get the profile as expected
      const dbStub = jest.fn().mockResolvedValue({
        getAssetByCID: jest.fn().mockResolvedValue([
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

      const result = await SUT._updateAssetStatus({ db: dbStub, log: logStub })('ASSET_CID', AssetStatus.pending, '')
      const db = await dbStub()
      expect(result).toEqual({
        id: 'ASSET_ID',
        cid: 'ASSET_CID',
        metadata: 'METADATA',
        status: AssetStatus.pending,
        userId: 'USER_PKH',
      })
      expect(db.getAssetByCID).toHaveBeenCalledWith('ASSET_CID')
      expect(db.updateAsset).toHaveBeenCalledWith({
        cid: 'ASSET_CID',
        id: 'ASSET_ID',
        metadata: '',
        status: 'pending',
        userId: 'USER_PKH',
      })
    })

    it('should throw an error when there is no asset found', async () => {
      // when ... we want to get a error when there is no asset found
      // then ... it should throw an error
      const logStub = {
        error: jest.fn(),
      } as any

      const dbStub = jest.fn().mockResolvedValue({
        getAssetByCID: jest.fn().mockResolvedValue([]),
        updateAsset: jest.fn().mockResolvedValue([]),
      })

      await expect(
        SUT._updateAssetStatus({ db: dbStub, log: logStub })('ASSET_CID', AssetStatus.pending, ''),
      ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    })
  })
})
