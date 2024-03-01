import { eq } from 'drizzle-orm'

import { businessCategory, profilesToBusinessCategories } from '../schema'
import { DatabaseConnection } from '../types'

export const getBusinessCategories = (db: DatabaseConnection) => async () => db.select().from(businessCategory)

export const getBusinessCategoriesByProfileId = (db: DatabaseConnection) => async (profileId: string) =>
  db
    .select({ businessCategoryId: profilesToBusinessCategories.businessCategoryId })
    .from(profilesToBusinessCategories)
    .where(eq(profilesToBusinessCategories.profileId, profileId))

export const insertBusinessCategoryByProfileId =
  (db: DatabaseConnection) => async (profileId: string, businessCategoryId: string) =>
    db.insert(profilesToBusinessCategories).values({
      profileId,
      businessCategoryId,
    })

export const deleteBusinessCategoriesByProfileId = (db: DatabaseConnection) => async (profileId: string) =>
  db.delete(profilesToBusinessCategories).where(eq(profilesToBusinessCategories.profileId, profileId))
