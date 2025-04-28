import { ExtractTablesWithRelations, and, eq, inArray, sql } from 'drizzle-orm'
import { PgTransaction } from 'drizzle-orm/pg-core'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { isEmpty, prop, propOr } from 'ramda'

import { parseGlobalIdentifier } from '../../globalIdentifiers'
import { log } from '../../logger'
import { Profile } from '../../types'
import { formatError, isTrustAnchor, slugify } from '../../utils'
import * as schema from '../schema'
import {
  addressType,
  credentialType,
  globalIdentifier,
  issuer,
  profile,
  role,
  user,
  usersToCredentialTypes,
  usersToRoles,
} from '../schema'
import { Credential, DatabaseConnection, Issuer, User } from '../types'
import { insertGlobalIdentifierTx } from './globalIdentifiers'

export const deactivateUserById = (db: DatabaseConnection) => async (id: string) =>
  db
    .update(user)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(user.id, id))
    .returning({ updatedId: user.id })

export const activateUserById = (db: DatabaseConnection) => async (id: string) =>
  db
    .update(user)
    .set({ isActive: true, updatedAt: new Date() })
    .where(eq(user.id, id))
    .returning({ updatedId: user.id })

export const getUserById = (db: DatabaseConnection) => async (id: string) =>
  db.query.user.findFirst({
    where: eq(user.id, id),
    with: {
      usersToCredentialTypes: {
        columns: {},
        with: {
          credentialType: {
            columns: {
              name: true,
            },
          },
        },
      },
      urnGlobalIdentifier: true,
      addressGlobalIdentifier: true,
    },
  })

export const getUserRolesById = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(usersToRoles).where(eq(usersToRoles.userId, id))

export const getUserRolesByDid =
  (db: DatabaseConnection) =>
  async ({
    method,
    namespace,
    chainId,
    scopedIdentifier,
  }: {
    method: string
    namespace: string
    chainId: string
    scopedIdentifier: string
  }) =>
    db
      .select()
      .from(globalIdentifier)
      .where(
        and(
          eq(globalIdentifier.method, method),
          eq(globalIdentifier.namespace, namespace),
          eq(globalIdentifier.chainId, chainId),
          eq(globalIdentifier.scopedIdentifier, scopedIdentifier),
        ),
      )
      .leftJoin(user, eq(user.addressGlobalIdentifierId, globalIdentifier.id))
      .leftJoin(usersToRoles, eq(usersToRoles.userId, user.id))

export const getUserByDid =
  (db: DatabaseConnection) =>
  async ({
    method,
    namespace,
    chainId,
    scopedIdentifier,
  }: {
    method: string
    namespace: string
    chainId: string
    scopedIdentifier: string
  }) =>
    db.query.user.findFirst({
      where: (fields, { eq }) =>
        eq(
          fields.addressGlobalIdentifierId,
          db
            .select({ id: globalIdentifier.id })
            .from(globalIdentifier)
            .where(
              and(
                eq(globalIdentifier.method, method),
                eq(globalIdentifier.namespace, namespace),
                eq(globalIdentifier.chainId, chainId),
                eq(globalIdentifier.scopedIdentifier, scopedIdentifier),
              ),
            ),
        ),
      with: {
        urnGlobalIdentifier: true,
        addressGlobalIdentifier: true,
        usersToRoles: true,
        usersToCredentialTypes: {
          columns: {},
          with: {
            credentialType: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    })

export const getUserWithProfileById = (db: DatabaseConnection) => async (id: string) =>
  db.select().from(user).where(eq(user.id, id)).leftJoin(profile, eq(user.name, profile.name))

export const getUserByName = (db: DatabaseConnection) => async (name: string) =>
  db.query.user.findFirst({
    where: eq(user.name, name),
    with: {
      urnGlobalIdentifier: true,
      addressGlobalIdentifier: true,
    },
  })

export const getUserByIssuerId = (db: DatabaseConnection) => async (issuerId: string) =>
  db.query.user.findFirst({
    where: eq(
      user.addressGlobalIdentifierId,
      db
        .select({ id: globalIdentifier.id })
        .from(globalIdentifier)
        .innerJoin(issuer, eq(issuer.globalIdentifierId, globalIdentifier.id))
        .where(eq(issuer.id, issuerId)),
    ),
    with: {
      urnGlobalIdentifier: true,
      addressGlobalIdentifier: true,
      usersToRoles: true,
      usersToCredentialTypes: {
        columns: {},
        with: {
          credentialType: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  })

export const getUsersByIssuerId = (db: DatabaseConnection) => async (issuerId: string) =>
  db.query.user.findMany({
    where: eq(user.issuerId, issuerId),
    with: {
      urnGlobalIdentifier: true,
      addressGlobalIdentifier: true,
      usersToRoles: true,
      usersToCredentialTypes: {
        columns: {},
        with: {
          credentialType: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  })

export const getActiveUsersByIssuerId = (db: DatabaseConnection) => async (issuerId: string) =>
  db.query.user.findMany({
    where: and(eq(user.issuerId, issuerId), eq(user.isActive, true)),
    with: {
      urnGlobalIdentifier: true,
      addressGlobalIdentifier: true,
      usersToRoles: true,
      usersToCredentialTypes: {
        columns: {},
        with: {
          credentialType: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  })

export const addUserToRole =
  (db: DatabaseConnection) =>
  async ({ userId, roleId }: { userId: string; roleId: string }) =>
    db.insert(usersToRoles).values({ userId, roleId }).onConflictDoNothing().returning()

export const removeUserFromRole =
  (db: DatabaseConnection) =>
  async ({ userId, roleId }: { userId: string; roleId: string }) =>
    db
      .delete(usersToRoles)
      .where(and(eq(usersToRoles.userId, userId), eq(usersToRoles.roleId, roleId)))
      .returning()

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
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: issuer.globalIdentifierId,
        set: { globalIdentifierId: newIssuer.globalIdentifierId },
      })
      .returning()

export const insertAddressTypeTx =
  (tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>) =>
  async (type: string) =>
    await tx
      .insert(addressType)
      .values({
        name: type,
        createdAt: new Date(),
        updatedAt: new Date(),
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
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoNothing()
      .returning()

    if (isEmpty(result)) {
      result = await tx.select().from(credentialType).where(eq(credentialType.name, type)).limit(1)
    }

    const credentialTypeId = result[0].id

    return tx.insert(usersToCredentialTypes).values({ userId, credentialTypeId }).onConflictDoNothing().returning()
  }

export const insertCompanyProfileTx =
  (tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>) =>
  async (partialProfile: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>) => {
    return tx
      .insert(profile)
      .values({
        ...partialProfile,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoNothing()
      .returning()
  }

export const _txn =
  ({
    insertAddressTypeTx,
    insertIssuerTx,
    insertUsersToRolesTx,
    insertCredentialTypeTx,
    insertCompanyProfileTx,
    insertGlobalIdentifierTx,
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
        globalIdentifierId: string | null
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
    insertCompanyProfileTx: (
      tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>,
    ) => (partialProfile: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Profile[]>
    insertGlobalIdentifierTx: (
      tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>,
    ) => ({
      method,
      namespace,
      chainId,
      scopedIdentifier,
    }: {
      method: string
      namespace?: string | null
      chainId?: string | null
      scopedIdentifier: string
    }) => Promise<
      {
        id: string
        method: string
        namespace?: string | null
        chainId?: string | null
        scopedIdentifier: string
      }[]
    >
  }) =>
  (credential: Credential) =>
  async (tx: PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>) => {
    try {
      const {
        issuer: credentialIssuer,
        type: credentialTypes,
        issuanceDate,
        expirationDate,
        credentialSubject,
        id: uuid,
      } = credential

      const [addressType] = await insertAddressTypeTx(tx)(credentialSubject.address.type)
      const { id: addressTypeId } = addressType

      if (credentialTypes.includes('AscsMemberCredential')) {
        const [{ id: memberGlobalIdentifierId }] = await insertGlobalIdentifierTx(tx)(
          parseGlobalIdentifier(credentialSubject.id),
        )

        await insertIssuerTx(tx)({
          globalIdentifierId: memberGlobalIdentifierId,
          name: credentialSubject.name,
          url: propOr('', 'url')(credentialSubject),
          type: credentialSubject.type,
        })
      }

      const [{ id: issuerGlobalIdentifierId }] = await insertGlobalIdentifierTx(tx)(
        parseGlobalIdentifier(credentialIssuer),
      )
      const [{ id }] = await insertIssuerTx(tx)({
        globalIdentifierId: issuerGlobalIdentifierId,
        name: '',
        url: '',
        type: '',
      })

      const [{ id: urnGlobalIdentifierId }] = await insertGlobalIdentifierTx(tx)(parseGlobalIdentifier(uuid))
      const [{ id: addressGlobalIdentifierId }] = await insertGlobalIdentifierTx(tx)(
        parseGlobalIdentifier(credentialSubject.id),
      )

      const [newUser] = await tx
        .insert(user)
        .values({
          urnGlobalIdentifierId,
          addressGlobalIdentifierId,
          name: prop('name')(credentialSubject),
          email: propOr('', 'email')(credentialSubject),
          vatId: propOr('', 'vatId')(credentialSubject),
          privacyPolicyAccepted: prop('privacyPolicy')(credentialSubject),
          articlesOfAssociationAccepted: propOr('', 'articlesOfAssociation')(credentialSubject),
          contributionRulesAccepted: propOr('', 'contributionRules')(credentialSubject),
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
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning()

      const roleFilterArray =
        credentialSubject.type === 'AscsMember'
          ? isTrustAnchor(credentialSubject.id)
            ? ['federator', 'principal', 'provider', 'user']
            : ['principal', 'provider', 'user']
          : ['provider', 'user']

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

      await insertCompanyProfileTx(tx)({
        name: credentialSubject.name,
        slug: slugify(credentialSubject.name),
        streetAddress: credentialSubject.address.streetAddress,
        postalCode: credentialSubject.address.postalCode,
        addressLocality: credentialSubject.address.addressLocality,
        addressCountry: credentialSubject.address.addressCountry,
        isPublished: false,
      })

      return newUser
    } catch (error) {
      log.error(formatError(error))
      tx.rollback()
    }
  }

export const txn = _txn({
  insertAddressTypeTx,
  insertIssuerTx,
  insertUsersToRolesTx,
  insertCredentialTypeTx,
  insertCompanyProfileTx,
  insertGlobalIdentifierTx,
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
