import { USER_CREDENTIAL } from '../../fixtures'
import { extractUuidFromUrn } from '../../utils'
import { addressType, credentialType, issuer, profile, usersToRoles } from '../schema'
import { Credential } from '../types'
import * as SUT from './users'

describe('common/database/users', () => {
  describe('insertAddressTypeTx', () => {
    it('should insert a new addresType', async () => {
      // when ... we want to insert a new addresType
      // then ... we should get the queries as expected
      const tx = {
        insert: jest.fn().mockReturnValue({
          values: jest.fn().mockReturnValue({
            onConflictDoUpdate: jest.fn().mockReturnValue({
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

      const result = await SUT.insertAddressTypeTx(tx)('ADDRESS_TYPE')

      expect(tx.insert).toHaveBeenCalledWith(addressType)
      expect(tx.insert().values).toHaveBeenCalledWith({ name: 'ADDRESS_TYPE' })
      expect(tx.insert().values().onConflictDoUpdate).toHaveBeenCalledWith({
        target: addressType.name,
        set: { name: 'ADDRESS_TYPE' },
      })
      expect(tx.insert().values().onConflictDoUpdate().returning).toHaveBeenCalledWith()
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

      const result = await SUT.insertCredentialTypeTx(tx)({
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
            onConflictDoUpdate: jest.fn().mockReturnValue({
              returning: jest.fn().mockResolvedValue({
                id: 'ISSUER_ID',
                type: 'TYPE',
                name: 'NAME',
                url: 'URL',
              }),
            }),
          }),
        }),
        select: jest.fn().mockReturnValue({}),
      } as any

      const result = await SUT.insertIssuerTx(tx)({
        id: 'ISSUER_ID',
        type: 'TYPE',
        name: 'NAME',
        url: 'URL',
      })

      expect(tx.insert).toHaveBeenCalledWith(issuer)
      expect(tx.insert().values).toHaveBeenCalledWith({
        id: 'ISSUER_ID',
        type: 'TYPE',
        name: 'NAME',
        url: 'URL',
      })
      expect(tx.insert().values().onConflictDoUpdate).toHaveBeenCalledWith({
        target: issuer.id,
        set: { id: 'ISSUER_ID' },
      })
      expect(tx.insert().values().onConflictDoUpdate().returning).toHaveBeenCalledWith()
      expect(result).toEqual({
        id: 'ISSUER_ID',
        type: 'TYPE',
        name: 'NAME',
        url: 'URL',
      })
    })
  })

  describe('insertCompanyProfileTx', () => {
    it('should insert a issuer', async () => {
      // when ... we to insert a issuer
      // then ... we should get the issuer result
      const tx = {
        insert: jest.fn().mockReturnValue({
          values: jest.fn().mockReturnValue({
            onConflictDoNothing: jest.fn().mockReturnValue({
              returning: jest.fn().mockResolvedValue({
                name: 'NAME',
                isPublished: true,
              }),
            }),
          }),
        }),
      } as any

      const result = await SUT.insertCompanyProfileTx(tx)({
        name: 'NAME',
        slug: 'name',
        isPublished: false,
        streetAddress: 'STREET_ADDRESS',
        postalCode: 'POSTAL_CODE',
        addressLocality: 'ADDRESS_LOCALITY',
        addressCountry: 'ADDRESS_COUNTRY',
      })

      expect(tx.insert).toHaveBeenCalledWith(profile)
      expect(tx.insert().values).toHaveBeenCalledWith({
        name: 'NAME',
        slug: 'name',
        isPublished: false,
        streetAddress: 'STREET_ADDRESS',
        postalCode: 'POSTAL_CODE',
        addressLocality: 'ADDRESS_LOCALITY',
        addressCountry: 'ADDRESS_COUNTRY',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      expect(tx.insert().values().onConflictDoNothing().returning).toHaveBeenCalledWith()
      expect(result).toEqual({
        name: 'NAME',
        isPublished: true,
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

      const result = await SUT.insertUsersToRolesTx(tx)({
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

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2020, 3, 1))
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
        insertCompanyProfileTx: () => jest.fn().mockResolvedValue([{ id: 'COMPANY_PROFILE_ID' }]),
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

      const transaction = await SUT._txn(dependencies)(USER_CREDENTIAL)(tx as any)

      expect(tx.insert().values).toHaveBeenCalledWith({
        addressCountry: 'DE',
        addressLocality: 'Munich',
        addressTypeId: 'ADDRESS_TYPE_ID',
        articlesOfAssociationAccepted: '',
        contributionRulesAccepted: '',
        createdAt: new Date(),
        email: 'mailto:user@test.de',
        expirationDate: new Date('2102-09-15T17:14:33.000Z'),
        id: 'did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeE',
        isAscsMember: true,
        isEnvitedMember: true,
        issuanceDate: new Date('2023-11-22T17:14:33.000Z'),
        issuerId: 'ISSUER_ID',
        name: 'User',
        postalCode: '12345',
        privacyPolicyAccepted: 'https://media.ascs.digital/terms/ascs_privacy_policy_2020-07-08.pdf#SHA-256',
        streetAddress: 'Teststraße 1',
        updatedAt: new Date(),
        vatId: '',
        uuid: extractUuidFromUrn('urn:uuid:cf1f329d-9c4c-458e-ba0a-a762a296b79c'),
        isActive: true,
      })
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

    await SUT._txn(dependencies)(USER_CREDENTIAL)(tx as any)

    expect(tx.rollback).toHaveBeenCalledWith()
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

      SUT._insertUserTx(transaction)(db as any)(credential)

      expect(transaction).toHaveBeenCalledWith(credential)
      expect(db.transaction).toHaveBeenCalledWith(transaction(credential))
    })
  })
})
