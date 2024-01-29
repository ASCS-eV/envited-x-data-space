import { RDSDataClient } from '@aws-sdk/client-rds-data'
import { fromIni } from '@aws-sdk/credential-providers'
import { drizzle as RDSDrizzle } from 'drizzle-orm/aws-data-api/pg'
import { map } from 'ramda'

import { COMPANY_CATEGORIES } from './data/companyCategories'
import { ROLES } from './data/roles'
import { connectDb } from './database'
import { companyCategory, role } from './schema'
import * as schema from './schema'

const insertRoles = (connection: any) => async (roles: any[]) =>
  connection.insert(role).values(roles).onConflictDoNothing().execute()
const insertCompanyCategories = (connection: any) => async (companyCategories: any[]) =>
  connection.insert(companyCategory).values(companyCategories).onConflictDoNothing().execute()

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

    const companyCategories = map((category: Record<string, any>) => ({
      ...category,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))(COMPANY_CATEGORIES)
    await insertCompanyCategories(connection)(companyCategories)
    return
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(0)
  }
}

seed()
