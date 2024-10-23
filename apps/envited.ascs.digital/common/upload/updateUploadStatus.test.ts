import { UploadStatus } from '../types'
import * as SUT from './updateUploadStatus'

describe('common/asset/updateUploadStatus', () => {
  describe('updateUploadStatus', () => {
    it('should update the asset as expected', async () => {
      // when ... we want to get the asset by id
      // then ... it should update the asset as expected
      const dbStub = jest.fn().mockResolvedValue({
        updateUploadCID: jest.fn().mockResolvedValue([
          {
            id: 'ASSET_ID',
            cid: 'NEW_ASSET_CID',
            metadata: 'METADATA',
            status: UploadStatus.pending,
            userId: 'USER_PKH',
          },
        ]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const result = await SUT._updateUpload({ db: dbStub, log: logStub })(
        'NEW_ASSET_CID',
        'ASSET_CID',
        UploadStatus.pending,
        {} as any,
      )
      const db = await dbStub()
      expect(result).toEqual({
        id: 'ASSET_ID',
        cid: 'NEW_ASSET_CID',
        metadata: 'METADATA',
        status: UploadStatus.pending,
        userId: 'USER_PKH',
      })
      expect(db.updateUploadCID).toHaveBeenCalledWith(
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
