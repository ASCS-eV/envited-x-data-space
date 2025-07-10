import { ExtractTablesWithRelations, and, desc, eq, inArray } from 'drizzle-orm'
import { AwsDataApiPgDatabase, AwsDataApiPgQueryResultHKT } from 'drizzle-orm/aws-data-api/pg'
import { PgQueryResultHKT, PgTransaction } from 'drizzle-orm/pg-core'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import { insertGlobalIdentifierTx } from '../common/database/queries/globalIdentifiers'
import * as schema from '../common/database/schema'
import { parseGlobalIdentifier } from '../common/globalIdentifiers'
import { AssetStatus } from '../common/types'

export type DatabaseConnection = PostgresJsDatabase<typeof schema> | AwsDataApiPgDatabase<typeof schema>

export const getTokenByTokenId =
  ({ database }: { database: DatabaseConnection }) =>
  async ({ contractGlobalIdentifierId, tokenId }: { tokenId: number; contractGlobalIdentifierId: string }) =>
    database
      .select()
      .from(schema.token)
      .where(
        and(eq(schema.token.tokenId, tokenId), eq(schema.token.contractGlobalIdentifierId, contractGlobalIdentifierId)),
      )

export const getTokenTags =
  (
    tx: PgTransaction<
      AwsDataApiPgQueryResultHKT | PgQueryResultHKT,
      typeof schema,
      ExtractTablesWithRelations<typeof schema>
    >,
  ) =>
  async (tags: string[]) => {
    return tx.select().from(schema.tokenTag).where(inArray(schema.tokenTag.name, tags))
  }

export const insertTokenTx =
  (
    tx: PgTransaction<
      AwsDataApiPgQueryResultHKT | PgQueryResultHKT,
      typeof schema,
      ExtractTablesWithRelations<typeof schema>
    >,
  ) =>
  async ({
    operationGlobalIdentifierId,
    contractGlobalIdentifierId,
    minterGlobalIdentifierId,
    webGlobalIdentifierId,
    tokenId,
    name,
    description,
    creators,
    publishers,
    date,
    type,
    rights,
    rightsUri,
    language,
    artifactUri,
    identifier,
    externalUri,
    displayUri,
    tokenMetadata,
    domainMetadata,
    manifest,
  }: {
    operationGlobalIdentifierId: string
    contractGlobalIdentifierId: string
    minterGlobalIdentifierId: string
    webGlobalIdentifierId: string
    tokenId: number
    name: string
    description: string
    creators: string
    publishers: string
    date: Date
    type: string
    rights: string
    rightsUri: string
    language: string
    artifactUri: string
    identifier: string
    externalUri: string
    displayUri: string
    tokenMetadata: any
    domainMetadata: any
    manifest: any
  }) =>
    tx
      .insert(schema.token)
      .values({
        operationGlobalIdentifierId,
        contractGlobalIdentifierId,
        minterGlobalIdentifierId,
        webGlobalIdentifierId,
        tokenId,
        name,
        description,
        creators,
        publishers,
        date,
        type,
        rights,
        rightsUri,
        language,
        artifactUri,
        identifier,
        externalUri,
        displayUri,
        tokenMetadata,
        domainMetadata,
        manifest,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

export const insertTokenTagTx =
  (
    tx: PgTransaction<
      AwsDataApiPgQueryResultHKT | PgQueryResultHKT,
      typeof schema,
      ExtractTablesWithRelations<typeof schema>
    >,
  ) =>
  (name: string) =>
    tx.insert(schema.tokenTag).values({ name }).onConflictDoNothing({ target: schema.tokenTag.name }).returning()

export const insertTokensToTokenTagsTx =
  (
    tx: PgTransaction<
      AwsDataApiPgQueryResultHKT | PgQueryResultHKT,
      typeof schema,
      ExtractTablesWithRelations<typeof schema>
    >,
  ) =>
  (tokenId: string, tagId: number) =>
    tx.insert(schema.tokensToTokenTags).values({ tokenId, tagId }).returning()

export const insertTokenAttributeTx =
  (
    tx: PgTransaction<
      AwsDataApiPgQueryResultHKT | PgQueryResultHKT,
      typeof schema,
      ExtractTablesWithRelations<typeof schema>
    >,
  ) =>
  (tokenId: string, name: string, value: string) =>
    tx.insert(schema.tokenAttributes).values({ tokenId, name, value }).returning()

export const insertToken =
  ({ database }: { database: DatabaseConnection }) =>
  (token: any) =>
    database.transaction(async tx => {
      try {
        const {
          hash,
          contract,
          minter,
          webGlobalIdentifier,
          tokenId,
          name,
          description,
          creators,
          publishers,
          date,
          type,
          rights,
          rightsUri,
          language,
          artifactUri,
          identifier,
          externalUri,
          displayUri,
          tokenMetadata,
          domainMetadata,
          manifest,
          attributes,
          tags,
        } = token
        console.log('HASH', hash)
        console.log('contract', contract)
        console.log('minter', minter)
        console.log('webglobalidentifier', webGlobalIdentifier)
        const [operationGuid] = await insertGlobalIdentifierTx(tx)(parseGlobalIdentifier(hash))
        console.log(operationGuid)
        const [contractGuid] = await insertGlobalIdentifierTx(tx)(parseGlobalIdentifier(contract))
        console.log(contractGuid)
        const [minterGuid] = await insertGlobalIdentifierTx(tx)(parseGlobalIdentifier(minter))
        console.log(minterGuid)
        const [webGuid] = await insertGlobalIdentifierTx(tx)(parseGlobalIdentifier(webGlobalIdentifier))
        console.log(webGuid)
        const [insertedToken] = await insertTokenTx(tx)({
          operationGlobalIdentifierId: operationGuid.id,
          contractGlobalIdentifierId: contractGuid.id,
          minterGlobalIdentifierId: minterGuid.id,
          webGlobalIdentifierId: webGuid.id,
          tokenId,
          name,
          description,
          creators,
          publishers,
          date,
          type,
          rights,
          rightsUri,
          language,
          artifactUri,
          identifier,
          externalUri,
          displayUri,
          tokenMetadata,
          domainMetadata,
          manifest,
        })

        // RDS Data api does not support concurrent transactions so we need to insert tags and attributes sequentially
        for (let i = 0; i < tags.length; i++) {
          await insertTokenTagTx(tx)(tags[i])
        }
        const tokenTags = await getTokenTags(tx)(tags)
        for (let i = 0; i < tokenTags.length; i++) {
          await insertTokensToTokenTagsTx(tx)(insertedToken.id, tokenTags[i].id)
        }
        for (let i = 0; i < attributes.length; i++) {
          await insertTokenAttributeTx(tx)(insertedToken.id, attributes[i].name, attributes[i].value)
        }

        return insertedToken
      } catch (error) {
        console.log(error)
        tx.rollback()
      }
    })

export const getAssetByCID =
  ({ database: db }: { database: DatabaseConnection }) =>
  async (cid: string) =>
    db.select().from(schema.asset).where(eq(schema.asset.cid, cid)).orderBy(desc(schema.asset.createdAt))

export const updateAsset =
  ({ database: db }: { database: DatabaseConnection }) =>
  async ({ id, tokenId }: { id: string; tokenId: string }) =>
    db
      .update(schema.asset)
      .set({ tokenId, status: AssetStatus.minted, updatedAt: new Date() })
      .where(eq(schema.asset.id, id))
      .returning()

export const getGlobalIdentifierByFullResourceName =
  ({ database: db }: { database: DatabaseConnection }) =>
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
    db.query.globalIdentifier.findFirst({
      where: and(
        eq(schema.globalIdentifier.method, method),
        eq(schema.globalIdentifier.namespace, namespace),
        eq(schema.globalIdentifier.chainId, chainId),
        eq(schema.globalIdentifier.scopedIdentifier, scopedIdentifier),
      ),
    })

export const insertGlobalIdentifier =
  ({ database: db }: { database: DatabaseConnection }) =>
  async ({
    method,
    namespace,
    chainId,
    fqdn,
    scopedIdentifier,
  }: {
    method: string
    namespace?: string | null
    chainId?: string | null
    fqdn?: string | null
    scopedIdentifier: string
  }) =>
    db.insert(schema.globalIdentifier).values({
      method,
      namespace,
      chainId,
      fqdn,
      scopedIdentifier,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
