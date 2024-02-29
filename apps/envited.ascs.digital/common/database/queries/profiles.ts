import { eq } from 'drizzle-orm'
import { filter, isEmpty, isNil, omit, pick, pipe } from 'ramda'

import { MINIMUM_PROFILE_REQUIREMENTS } from '../../constants'
import { Profile } from '../../types'
import { profile } from '../schema'
import { DatabaseConnection } from '../types'

export const update = (db: DatabaseConnection) => async (data: Profile) =>
  db
    .update(profile)
    .set({ ...omit(['id'])(data), updatedAt: new Date() })
    .where(eq(profile.name, data.name))
    .returning()

export const maybeUpdatePublishedState = (db: DatabaseConnection) => async (data: Profile) => {
  const isPublished = pipe(pick(MINIMUM_PROFILE_REQUIREMENTS), filter(isNil), isEmpty)(data)

  return db.update(profile).set({ isPublished, updatedAt: new Date() }).where(eq(profile.name, data.name)).returning()
}

export const getProfileBySlug = (db: DatabaseConnection) => async (slug: string) =>
  db.query.profile.findFirst({ 
    where: eq(profile.slug, slug),
    with: {
      profilesToBusinessCategories: true,
    },
  })

export const getPublishedProfiles = (db: DatabaseConnection) => async () =>
  db.select().from(profile).where(eq(profile.isPublished, true))
