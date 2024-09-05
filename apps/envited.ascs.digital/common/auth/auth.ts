import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn as NASignIn, signOut as NASignOut } from 'next-auth/react'
import { equals, has, isEmpty, omit, prop } from 'ramda'
import { match } from 'ts-pattern'

import { db } from '../database/queries'
import { Credential } from '../database/types'
import { FEATURE_FLAGS } from '../featureFlags'
import { log } from '../logger'
import { CredentialType, Role } from '../types'
import { Environment } from '../types'
import { extractAddressFromDid } from '../utils'

export const authOptions: NextAuthOptions = {
  pages: {
    error: '/',
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

        return match(pkh)
          .with('tz1USER', () => ({
            id: 'did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeE',
            pkh: 'did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeE',
            role: Role.user,
          }))
          .with('tz1PRINCIPAL', () => ({
            id: 'did:pkh:tz:tz1bpeJArd7apJyTUryfXH1SD6w8GL6Gwhj8',
            pkh: 'did:pkh:tz:tz1bpeJArd7apJyTUryfXH1SD6w8GL6Gwhj8',
            role: Role.principal,
          }))
          .with('tz1NO_USER', () => null)
          .otherwise(() => null)
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
      log.info('Sign in checks')
      try {
        if (FEATURE_FLAGS[(process.env.ENV as Environment) || 'development'].oidc) {
          log.info('Verifying credential')
          log.info(profile)
          if (!has('credential')(profile)) {
            log.error('Credential not found')
            return '/error?error=CREDENTIAL_NOT_FOUND'
          }

          const credential = omit(['proof'])(prop('credential')(profile)) as Credential
          const {
            id,
            issuer,
            credentialSubject: { id: credentialSubjectId, type: credentialSubjectType },
          } = credential

          if (FEATURE_FLAGS[(process.env.ENV as Environment) || 'development'].contract) {
            log.info('Starting revocation registry check')
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
            const principal = await connection.getUserById(issuer)

            log.info('User credential, checking principal credentials')
            log.info(principal)

            if (!principal.isActive) {
              log.info('Principal exists, but the account is deactivated')
              return '/error?error=PRINCIPAL_INACTIVE'
            }

            if (isEmpty(principal)) {
              // Principal not found
              log.error('Principal not found or active')
              return '/error?error=PRINCIPAL_NOT_FOUND'
            }
          }

          const existingUser = await connection.getUserById(credentialSubjectId)

          if (!isEmpty(existingUser)) {
            log.info('User exists')
            log.info(existingUser)
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

      if (user) {
        token.user = user
      }

      if (profile) {
        const connection = await db()
        const userRoles = await connection.getUserRolesById(profile.sub)
        log.info('Adding user role to JWT', userRoles[0].roleId)
        token.user.role = userRoles[0].roleId
      }

      return token
    },
    async session({ session, token }) {
      log.info('Building session')
      if (session?.user) {
        session.user.pkh = token.user.pkh
        session.user.role = token.user.role
        session.user.id = token.sub || ''
        session.user.email = undefined
        session.user.image = undefined
        session.user.name = token?.user?.id
      }
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
