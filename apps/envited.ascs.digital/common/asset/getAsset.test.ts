import { AssetStatus } from '../types'
import * as SUT from './getAsset'

describe('common/asset/getAsset', () => {
  describe('getAsset', () => {
    it('should get the asset as expected', async () => {
      // when ... we want to get the asset by id
      // then ... it should update the asset as expected
      const dbStub = jest.fn().mockResolvedValue({
        getAssetByCID: jest.fn().mockResolvedValue([
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

      const result = await SUT._getAsset({ db: dbStub, log: logStub })('ASSET_CID')
      const db = await dbStub()
      expect(result).toEqual({
        id: 'ASSET_ID',
        cid: 'ASSET_CID',
        metadata: 'METADATA',
        status: AssetStatus.pending,
        userId: 'USER_PKH',
      })
      expect(db.getAssetByCID).toHaveBeenCalledWith('ASSET_CID')
    })
  })
})
