import { ExtractTablesWithRelations, eq, inArray } from 'drizzle-orm'
import { PgTransaction } from 'drizzle-orm/pg-core'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { isEmpty, prop, propOr } from 'ramda'

import * as schema from '../schema'
import { addressType, credentialType, issuer, role, user, usersToCredentialTypes, usersToRoles } from '../schema'
import { Credential, DatabaseConnection, Issuer, User } from '../types'

export const getUserById = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(user).where(eq(user.id, id))

export const insertUsersToRolesTx =
  (tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>) =>
  async ({ userId, roleId }: { userId: string; roleId: string }) =>
    await tx.insert(usersToRoles).values({ userId, roleId })

export const insertIssuerTx =
  (tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>) =>
  async (newIssuer: Issuer) =>
    await tx
      .insert(issuer)
      .values({
        ...newIssuer,
      })
      .onConflictDoUpdate({ target: issuer.id, set: { id: newIssuer.id } })
      .returning()

export const insertAddressTypeTx =
  (tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>) =>
  async (type: string) =>
    await tx
      .insert(addressType)
      .values({
        name: type,
      })
      .onConflictDoUpdate({ target: addressType.name, set: { name: type } })
      .returning()

export const insertCredentialTypeTx =
  (tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>) =>
  async ({ userId, type }: { userId: string; type: string }) => {
    let result = await tx
      .insert(credentialType)
      .values({
        name: type,
      })
      .onConflictDoNothing()
      .returning()

    if (isEmpty(result)) {
      result = await tx.select().from(credentialType).where(eq(credentialType.name, type)).limit(1)
    }

    const credentialTypeId = result[0].id

    return tx.insert(usersToCredentialTypes).values({ userId, credentialTypeId }).onConflictDoNothing().returning()
  }

export const _txn =
  ({
    insertAddressTypeTx,
    insertIssuerTx,
    insertUsersToRolesTx,
    insertCredentialTypeTx,
  }: {
    insertAddressTypeTx: (
      tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>,
    ) => (type: string) => Promise<
      {
        id: string
        name: string | null
        description: string | null
      }[]
    >
    insertIssuerTx: (
      tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>,
    ) => (newIssuer: Issuer) => Promise<
      {
        id: string
        name: string | null
        url: string | null
        type: string | null
      }[]
    >
    insertUsersToRolesTx: (
      tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>,
    ) => ({ userId, roleId }: { userId: string; roleId: string }) => Promise<postgres.RowList<never[]>>
    insertCredentialTypeTx: (
      tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>,
    ) => ({ userId, type }: { userId: string; type: string }) => Promise<
      {
        userId: string
        credentialTypeId: string
      }[]
    >
  }) =>
  (credential: Credential) =>
  async (tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>) => {
    try {
      const { issuer: newIssuer, type: credentialTypes, issuanceDate, expirationDate, credentialSubject } = credential

      const [addressType] = await insertAddressTypeTx(tx)(credentialSubject.address.type)
      const { id: addressTypeId } = addressType

      const [issuer] = await insertIssuerTx(tx)(newIssuer)
      const { id } = issuer

      const [newUser] = await tx
        .insert(user)
        .values({
          id: prop('id')(credentialSubject),
          name: prop('name')(credentialSubject),
          email: propOr('email', '')(credentialSubject),
          vatId: propOr('vatId', '')(credentialSubject),
          privacyPolicyAccepted: prop('privacyPolicy')(credentialSubject),
          articlesOfAssociationAccepted: propOr('articlesOfAssociation', '')(credentialSubject),
          contributionRulesAccepted: propOr('contributionRules', '')(credentialSubject),
          isAscsMember: prop('isAscsMember')(credentialSubject),
          isEnvitedMember: prop('isEnvitedMember')(credentialSubject),
          addressTypeId,
          streetAddress: credentialSubject.address.streetAddress,
          postalCode: credentialSubject.address.postalCode,
          addressLocality: credentialSubject.address.addressLocality,
          addressCountry: credentialSubject.address.addressCountry,
          issuerId: id,
          issuanceDate: new Date(issuanceDate),
          expirationDate: new Date(expirationDate),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning()

      const roleFilterArray =
        credentialSubject.type === 'AscsMember' ? ['principal', 'provider', 'user'] : ['provider', 'user']

      const roles = await tx.select().from(role).where(inArray(role.id, roleFilterArray))

      const insertUsersToRolesPromises = roles.map(({ id }: { id: string }) =>
        insertUsersToRolesTx(tx)({
          userId: newUser.id,
          roleId: id,
        }),
      )

      await Promise.all(insertUsersToRolesPromises)

      const insertCredentialTypeTxPromises = credentialTypes.map((type: string) =>
        insertCredentialTypeTx(tx)({
          userId: newUser.id,
          type,
        }),
      )

      await Promise.all(insertCredentialTypeTxPromises)

      return newUser
    } catch (error) {
      console.log(error)
      tx.rollback()
    }
  }

export const txn = _txn({
  insertAddressTypeTx,
  insertIssuerTx,
  insertUsersToRolesTx,
  insertCredentialTypeTx,
})

export const _insertUserTx =
  (
    transaction: (
      credential: Credential,
    ) => (
      tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>,
    ) => Promise<User | any>,
  ) =>
  (db: PostgresJsDatabase<typeof schema>) =>
  (credential: Credential) =>
    db.transaction(transaction(credential))

export const insertUserTx = _insertUserTx(txn)
