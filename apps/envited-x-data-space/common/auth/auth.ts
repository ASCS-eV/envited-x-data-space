import { decodeJwt } from 'jose'
import type { NextAuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn as NASignIn, signOut as NASignOut } from 'next-auth/react'
import { equals, has, isEmpty, isNil, pluck, reject } from 'ramda'

import { db } from '../database/queries'
import { FEATURE_FLAGS } from '../featureFlags'
import { parseGlobalIdentifier } from '../globalIdentifiers'
import { httpPost } from '../http'
import { log } from '../logger'
import { assignSingleRole } from '../roles'
import { CredentialType, User } from '../types'
import { Environment } from '../types'
import { extractAddressFromDid, formatError } from '../utils'

export const authOptions: NextAuthOptions = {
  pages: {
    error: '/error',
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in with Your Credentials',
      credentials: {
        pkh: { label: 'Address', type: 'text', placeholder: 'tz...' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return {
            id: '',
            pkh: '',
            role: '',
          }
        }

        const { pkh } = credentials

        try {
          const connection = await db()
          const user = await connection.getUserByDid(parseGlobalIdentifier(pkh))
          const result = await connection.getUserRolesByDid(parseGlobalIdentifier(pkh))
          const userRoles = pluck('usersToRoles', result)

          return {
            name: pkh,
            id: user.id,
            did: pkh,
            role: assignSingleRole(userRoles),
          }
        } catch (e) {
          log.error(e)
          return {
            name: pkh,
            id: '',
            did: pkh,
            role: '',
          }
        }
      },
    }),
    {
      id: 'siwt',
      name: 'siwt',
      type: 'oauth',
      version: '2.0',
      idToken: true,
      issuer: process.env.ISSUER_URL,
      authorization: {
        url: process.env.AUTHORIZATION_URL,
        params: {
          scope: 'openid',
        },
      },
      token: process.env.TOKEN_URL,
      jwks_endpoint: process.env.JWKS_ENDPOINT,
      clientId: process.env.OIDC_CLIENT_ID,
      clientSecret: process.env.OIDC_CLIENT_SECRET,
      profile: async profile => {
        const credential = decodeJwt(profile.credential as string)
        return {
          id: (credential.vc as any).credentialSubject.id,
          did: (credential.vc as any).credentialSubject.id,
        }
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async signIn({ profile }) {
      try {
        if (FEATURE_FLAGS[(process.env.ENV as Environment) || 'development'].oidc) {
          log.info('Verifying credential')

          if (!has('credential')(profile)) {
            log.error('Credential not found')
            return '/error?error=CREDENTIAL_NOT_FOUND'
          }
          log.info('Credential found')
          const credential = decodeJwt(profile.credential as string)
          log.info('Credential decoded')
          const {
            id,
            issuer: { id: issuer },
            credentialSubject: { id: credentialSubjectId, type: credentialSubjectType },
          } = credential.vc as any
          log.info('Credential parsed', id, issuer, credentialSubjectId, credentialSubjectType)
          if (FEATURE_FLAGS[(process.env.ENV as Environment) || 'development'].contract) {
            log.info('Starting revocation registry check')
            log.info('credential', id, credentialSubjectId, issuer, credentialSubjectType)
            const revocationCheck = await checkRevocationRegistry(
              id,
              credentialSubjectId,
              issuer,
              credentialSubjectType,
            )

            if (!revocationCheck) {
              log.error('Failed revocation check')
              return '/error?error=STATUS_NOT_ACTIVE'
            }
          }

          const connection = await db()

          if (equals(CredentialType.AscsUser)(credentialSubjectType as CredentialType)) {
            const principal = await connection.getUserByDid(parseGlobalIdentifier(issuer))
            log.info('Principal found', principal)
            log.info('User credential, checking principal credentials')

            if (isEmpty(principal)) {
              // Principal not found
              log.error('Principal not found or active')
              return '/error?error=PRINCIPAL_NOT_FOUND'
            }

            if (!principal.isActive) {
              log.info('Principal exists, but the account is deactivated')
              return '/error?error=PRINCIPAL_INACTIVE'
            }
          }

          const existingUser = (await connection.getUserByDid(parseGlobalIdentifier(credentialSubjectId))) as User
          log.info('User found', existingUser)
          if (!isNil(existingUser)) {
            // User already exists
            if (!existingUser.isActive) {
              log.info('User exists, but the account is deactivated')
              return '/error?error=USER_INACTIVE'
            }

            log.info('User exists, completing signin')
            return true
          }

          log.info('Inserting user')
          await connection.insertUserTx(credential.vc)
        }
        log.info('Completing signin')
        return true
      } catch (error: unknown) {
        log.error(formatError(error))
        return false
      }
    },
    async jwt({ token, user, account, profile }) {
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.user = user
      }

      if (profile && profile.credential) {
        const credential = decodeJwt(profile.credential as string)
        const connection = await db()

        const user = await connection.getUserByDid(parseGlobalIdentifier((credential.vc as any).credentialSubject.id))
        const result = await connection.getUserRolesByDid(
          parseGlobalIdentifier((credential.vc as any).credentialSubject.id),
        )
        const userRoles = pluck('usersToRoles', result)
        token.user.role = assignSingleRole(userRoles)
        token.user.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.name = null
        session.user.did = token.user.did
        session.user.role = token.user.role
        session.user.id = token.user.id
        session.user.email = null
        session.user.image = null
      }
      return reject(isNil)(session as any) as unknown as Session
    },
  },
}

export const _signIn =
  (NASignIn: any) =>
  ({ pkh }: { pkh: string }) => {
    if (FEATURE_FLAGS[(process.env.NEXT_PUBLIC_ENV as Environment) || 'development'].oidc) {
      return NASignIn('siwt', {
        pkh,
        callbackUrl: '/dashboard',
      })
    }

    return NASignIn('credentials', {
      pkh,
      callbackUrl: '/dashboard',
    })
  }

export const signIn = _signIn(NASignIn)

export const signOut = () =>
  NASignOut({
    callbackUrl: '/',
  })

export const checkRevocationRegistry = async (id: string, pkh: string, issuer: string, type: string) => {
  const isVerified = await httpPost<{
    success: boolean
  }>(
    `${process.env.OIDC_SERVER_URL!}/verify-user`,
    {
      id,
      pkh: extractAddressFromDid(pkh),
      issuer: extractAddressFromDid(issuer),
      type,
    },
    {
      'Content-Type': 'application/json',
    },
  )

  if (!isVerified) {
    throw new Error('User verification failed')
  }

  return isVerified
}
