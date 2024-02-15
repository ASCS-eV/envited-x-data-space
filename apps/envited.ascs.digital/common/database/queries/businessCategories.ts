import { businessCategory } from '../schema'
import { DatabaseConnection } from '../types'

export const getBusinessCategories = (db: DatabaseConnection) => async () => db.select().from(businessCategory)
