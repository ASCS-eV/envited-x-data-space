import { ERRORS } from '../../constants'
import { AssetStatus, Role } from '../../types'
import * as SUT from './insert'

describe('serverActions/assets/insert', () => {
  describe('insert', () => {
    it('should insert the assets as expected', async () => {
      // when ... we want to insert a assets
      // then ... it should return the result as expected
      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_PKH',
          pkh: 'USER_PKH',
          role: Role.principal,
        },
      })

      const dbStub = jest.fn().mockResolvedValue({
        insertAsset: jest.fn().mockResolvedValue([
          {
            id: 'UPLOAD_ID',
            cid: 'UPLOAD_CID',
            metadata: 'METADATA',
            status: AssetStatus.pending,
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
        status: AssetStatus.pending,
        userId: 'USER_PKH',
      })
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(db.insertAsset).toHaveBeenCalled()
    })

    it('should throw an error when there is no session', async () => {
      // when ... we don't want to insert a assets without session
      // then ... it should throw an error
      const getServerSessionStub = jest.fn().mockResolvedValue(null)
      const logStub = {
        error: jest.fn(),
      } as any

      const dbStub = jest.fn().mockResolvedValue({
        insertAsset: jest.fn().mockResolvedValue([]),
      })

      await expect(
        SUT._insert({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })('USER_PKH', 'UPLOAD_CID'),
      ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    })
  })
})
