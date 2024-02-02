import { ERRORS } from '../../constants'
import { Role } from '../../types'
import * as SUT from './update'

describe('serverActions/profiles/update', () => {
  describe('update', () => {
    it('should update the profile as expected', async () => {
      // when ... we want to update the profile
      // then ... it should update as expected
      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: 'USER_PKH',
          role: Role.principal,
        },
      })
      const newProfile = {
        description: 'NEW DESCRIPTION',
        name: 'USER_NAME',
      } as any

      const user = {
        user: {
          name: 'USER_NAME',
        },
        profile: {
          name: 'USER_NAME',
        },
      } as any

      const dbStub = jest.fn().mockResolvedValue({
        getUserWithProfileById: jest.fn().mockResolvedValue([user]),
        updateProfile: jest.fn().mockResolvedValue([newProfile]),
        maybeUpdatePublishedState: jest.fn().mockResolvedValue([newProfile]),
      })
      const logStub = {
        error: jest.fn(),
      } as any

      const result = await SUT._update({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(newProfile)
      const db = await dbStub()
      expect(result).toEqual(newProfile)
      expect(db.getUserWithProfileById).toHaveBeenCalledWith('USER_PKH')
      expect(db.maybeUpdatePublishedState).toHaveBeenCalledWith(newProfile)
      expect(db.updateProfile).toHaveBeenCalledWith(newProfile)
    })
  })

  it('should throw if there is no active session', async () => {
    // when ... we want to update the profile without an active session
    // then ... it should throw as expected
    const getServerSessionStub = jest.fn().mockResolvedValue(null)
    const newProfile = {
      description: 'NEW DESCRIPTION',
    } as any

    const user = {
      user: {
        name: 'USER_NAME',
      },
      profile: {
        name: 'USER_NAME',
      },
    } as any

    const dbStub = jest.fn().mockResolvedValue({
      getUserWithProfileById: jest.fn().mockResolvedValue([user]),
      updateProfile: jest.fn().mockResolvedValue(newProfile),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    await expect(
      SUT._update({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(newProfile),
    ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    expect(logStub.error).toHaveBeenCalledWith({ message: 'Unauthorized', name: 'UnauthorizedError' })
  })

  it('should throw with incorrect role', async () => {
    // when ... we want to update the profile as a user
    // then ... it should throw as expectedd
    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        id: 'USER_PKH',
        role: Role.user,
      },
    })
    const newProfile = {
      description: 'NEW DESCRIPTION',
    } as any

    const user = {
      name: 'USER_NAME',
      profile: {
        name: 'USER_NAME',
      },
    } as any

    const dbStub = jest.fn().mockResolvedValue({
      getUserWithProfileById: jest.fn().mockResolvedValue([user]),
      updateProfile: jest.fn().mockResolvedValue(newProfile),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    await expect(
      SUT._update({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(newProfile),
    ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    expect(logStub.error).toHaveBeenCalledWith({ message: 'Incorrect role', name: 'ForbiddenError' })
  })

  it('should throw when user is not found', async () => {
    // when ... we want to update the profile of a non existing user
    // then ... it should throw as expected
    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        id: 'USER_PKH',
        role: Role.principal,
      },
    })
    const newProfile = {
      description: 'NEW DESCRIPTION',
    } as any

    const user = null

    const dbStub = jest.fn().mockResolvedValue({
      getUserWithProfileById: jest.fn().mockResolvedValue([user]),
      updateProfile: jest.fn().mockResolvedValue(newProfile),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    await expect(
      SUT._update({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(newProfile),
    ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    expect(logStub.error).toHaveBeenCalledWith({ message: 'User not found', name: 'BadRequestError' })
  })

  it('should throw if user is updating someone elses profile', async () => {
    // when ... we want to update the profile of someone else
    // then ... it should throw as expected
    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        id: 'USER_PKH',
        role: Role.principal,
      },
    })
    const newProfile = {
      description: 'NEW DESCRIPTION',
      name: 'OTHER_USER_NAME',
    } as any

    const user = {
      name: 'USER_NAME',
      profile: {
        name: 'USER_NAME',
      },
    } as any

    const dbStub = jest.fn().mockResolvedValue({
      getUserWithProfileById: jest.fn().mockResolvedValue([user]),
      updateProfile: jest.fn().mockResolvedValue(newProfile),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    await expect(
      SUT._update({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(newProfile),
    ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    expect(logStub.error).toHaveBeenCalledWith({ message: 'Incorrect profile', name: 'ForbiddenError' })
  })
})
