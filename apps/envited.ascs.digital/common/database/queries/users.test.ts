import { USER_CREDENTIAL } from '../../fixtures'
import { addressType, credentialType, issuer, usersToRoles } from '../schema'
import { Credential } from '../types'
import {
  _insertUserTx,
  _txn,
  insertAddressTypeTx,
  insertCredentialTypeTx,
  insertIssuerTx,
  insertUsersToRolesTx,
} from './users'

describe('common/database/users', () => {
  describe('insertAddressTypeTx', () => {
    it('should insert a new addresType', async () => {
      // when ... we want to insert a new addresType
      // then ... we should get the queries as expected
      const tx = {
        insert: jest.fn().mockReturnValue({
          values: jest.fn().mockReturnValue({
            onConflictDoNothing: jest.fn().mockReturnValue({
              returning: jest.fn().mockResolvedValue([{ id: 'ADDRESS_TYPE_ID' }]),
            }),
          }),
        }),
        select: jest.fn().mockReturnValue({
          from: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue([{ id: 'ADDRESS_TYPE_ID' }]),
            }),
          }),
        }),
      } as any

      const result = await insertAddressTypeTx(tx)('ADDRESS_TYPE')

      expect(tx.insert).toHaveBeenCalledWith(addressType)
      expect(tx.insert().values).toHaveBeenCalledWith({ name: 'ADDRESS_TYPE' })
      expect(tx.insert().values().onConflictDoNothing).toHaveBeenCalledWith()
      expect(tx.insert().values().onConflictDoNothing().returning).toHaveBeenCalledWith()
      expect(result).toEqual([{ id: 'ADDRESS_TYPE_ID' }])
    })
  })

  describe('insertCredentialTypeTx', () => {
    it('should insert a credentialType and add a relation on usersToCredentialTypes', async () => {
      // when ... we want insert a credential type
      // then ... we should connect it to a user as expected
      const tx = {
        insert: jest.fn().mockReturnValue({
          values: jest.fn().mockReturnValue({
            onConflictDoNothing: jest.fn().mockReturnValue({
              returning: jest.fn().mockResolvedValue({}),
            }),
          }),
        }),
        select: jest.fn().mockReturnValue({
          from: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
              limit: jest.fn().mockReturnValue([{ id: 'CREDENTIAL_TYPE_ID' }]),
            }),
          }),
        }),
      } as any

      const result = await insertCredentialTypeTx(tx)({
        userId: 'USER_ID',
        type: 'TYPE',
      })

      expect(tx.insert).toHaveBeenCalledWith(credentialType)
      expect(tx.insert().values).toHaveBeenNthCalledWith(1, {
        name: 'TYPE',
      })
      expect(tx.insert().values().onConflictDoNothing).toHaveBeenCalledWith()
      expect(tx.insert().values).toHaveBeenNthCalledWith(2, {
        userId: 'USER_ID',
        credentialTypeId: 'CREDENTIAL_TYPE_ID',
      })
      expect(result).toEqual({})
    })
  })

  describe('insertIssuerTx', () => {
    it('should insert a issuer', async () => {
      // when ... we to insert a issuer
      // then ... we should get the issuer result
      const tx = {
        insert: jest.fn().mockReturnValue({
          values: jest.fn().mockReturnValue({
            onConflictDoNothing: jest.fn().mockReturnValue({
              returning: jest.fn().mockResolvedValue({
                id: 'ID',
                type: 'TYPE',
                name: 'NAME',
                url: 'URL',
              }),
            }),
          }),
        }),
        select: jest.fn().mockReturnValue({}),
      } as any

      const result = await insertIssuerTx(tx)({
        id: 'ID',
        type: 'TYPE',
        name: 'NAME',
        url: 'URL',
      })

      expect(tx.insert).toHaveBeenCalledWith(issuer)
      expect(tx.insert().values).toHaveBeenCalledWith({
        id: 'ID',
        type: 'TYPE',
        name: 'NAME',
        url: 'URL',
      })
      expect(tx.insert().values().onConflictDoNothing).toHaveBeenCalledWith()
      expect(tx.insert().values().onConflictDoNothing().returning).toHaveBeenCalledWith()
      expect(result).toEqual({
        id: 'ID',
        type: 'TYPE',
        name: 'NAME',
        url: 'URL',
      })
    })
  })

  describe('insertUsersToRolesTx', () => {
    it('should connect users to roles', async () => {
      // when ... we want to connect a user to a role
      // then ... we should get the result as expected
      const tx = {
        insert: jest.fn().mockReturnValue({
          values: jest.fn().mockReturnValue({}),
        }),
      } as any

      const result = await insertUsersToRolesTx(tx)({
        userId: 'USER_ID',
        roleId: 'ROLE_ID',
      })

      expect(tx.insert).toHaveBeenCalledWith(usersToRoles)
      expect(tx.insert().values).toHaveBeenNthCalledWith(1, {
        userId: 'USER_ID',
        roleId: 'ROLE_ID',
      })
      expect(result).toEqual({})
    })
  })

  describe('txn', () => {
    it('should insert a user with all the relational', async () => {
      // when ... we want to connect a user to a role
      // then ... we should get the result as expected
      const dependencies = {
        insertAddressTypeTx: () => jest.fn().mockResolvedValue([{ id: 'ADDRESS_TYPE_ID' }]),
        insertIssuerTx: () => jest.fn().mockResolvedValue([{ id: 'ISSUER_ID' }]),
        insertUsersToRolesTx: () => jest.fn().mockResolvedValue([{ id: 'ISSUER_ID' }]),
        insertCredentialTypeTx: () => jest.fn().mockResolvedValue([{ id: 'CREDENTIAL_TYPE_ID' }]),
      } as any

      const tx = {
        insert: jest.fn().mockReturnValue({
          values: jest.fn().mockReturnValue({
            onConflictDoNothing: jest.fn().mockReturnValue({
              returning: jest.fn().mockResolvedValue({}),
            }),
            returning: jest.fn().mockResolvedValue([{ id: 'USER_ID' }]),
          }),
        }),
        select: jest.fn().mockReturnValue({
          from: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue([{ id: 'ROLE_ID' }]),
          }),
        }),
        rollback: jest.fn().mockResolvedValue({}),
      }

      const transaction = await _txn(dependencies)(USER_CREDENTIAL)(tx as any)

      expect(tx.insert().values).toHaveBeenCalled()
      expect(transaction).toEqual({
        id: 'USER_ID',
      })
    })
  })

  it('should rollback a user with all the relational', async () => {
    // when ... we want to insert and get an rejected user
    // then ... we should get the rollback as expected
    const dependencies = {
      insertAddressTypeTx: () => jest.fn().mockResolvedValue([{ id: 'ADDRESS_TYPE_ID' }]),
      insertIssuerTx: () => jest.fn().mockResolvedValue([{ id: 'ISSUER_ID' }]),
      insertUsersToRolesTx: () => jest.fn().mockResolvedValue([{ id: 'ISSUER_ID' }]),
      insertCredentialTypeTx: () => jest.fn().mockResolvedValue([{ id: 'CREDENTIAL_TYPE_ID' }]),
    } as any

    const tx = {
      insert: jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          onConflictDoNothing: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue({}),
          }),
          returning: jest.fn().mockRejectedValue('ERROR'),
        }),
      }),
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue([{ id: 'ROLE_ID' }]),
        }),
      }),
      rollback: jest.fn().mockResolvedValue({}),
    }

    await _txn(dependencies)(USER_CREDENTIAL)(tx as any)

    expect(tx.rollback).toHaveBeenCalled()
  })

  describe('_insertUserTx', () => {
    it('should insert a user with all the relational connections', async () => {
      // when ... we want to connect a user to a role
      // then ... we should get the result as expected
      const db = {
        transaction: jest.fn(),
      }
      const credential = {} as Credential
      const transaction = jest.fn().mockResolvedValue('x')

      _insertUserTx(transaction)(db as any)(credential)

      expect(transaction).toHaveBeenCalledWith(credential)
      expect(db.transaction).toHaveBeenCalledWith(transaction(credential))
    })
  })
})
