import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { migrate as PGMigrate } from 'drizzle-orm/postgres-js/migrator'

import { connectDb } from './database'

const runMigration = async () => {
  const db = await connectDb()
  try {
    await PGMigrate(db as PostgresJsDatabase, { migrationsFolder: `../drizzle/${process.env.ENV}` })
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(0)
  }
}

runMigration()
