import { ERRORS } from '../../constants'
import { Role } from '../../types'
import * as SUT from './get'

describe('serverActions/profiles/get', () => {
  describe('get', () => {
    it('should get the own full profile as expected', async () => {
      // when ... we want to get the full profile for a principal user
      // then ... it should get the profile as expected
      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_PRINCIPAL_PKH',
          role: Role.principal,
        },
      })

      const dbStub = jest.fn().mockResolvedValue({
        getProfileBySlug: jest.fn().mockResolvedValue({
          name: 'USER_PRINCIPAL_NAME',
          description: 'USER_DESCRIPTION',
          principalName: 'USER_PRINCIPAL_NAME',
        }),
        getUserById: jest.fn().mockResolvedValue([
          {
            name: 'USER_PRINCIPAL_NAME',
          },
        ]),
        getUserByIssuerId: jest.fn().mockResolvedValue([
          {
            name: 'USER_PRINCIPAL_NAME',
          },
        ]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const slug = 'PROFILE_SLUG'

      const result = await SUT._getProfileBySlug({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(
        slug,
      )
      const db = await dbStub()
      expect(result).toEqual({
        name: 'USER_PRINCIPAL_NAME',
        description: 'USER_DESCRIPTION',
        principalName: 'USER_PRINCIPAL_NAME',
      })
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(db.getProfileBySlug).toHaveBeenCalledWith(slug)
      expect(db.getUserById).toHaveBeenCalledWith('USER_PRINCIPAL_PKH')
      expect(db.getUserByIssuerId).not.toHaveBeenCalled()
    })

    it('should get the full profile for a principals user as expected', async () => {
      // when ... we want to get the full profile for the user of a certain principal
      // then ... it should get the profile as expected
      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_PKH',
          role: Role.user,
        },
      })

      const dbStub = jest.fn().mockResolvedValue({
        getProfileBySlug: jest.fn().mockResolvedValue({
          name: 'USER_PRINCIPAL_NAME',
          description: 'USER_DESCRIPTION',
          principalName: 'USER_PRINCIPAL_NAME',
        }),
        getUserById: jest.fn().mockResolvedValue([
          {
            name: 'USER_NAME',
          },
        ]),
        getUserByIssuerId: jest.fn().mockResolvedValue([
          {
            name: 'USER_PRINCIPAL_NAME',
          },
        ]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const slug = 'PROFILE_SLUG'

      const result = await SUT._getProfileBySlug({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(
        slug,
      )
      const db = await dbStub()
      expect(result).toEqual({
        name: 'USER_PRINCIPAL_NAME',
        description: 'USER_DESCRIPTION',
        principalName: 'USER_PRINCIPAL_NAME',
      })
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(db.getProfileBySlug).toHaveBeenCalledWith(slug)
      expect(db.getUserById).toHaveBeenCalledWith('USER_PKH')
      expect(db.getUserByIssuerId).toHaveBeenCalled()
    })

    it('should return a limited profile when there is no session', async () => {
      // when ... we want to get the limited profile for a principal user
      // then ... it should get the profile as expected
      const getServerSessionStub = jest.fn().mockResolvedValue(null)

      const dbStub = jest.fn().mockResolvedValue({
        getProfileBySlug: jest.fn().mockResolvedValue({
          name: 'USER_NAME',
          description: 'USER_DESCRIPTION',
          principalName: 'USER_PRINCIPAL_NAME',
        }),
        getUserById: jest.fn().mockResolvedValue([
          {
            name: 'USER_NAME',
            profile: {
              name: 'USER_NAME',
            },
          },
        ]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const slug = 'PROFILE_SLUG'

      const result = await SUT._getProfileBySlug({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(
        slug,
      )
      const db = await dbStub()
      expect(result).toEqual({
        name: 'USER_NAME',
        description: 'USER_DESCRIPTION',
      })
      expect(getServerSessionStub).toHaveBeenCalledWith()
      expect(db.getProfileBySlug).toHaveBeenCalledWith(slug)
      expect(db.getUserById).not.toHaveBeenCalled()
    })

    it('should throw an error when the profile id is missing', async () => {
      // when ... we want to get a profile but the id is missing
      // then ... it should throw an error
      const getServerSessionStub = jest.fn().mockResolvedValue([
        {
          user: {
            id: 'USER_PRINCIPAL_PKH',
            role: Role.principal,
          },
        },
      ])
      const logStub = {
        error: jest.fn(),
      } as any

      const dbStub = jest.fn().mockResolvedValue({})

      const slug = ''

      await expect(
        SUT._get({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(slug),
      ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
      expect(getServerSessionStub).not.toHaveBeenCalledWith()
      expect(dbStub).not.toHaveBeenCalled()
      expect(logStub.error).toHaveBeenCalledWith({ message: 'Missing slug', name: 'BadRequestError' })
    })
  })

  it('should throw an error when the profile is not found', async () => {
    // when ... we want to get a non existant profile
    // then ... it should throw an error
    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        id: 'USER_PRINCIPAL_PKH',
        role: Role.principal,
      },
    })
    const logStub = {
      error: jest.fn(),
    } as any

    const dbStub = jest.fn().mockResolvedValue({
      getProfileBySlug: jest.fn().mockResolvedValue([]),
    })

    const slug = 'NON_EXISTANT_PROFILE_SLUG'
    const db = await dbStub()
    await expect(
      SUT._getProfileBySlug({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(slug),
    ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    expect(getServerSessionStub).toHaveBeenCalledWith()
    expect(dbStub).toHaveBeenCalledWith()
    expect(db.getProfileBySlug).toHaveBeenCalledWith(slug)
    expect(logStub.error).toHaveBeenCalledWith({ message: 'Not found', name: 'NotFoundError' })
  })
})
