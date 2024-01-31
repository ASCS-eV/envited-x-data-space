import { Role } from '../../types'
import * as SUT from './get'

describe('serverActions/profiles/get', () => {
  describe('get', () => {
    it('should get the profile as expected', async () => {
      // when ... we want to get the full profile for a principal user
      // then ... it should get the profile as expected
      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_PKH',
          role: Role.principal,
        },
      })

      const dbStub = jest.fn().mockResolvedValue({
        getProfileById: jest.fn().mockResolvedValue({
          name: 'USER_NAME',
          description: 'USER_DESCRIPTION',
          principalName: 'USER_PRINCIPAL_NAME',
        }),
        getUserById: jest.fn().mockResolvedValue({
          name: 'USER_NAME',
          profile: {
            name: 'USER_NAME',
          },
        }),
      })

      const id = 'PROFILE_ID'

      const result = await SUT._get({ db: dbStub, getServerSession: getServerSessionStub })(id)
      const db = await dbStub()
      expect(result).toEqual({
        name: 'USER_NAME',
        description: 'USER_DESCRIPTION',
        principalName: 'USER_PRINCIPAL_NAME'
      })
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(db.getProfileById).toHaveBeenCalledWith(id)
      expect(db.getUserById).toHaveBeenCalledWith('USER_PKH')
    })

    it('should return a limited profile when there is no session', async () => {
      // when ... we want to get the limited profile for a principal user
      // then ... it should get the profile as expected
      const getServerSessionStub = jest.fn().mockResolvedValue(null)

      const dbStub = jest.fn().mockResolvedValue({
        getProfileById: jest.fn().mockResolvedValue({
          name: 'USER_NAME',
          description: 'USER_DESCRIPTION',
          principalName: 'USER_PRINCIPAL_NAME',
        }),
        getUserById: jest.fn().mockResolvedValue({
          name: 'USER_NAME',
          profile: {
            name: 'USER_NAME',
          },
        }),
      })

      const id = 'PROFILE_ID'

      const result = await SUT._get({ db: dbStub, getServerSession: getServerSessionStub })(id)

      expect(result).toEqual({
        name: 'USER_NAME',
        description: 'USER_DESCRIPTION',
      })
    })
  })
})
