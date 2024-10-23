import { ERRORS } from '../../constants'
import { Role, UploadStatus } from '../../types'
import * as SUT from './download'

describe('serverActions/assets/download', () => {
  describe('_download', () => {
    it('should get a download link from the asset as expected', async () => {
      // when ... we want to download the asset by id
      // then ... it should get the download link as expected
      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_PKH',
          pkh: 'USER_PKH',
          role: Role.principal,
        },
      })

      const dbStub = jest.fn().mockResolvedValue({
        getUpload: jest.fn().mockResolvedValue([
          {
            id: 'ASSET_ID',
            cid: 'ASSET_CID',
            metadata: 'METADATA',
            status: UploadStatus.pending,
            userId: 'USER_PKH',
          },
        ]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const getUploadDownloadUrlStub = jest.fn().mockResolvedValue('DOWNLOAD_URL')

      const result = await SUT._download({
        db: dbStub,
        getServerSession: getServerSessionStub,
        log: logStub,
        getUploadDownloadUrl: getUploadDownloadUrlStub,
      })('ASSET_ID')
      const db = await dbStub()
      expect(result).toEqual('DOWNLOAD_URL')
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(db.getUpload).toHaveBeenCalled()
    })

    it('should throw an error when there is no session', async () => {
      // when ... we want to get a error when there is no session
      // then ... it should throw an error
      const getServerSessionStub = jest.fn().mockResolvedValue(null)
      const logStub = {
        error: jest.fn(),
      } as any

      const dbStub = jest.fn().mockResolvedValue({
        getUpload: jest.fn().mockResolvedValue([]),
      })

      const getUploadDownloadUrlStub = jest.fn().mockResolvedValue('DOWNLOAD_URL')

      await expect(
        SUT._download({
          db: dbStub,
          getServerSession: getServerSessionStub,
          log: logStub,
          getUploadDownloadUrl: getUploadDownloadUrlStub,
        })('ASSET_ID'),
      ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    })
  })
})
