import { ERRORS } from '../../constants'
import { Role, UploadStatus } from '../../types'
import * as SUT from './insert'

describe('serverActions/uploads/insert', () => {
  describe('insert', () => {
    it('should insert the upload as expected', async () => {
      // when ... we want to insert a upload
      // then ... it should return the result as expected
      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_PKH',
          pkh: 'USER_PKH',
          role: Role.principal,
        },
      })

      const dbStub = jest.fn().mockResolvedValue({
        insertUpload: jest.fn().mockResolvedValue([
          {
            id: 'UPLOAD_ID',
            cid: 'UPLOAD_CID',
            metadata: 'METADATA',
            status: UploadStatus.pending,
            userId: 'USER_PKH',
          },
        ]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const result = await SUT._insert({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(
        'USER_PKH',
        'UPLOAD_CID',
      )
      const db = await dbStub()
      expect(result).toEqual({
        id: 'UPLOAD_ID',
        cid: 'UPLOAD_CID',
        metadata: 'METADATA',
        status: UploadStatus.pending,
        userId: 'USER_PKH',
      })
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(db.insertUpload).toHaveBeenCalled()
    })

    it('should throw an error when there is no session', async () => {
      // when ... we don't want to insert a upload without session
      // then ... it should throw an error
      const getServerSessionStub = jest.fn().mockResolvedValue(null)
      const logStub = {
        error: jest.fn(),
      } as any

      const dbStub = jest.fn().mockResolvedValue({
        insertUpload: jest.fn().mockResolvedValue([]),
      })

      await expect(
        SUT._insert({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })('USER_PKH', 'UPLOAD_CID'),
      ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    })
  })
})
