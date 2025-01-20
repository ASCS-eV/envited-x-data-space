import { sql } from 'drizzle-orm'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import * as schema from '../../schema'

export const fetchTables = (db: PostgresJsDatabase<typeof schema>) => async () =>
  db.execute(sql`select * from information_schema.tables;`)
