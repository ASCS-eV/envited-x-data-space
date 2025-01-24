import { ERRORS } from '../../constants'
import { Role } from '../../types'
import * as SUT from './get'

describe('serverActions/businessCategories/get', () => {
  describe('get', () => {
    it('should get the business categories as expected', async () => {
      // when ... we want to get the full profile for a principal user
      // then ... it should get the profile as expected
      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_PKH',
          role: Role.principal,
        },
      })

      const dbStub = jest.fn().mockResolvedValue({
        getBusinessCategories: jest.fn().mockResolvedValue([
          {
            id: 'BUSINESS_CATEGORY_ID',
            name: 'BUSINESS_CATEGORY_NAME',
            description: 'BUSINESS_CATEGORY_DESCRIPTION',
          },
        ]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const result = await SUT._get({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })()
      const db = await dbStub()
      expect(result).toEqual([
        {
          id: 'BUSINESS_CATEGORY_ID',
          name: 'BUSINESS_CATEGORY_NAME',
          description: 'BUSINESS_CATEGORY_DESCRIPTION',
        },
      ])
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(db.getBusinessCategories).toHaveBeenCalled()
    })

    it('should throw an error when there is no session', async () => {
      // when ... we want to get a non existant profile
      // then ... it should throw an error
      const getServerSessionStub = jest.fn().mockResolvedValue(null)
      const logStub = {
        error: jest.fn(),
      } as any

      const dbStub = jest.fn().mockResolvedValue({
        getBusinessCategories: jest.fn().mockResolvedValue([]),
      })

      await expect(SUT._get({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })()).rejects.toThrow(
        ERRORS.INTERNAL_SERVER_ERROR,
      )
    })
  })
})
