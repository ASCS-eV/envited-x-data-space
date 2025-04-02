import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn as NASignIn, signOut as NASignOut } from 'next-auth/react'
import { equals, has, isEmpty, isNil, omit, pluck, prop } from 'ramda'

import { db } from '../database/queries'
import { Credential } from '../database/types'
import { FEATURE_FLAGS } from '../featureFlags'
import { parseGlobalIdentifier } from '../globalIdentifiers'
import { log } from '../logger'
import { assignSingleRole } from '../roles'
import { CredentialType, User } from '../types'
import { Environment } from '../types'
import { extractAddressFromDid } from '../utils'

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
        console.log('CREDENTIALS', credentials)
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
          console.log(e)
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
        return {
          id: profile.sub,
          pkh: profile.sub,
        }
      },
    },
  ],
  secret: process.env.SECRET,
  debug: true,
  callbacks: {
    async signIn({ profile }) {
      log.info('SIGNIN IN')
      log.info('profile', profile)
      try {
        if (FEATURE_FLAGS[(process.env.ENV as Environment) || 'development'].oidc) {
          log.info('Verifying credential')
          log.info(profile)
          if (!has('credential')(profile)) {
            log.error('Credential not found')
            return '/error?error=CREDENTIAL_NOT_FOUND'
          }

          const credential = omit(['proof'])(prop('credential')(profile) as Partial<Record<'proof', any>>) as Credential
          const {
            id,
            issuer,
            credentialSubject: { id: credentialSubjectId, type: credentialSubjectType },
          } = credential

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
          await connection.insertUserTx(credential)
        }
        log.info('Completing signin')
        return true
      } catch (error: unknown) {
        log.error(error)
        return false
      }
    },
    async jwt({ token, user, account, profile }) {
      if (account?.access_token) {
        log.info('Adding access token to JWT')
        token.accessToken = account.access_token
      }
      log.info('user', user)
      log.info('account', account)
      if (user) {
        token.user = user
      }
      console.log('profile', profile)
      if (profile && profile.sub) {
        const { sub } = profile
        const connection = await db()

        const user = await connection.getUserByDid(parseGlobalIdentifier(sub))
        log.info('user', user)
        const result = await connection.getUserRolesByDid(parseGlobalIdentifier(sub))
        log.info('result', result)
        const userRoles = pluck('usersToRoles', result)
        log.info('userRoles', userRoles)
        log.info('Adding user role to JWT: ', assignSingleRole(userRoles))
        token.user.role = assignSingleRole(userRoles)
        token.user.id = user.id
      }
      console.log('token', token)
      return token
    },
    async session({ session, token }) {
      log.info('Building session')
      if (session?.user) {
        session.user.did = token.user.did
        session.user.role = token.user.role
        session.user.id = token.user.id || ''
        session.user.email = undefined
        session.user.image = undefined
        session.user.name = token?.user?.did
      }
      log.info('Session: ', session)
      return session
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
  const response = await fetch(`${process.env.OIDC_SERVER_URL!}/verify-user`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      pkh: extractAddressFromDid(pkh),
      issuer: extractAddressFromDid(issuer),
      type,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }

  return response.json()
}
