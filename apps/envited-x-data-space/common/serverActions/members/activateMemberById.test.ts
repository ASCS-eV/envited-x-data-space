import { ERRORS } from '../../constants'
import { Role } from '../../types'
import * as SUT from './activateMemberById'

describe('common/serverActions/members/activateMemberById', () => {
  it('should return a activated user as expected', async () => {
    // when ... we request a user by id
    // then ... it returns a user as expected
    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        pkh: 'ISSUER_PKH',
        role: Role.federator,
      },
    })
    const user = {
      id: 'USER_PKH',
      issuerId: 'ISSUER_PKH',
    }

    const expected = {
      updatedId: 'USER_PKH',
    }
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: jest.fn().mockResolvedValue(user),
      activateUserById: jest.fn().mockResolvedValue([{ updatedId: 'USER_PKH' }]),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    const result = await SUT._activateMemberById({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(
      'USER_ID',
    )
    expect(result).toEqual(expected)
  })

  it('should throw because of missing session', async () => {
    // when ... we request a user by id without a session
    // then ... it throws as expected
    const getServerSessionStub = jest.fn().mockResolvedValue(null)
    const user = {
      id: 'USER_PKH',
      issuerId: 'ISSUER_PKH',
    }
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: jest.fn().mockResolvedValue(user),
      activateUserById: jest.fn().mockResolvedValue([{ updatedId: 'USER_PKH' }]),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    await expect(
      SUT._activateMemberById({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })('USER_ID'),
    ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    expect(logStub.error).toHaveBeenCalledWith({ message: 'Unauthorized', name: 'UnauthorizedError' })
  })

  it('should throw because requester is not allowed to get this resource', async () => {
    // when ... we request a user by id, but the requested user is not issued by the requester OR is not their own user
    // then ... it throws as expected
    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        pkh: 'ISSUER_PKH',
        role: Role.provider,
      },
    })
    const user = {
      id: 'USER_PKH',
      issuerId: 'FEDERATOR_PKH',
    }
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: jest.fn().mockResolvedValue(user),
      activateUserById: jest.fn().mockResolvedValue([{ updatedId: 'USER_PKH' }]),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    await expect(
      SUT._activateMemberById({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })('USER_ID'),
    ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    expect(logStub.error).toHaveBeenCalledWith({
      message: 'Not allowed to activate this resource',
      name: 'ForbiddenError',
    })
  })
})
