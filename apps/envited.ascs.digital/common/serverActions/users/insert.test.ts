import { CredentialType } from '../../types'
import * as SUT from './insert'

describe('common/serverActions/users/insert', () => {
  it('should insert a user as expected', async () => {
    // when ... we insert a user
    // then ... it returns a user as expected

    const dbStub = jest.fn().mockResolvedValue({
      insertUserTx: jest.fn().mockResolvedValue({
        id: 'USER_DID',
        type: CredentialType.AscsUser,
      }),
      getUserById: jest.fn().mockResolvedValueOnce({}).mockResolvedValueOnce({
        id: 'USER_DID',
        type: CredentialType.AscsMember,
      }),
    }) as any

    const credential = {
      credentialSubject: {
        id: 'USER_DID',
        type: CredentialType.AscsUser,
      },
      issuer: {
        id: 'ISSUER_DID',
      },
    } as any

    const result = await SUT._insert({ db: dbStub })(credential)
    const db = await dbStub()
    expect(db.getUserById).toHaveBeenCalledTimes(2)
    expect(db.getUserById).toHaveBeenCalledWith('USER_DID')
    expect(db.getUserById).toHaveBeenCalledWith('ISSUER_DID')
    expect(result).toEqual({
      id: 'USER_DID',
      type: CredentialType.AscsUser,
    })
  })

  it('should fail when inserting an existing user', async () => {
    // when ... we insert an existing user
    // then ... it throws as expected

    const dbStub = jest.fn().mockResolvedValue({
      insertUserTx: jest.fn().mockResolvedValue({
        id: 'USER_DID',
        type: CredentialType.AscsUser,
      }),
      getUserById: jest
        .fn()
        .mockResolvedValueOnce({
          id: 'USER_DID',
          type: CredentialType.AscsUser,
        })
        .mockResolvedValueOnce({
          id: 'USER_DID',
          type: CredentialType.AscsMember,
        }),
    }) as any

    const credential = {
      credentialSubject: {
        id: 'USER_DID',
        type: CredentialType.AscsUser,
      },
      issuer: {
        id: 'ISSUER_DID',
      },
    } as any

    await expect(() => SUT._insert({ db: dbStub })(credential)).rejects.toThrow()
  })

  it('should fail when inserting a user without an issuer', async () => {
    // when ... we insert a user without an issuer
    // then ... it throws as expected

    const dbStub = jest.fn().mockResolvedValue({
      insertUserTx: jest.fn().mockResolvedValue({
        id: 'USER_DID',
        type: CredentialType.AscsUser,
      }),
      getUserById: jest.fn().mockResolvedValueOnce({}).mockResolvedValueOnce({}),
    }) as any

    const credential = {
      credentialSubject: {
        id: 'USER_DID',
        type: CredentialType.AscsUser,
      },
      issuer: {
        id: 'ISSUER_DID',
      },
    } as any

    await expect(() => SUT._insert({ db: dbStub })(credential)).rejects.toThrow()
  })
})
