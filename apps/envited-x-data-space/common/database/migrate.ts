import { RDSDataClient } from '@aws-sdk/client-rds-data'
import { fromIni } from '@aws-sdk/credential-providers'
import { drizzle as RDSDrizzle } from 'drizzle-orm/aws-data-api/pg'
import { migrate as AWSDataApiMigrate } from 'drizzle-orm/aws-data-api/pg/migrator'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { migrate as PGMigrate } from 'drizzle-orm/postgres-js/migrator'

import { connectDb } from './database'
import * as schema from './schema'

const runMigration = async () => {
  try {
    if (process.env.ENV === 'development') {
      const db = await connectDb()
      await PGMigrate(db as PostgresJsDatabase<typeof schema>, { migrationsFolder: `../drizzle/${process.env.ENV}` })
      return
    }

    const rdsClient = new RDSDataClient({
      credentials: fromIni({ profile: process.env.AWS_PROFILE || '' }),
      region: 'eu-central-1',
    })

    const db = RDSDrizzle(rdsClient, {
      database: process.env.RDS_DB_NAME || '',
      secretArn: process.env.RDS_SECRET_ARN || '',
      resourceArn: process.env.RDS_RESOURCE_ARN || '',
      schema,
    })

    await AWSDataApiMigrate(db, { migrationsFolder: `../drizzle/${process.env.ENV}` })
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(0)
  }
}

runMigration()
