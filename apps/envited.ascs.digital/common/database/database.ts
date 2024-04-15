import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { equals } from 'ramda'

import { ERRORS } from '../constants'
import { getSecret } from '../secretsManager'
import * as schema from './schema'

export const initDb =
  ({
    drizzle,
    postgres,
    getSecret,
  }: {
    drizzle: (client: postgres.Sql, config: any) => PostgresJsDatabase<typeof schema>
    postgres: (options: postgres.Options<any>) => postgres.Sql
    getSecret: (secretId: string) => Promise<Record<string, any>>
  }): (() => Promise<PostgresJsDatabase<typeof schema>>) =>
  async () => {
    let config = {
      host: process.env.POSTGRES_HOST || 'localhost', // Postgres ip address[s] or domain name[s]
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10), // Postgres server port[s]
      database: process.env.POSTGRES_DATABASE_NAME!, // Name of database to connect to
      username: process.env.POSTGRES_DATABASE_USER!, // Username of database user
      password: process.env.POSTGRES_DATABASE_PASSWORD!, // Password of database user
      max: 1,
    }
    console.log('ENV', process.env.ENV)
    if (!equals(process.env.ENV, 'development')) {
      try {
        console.log('SECERT', process.env.RDS_SECRET_ARN)
        const { password, dbname, port, host, username } = await getSecret(process.env.RDS_SECRET_ARN!)
        console.log('SECRET', { password, dbname, port, host, username })
        config = {
          host,
          port,
          database: dbname,
          username,
          password,
          max: 1,
        }
      } catch (error) {
        console.log(ERRORS.CANNOT_CONNECT_TO_DATABASE, error)
      }
    }

    return drizzle(postgres(config), { schema })
  }

export const connectDb = initDb({ drizzle, postgres, getSecret })
