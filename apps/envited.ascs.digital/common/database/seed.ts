import { RDSDataClient } from '@aws-sdk/client-rds-data'
import { fromIni } from '@aws-sdk/credential-providers'
import { drizzle as RDSDrizzle } from 'drizzle-orm/aws-data-api/pg'

import { ROLES } from './data/roles'
import { connectDb } from './database'
import { role } from './schema'
import * as schema from './schema'

const insertRoles = (connection: any) => async (roles: any[]) =>
  connection.insert(role).values(roles).execute()

const seed = async () => {
  try {
    // Insert seeding requirements here
    let connection = null
    
    if (process.env.ENV === 'development') {
      connection = await connectDb()
      return
    } else {
      const rdsClient = new RDSDataClient({
        credentials: fromIni({ profile: process.env.AWS_PROFILE || '' }),
        region: 'eu-central-1',
      })
    
      connection = RDSDrizzle(rdsClient, {
        database: process.env.RDS_DB_NAME || '',
        secretArn: process.env.RDS_SECRET_ARN || '',
        resourceArn: process.env.RDS_RESOURCE_ARN || '',
        schema,
      })
    }
    await insertRoles(connection)(ROLES)
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(0)
  }
}

seed()
