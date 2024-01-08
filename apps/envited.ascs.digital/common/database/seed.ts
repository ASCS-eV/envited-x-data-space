import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import { ROLES } from './data/roles'
import { connectDb } from './database'
import { role } from './schema'

const insertRoles = (connection: PostgresJsDatabase) => async (roles: any[]) =>
  connection.insert(role).values(roles).execute()

const seed = async () => {
  try {
    // Insert seeding requirements here
    const connection = await connectDb()
    await insertRoles(connection)(ROLES)
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(0)
  }
}

seed()
