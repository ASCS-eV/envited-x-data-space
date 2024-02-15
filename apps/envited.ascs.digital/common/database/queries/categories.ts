import { companyCategory } from '../schema'
import { DatabaseConnection } from '../types'

export const getCompanyCategories = (db: DatabaseConnection) => async () => db.select().from(companyCategory)
