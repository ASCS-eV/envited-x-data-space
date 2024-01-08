import { sql } from 'drizzle-orm'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

export const fetchTables = (db: PostgresJsDatabase) => async () =>
  db.execute(sql`select * from information_schema.tables;`)
