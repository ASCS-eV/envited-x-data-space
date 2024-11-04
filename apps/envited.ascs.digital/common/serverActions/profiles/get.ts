'use server'

import { find, isEmpty, isNil, omit, pathEq } from 'ramda'

import { getServerSession } from '../../auth'
import { RESTRICTED_PROFILE_FIELDS } from '../../constants'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { hasCredentialType, isOwnProfile, isPrincipalContact, isUsersCompanyProfile } from '../../guards'
import { Log, log } from '../../logger'
import { Session } from '../../types'
import { badRequestError, formatError, internalServerErrorError, notFoundError, unauthorizedError } from '../../utils'

export const _getProfileBySlug =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async (slug: string) => {
    try {
      if (isNil(slug) || isEmpty(slug)) {
        throw badRequestError({ resource: 'profiles', resourceId: slug, message: 'Missing slug' })
      }

      const session = await getServerSession()
      const connection = await db()
      const profile = await connection.getProfileBySlug(slug)

      if (isNil(profile) || isEmpty(profile)) {
        throw notFoundError({ resource: 'profiles', resourceId: slug, userId: session?.user.id })
      }

      if (!isNil(session)) {
        const user = await connection.getUserById(session.user.id)

        if (isOwnProfile(user)(profile)) {
          return profile
        }

        const [principal] = await connection.getUserByIssuerId(user.issuerId)
        if (isUsersCompanyProfile(principal)(profile)) {
          return profile
        }
      }

      return omit(RESTRICTED_PROFILE_FIELDS)(profile)
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getProfileBySlug = _getProfileBySlug({ db, getServerSession, log })

export const _getPublishedProfiles =
  ({ db, log }: { db: Database; log: Log }) =>
  async () => {
    try {
      const connection = await db()
      const profiles = await connection.getPublishedProfiles()

      return profiles
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getPublishedProfiles = _getPublishedProfiles({ db, log })

export const _getProfile =
  ({ db, getServerSession, log }: { db: Database; getServerSession: () => Promise<Session | null>; log: Log }) =>
  async () => {
    try {
      const session = await getServerSession()
      if (isNil(session)) {
        throw unauthorizedError({ resource: 'profiles' })
      }

      const connection = await db()
      const user = await connection.getUserById(session.user.id)
      const [issuer] = await connection.getIssuerById(user.issuerId)
      let profileName = issuer.name
      if (hasCredentialType('AscsUserCredential')(user.usersToCredentialTypes)) {
        const principal = await connection.getUserById(user.issuerId)
        profileName = principal.name
      }

      if (hasCredentialType('AscsMemberCredential')(user.usersToCredentialTypes)) {
        profileName = user.name
      }

      const profile = await connection.getProfileByName(profileName)

      if (isNil(profile) || isEmpty(profile)) {
        throw notFoundError({ resource: 'profiles', resourceId: issuer?.name, userId: session?.user.id })
      }

      if (isOwnProfile(user)(profile) || isPrincipalContact(user)(profile) || isUsersCompanyProfile(issuer)(profile)) {
        return profile
      }

      return omit(RESTRICTED_PROFILE_FIELDS)(profile)
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getProfile = _getProfile({ db, getServerSession, log })
