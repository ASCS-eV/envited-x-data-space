import * as SUT from './deleteUserById'

describe('common/serverActions/users/deleteUserById', () => {
  it('should return a deleted user as expected', async () => {
    // when ... we request a user by id
    // then ... it returns a user as expected
    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        pkh: 'ISSUER_PKH',
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
      getUserById: jest.fn().mockResolvedValue([user]),
      deleteUserById: jest.fn().mockResolvedValue([{ updatedId: 'USER_PKH' }]),
    })

    const result = await SUT._deleteUserById({ db: dbStub, getServerSession: getServerSessionStub })('USER_ID')
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
      getUserById: jest.fn().mockResolvedValue([user]),
      deleteUserById: jest.fn().mockResolvedValue([{ updatedId: 'USER_PKH' }]),
    })

    await expect(
      SUT._deleteUserById({ db: dbStub, getServerSession: getServerSessionStub })('USER_ID'),
    ).rejects.toThrow('Something went wrong')
  })

  it('should throw because requester is not allowed to get this resource', async () => {
    // when ... we request a user by id, but the requested user is not issued by the requester OR is not their own user
    // then ... it throws as expected
    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        pkh: 'ISSUER_PKH',
      },
    })
    const user = {
      id: 'USER_PKH',
      issuerId: 'FEDERATOR_PKH',
    }
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: jest.fn().mockResolvedValue([user]),
      deleteUserById: jest.fn().mockResolvedValue([{ updatedId: 'USER_PKH' }]),
    })

    await expect(
      SUT._deleteUserById({ db: dbStub, getServerSession: getServerSessionStub })('USER_ID'),
    ).rejects.toThrow('Something went wrong')
  })
})
