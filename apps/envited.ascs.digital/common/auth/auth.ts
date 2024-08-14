import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn as NASignIn, signOut as NASignOut } from 'next-auth/react'
import { equals, has, isEmpty, omit, prop } from 'ramda'
import { match } from 'ts-pattern'

import { db } from '../database/queries'
import { Credential } from '../database/types'
import { FEATURE_FLAGS } from '../featureFlags'
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
      issuer: 'https://public.oidc.ascs.digital',
      authorization: {
        url: 'https://public.oidc.ascs.digital/oauth2/auth?response_type=code',
        params: {
          scope: 'openid',
        },
      },
      token: 'https://public.oidc.ascs.digital/oauth2/token',
      jwks_endpoint: 'https://public.oidc.ascs.digital/.well-known/jwks.json',
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
      try {
        if (FEATURE_FLAGS[(process.env.NEXT_PUBLIC_ENV as Environment) || 'development'].oidc) {
          if (!has('credential')(profile)) {
            return '/error?error=CREDENTIAL_NOT_FOUND'
          }

          const credential = omit(['proof'])(prop('credential')(profile)) as Credential
          // TODO - Check status in revocation smart contract

          const {
            id,
            issuer,
            credentialSubject: { id: credentialSubjectId, type: credentialSubjectType },
          } = credential

          if (FEATURE_FLAGS[(process.env.NEXT_PUBLIC_ENV as Environment) || 'development'].contract) {
            const revocationCheck = await checkRevocationRegistry(
              id,
              credentialSubjectId,
              issuer,
              credentialSubjectType,
            )

            if (!revocationCheck) {
              return '/error?error=STATUS_NOT_ACTIVE'
            }
          }

          const connection = await db()
          const existingUser = await connection.getUserById(credentialSubjectId)

          if (!isEmpty(existingUser)) {
            // User already exists
            return true
          }

          if (equals(CredentialType.AscsUser)(credentialSubjectType as CredentialType)) {
            const principal = await connection.getUserById(issuer)

            if (isEmpty(principal)) {
              // Principal not found
              return '/error?error=PRINCIPAL_NOT_FOUND'
            }
          }

          await connection.insertUserTx(credential)
        }

        return true
      } catch (error: unknown) {
        console.log(error)
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

      if (profile) {
        const connection = await db()
        const userRoles = await connection.getUserRolesById(profile.sub)
        token.userRole = userRoles[0].roleId
      }

      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) {
        session.user.pkh = token.user.pkh
        session.user.role = token.user.role
        session.user.id = token.sub
        session.user.email = undefined
        session.user.image = undefined
        session.user.name = token?.user?.id
        session.user.role = token.userRole
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_OIDC_SERVER_URL!}/verify-user`, {
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
