import { AssetStatus } from '../types'
import * as SUT from './updateAssetStatus'

describe('common/asset/updateAssetStatus', () => {
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
          metadata: '{}',
          status: 'pending',
        },
        'ASSET_CID',
      )
    })
  })
})
