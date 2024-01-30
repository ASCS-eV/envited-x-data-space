import { eq } from 'drizzle-orm'
import { filter, isEmpty, isNil, omit, pick, pipe } from 'ramda'

import { Profile } from '../../types'
import { profile } from '../schema'
import { DatabaseConnection } from '../types'
import { MINIMUM_PROFILE_REQUIREMENTS } from '../../constants'

export const update = (db: DatabaseConnection) => async (data: Profile) =>
  db
    .update(profile)
    .set({ ... omit(['id'])(data), updatedAt: new Date() })
    .where(eq(profile.name, data.name))
    .returning()

export const maybeUpdatePublishedState = (db: DatabaseConnection) => async (data: Profile) => {
  const isPublished = pipe(pick(MINIMUM_PROFILE_REQUIREMENTS), filter(isNil), isEmpty)(data)
  
  return db
    .update(profile)
    .set({ isPublished, updatedAt: new Date()})
    .where(eq(profile.name, data.name))
    .returning()
}
