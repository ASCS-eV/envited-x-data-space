import { ExtractTablesWithRelations, and, eq, inArray } from 'drizzle-orm'
import { AwsDataApiPgDatabase, AwsDataApiPgQueryResultHKT } from 'drizzle-orm/aws-data-api/pg'
import { PgQueryResultHKT, PgTransaction } from 'drizzle-orm/pg-core'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import * as schema from '../common/database/schema'

export type DatabaseConnection = PostgresJsDatabase<typeof schema> | AwsDataApiPgDatabase<typeof schema>

export const getTokenByTokenId =
  ({ database }: { database: DatabaseConnection }) =>
  async ({ contract, tokenId }: { tokenId: number; contract: string }) =>
    database
      .select()
      .from(schema.token)
      .where(and(eq(schema.token.tokenId, tokenId), eq(schema.token.contract, contract)))

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
    hash,
    contract,
    minter,
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
  }: {
    hash: string
    contract: string
    minter: string
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
  }) =>
    tx
      .insert(schema.token)
      .values({
        hash,
        contract,
        minter,
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
        createdAt: new Date(),
        modifiedAt: new Date(),
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
          attributes,
          tags,
        } = token

        const [insertedToken] = await insertTokenTx(tx)({
          hash,
          contract,
          minter,
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

        return true
      } catch (error) {
        console.log(error)
        tx.rollback()
      }
    })
