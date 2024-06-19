import { AssetStatus } from '../types'
import * as SUT from './updateAssetStatus'

describe('common/asset/updateAssetStatus', () => {
  describe('updateAssetStatus', () => {
    it('should update the asset as expected', async () => {
      // when ... we want to get the asset by id
      // then ... it should update the asset as expected
      const dbStub = jest.fn().mockResolvedValue({
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
      expect(db.updateAsset).toHaveBeenCalledWith({
        metadata: '',
        status: 'pending',
      })
    })
  })
})
