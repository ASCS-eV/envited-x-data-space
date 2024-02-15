import { RDSDataClient } from '@aws-sdk/client-rds-data'
import { fromIni } from '@aws-sdk/credential-providers'
import { drizzle as RDSDrizzle } from 'drizzle-orm/aws-data-api/pg'
import { map } from 'ramda'

import { BUSINESS_CATEGORIES } from './data/businessCategories'
import { ROLES } from './data/roles'
import { connectDb } from './database'
import { businessCategory, role } from './schema'
import * as schema from './schema'

const insertRoles = (connection: any) => async (roles: any[]) =>
  connection.insert(role).values(roles).onConflictDoNothing().execute()
const insertBusinessCategories = (connection: any) => async (businessCategories: any[]) =>
  connection.insert(businessCategory).values(businessCategories).onConflictDoNothing().execute()

const seed = async () => {
  try {
    // Insert seeding requirements here
    let connection = null

    if (process.env.ENV === 'development') {
      connection = await connectDb()
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

    const roles = map((role: Record<string, any>) => ({ ...role, createdAt: new Date(), updatedAt: new Date() }))(ROLES)
    await insertRoles(connection)(roles)

    const businessCategories = map((category: Record<string, any>) => ({
      ...category,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))(BUSINESS_CATEGORIES)
    await insertBusinessCategories(connection)(businessCategories)
    return
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(0)
  }
}

seed()
