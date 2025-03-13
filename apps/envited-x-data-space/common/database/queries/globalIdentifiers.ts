import { and, eq, ExtractTablesWithRelations } from 'drizzle-orm'

import { globalIdentifier } from '../schema'
import * as schema from '../schema'
import { DatabaseConnection } from '../types'
import { PgTransaction } from 'drizzle-orm/pg-core';
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';
import { AwsDataApiPgQueryResultHKT } from 'drizzle-orm/aws-data-api/pg';

export const insertGlobalIdentifier = (db: DatabaseConnection) => 
  async ({ 
    method, 
    namespace, 
    chainId, 
    nss 
  }: { 
    method: string; 
    namespace?: string; 
    chainId?: string; 
    nss: string 
  }) => db
      .insert(globalIdentifier)
      .values({
        method,
        namespace,
        chainId,
        nss,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
  
export const insertGlobalIdentifierTx = (tx: PgTransaction<AwsDataApiPgQueryResultHKT | PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>) =>
  async ({ 
    method, 
    namespace, 
    chainId, 
    nss,
    metadata = null
  }: { 
    method: string; 
    namespace?: string | null; 
    chainId?: string | null; 
    nss: string,
    metadata?: string | null,
  }) => tx
      .insert(globalIdentifier)
      .values({
        method,
        namespace,
        chainId,
        nss,
        metadata,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [globalIdentifier.method, globalIdentifier.namespace, globalIdentifier.chainId, globalIdentifier.nss],
        set: {
          metadata,
        },
      })
      .returning()

export const getGlobalIdentifierById = (db: DatabaseConnection) => 
  async (id: string) => {
    return db
      .select()
      .from(globalIdentifier)
      .where(eq(globalIdentifier.id, id))
      .limit(1)
      .then(results => results[0] || null)
  }

export const getGlobalIdentifierByFullResourceName = (db: DatabaseConnection) => 
  async ({ method, namespace, chainId, nss }: { method: string, namespace: string, chainId: string, nss: string }) => 
    db.query.globalIdentifier.findFirst({ where: and(eq(globalIdentifier.method, method), eq(globalIdentifier.namespace, namespace), eq(globalIdentifier.chainId, chainId), eq(globalIdentifier.nss, nss)) });
