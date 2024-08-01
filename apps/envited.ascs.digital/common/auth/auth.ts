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
      issuer: 'http://localhost:5004',
      authorization: {
        url: 'http://localhost:5004/oauth2/auth?response_type=code',
        params: {
          scope: 'openid',
        },
      },
      token: 'http://localhost:5004/oauth2/token',
      jwks_endpoint: 'http://localhost:5004/.well-known/jwks.json',
      clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET,
      profile: async profile => {
        const connection = await db()
        const userRoles = await connection.getUserRolesById(profile.sub)

        return {
          id: profile.sub,
          pkh: profile.sub,
          role: userRoles[0].roleId,
        }
      },
    },
  ],
  secret: process.env.SECRET,
  debug: true,
  callbacks: {
    async signIn({ profile }) {
      try {
        if (!has('credential')(profile)) {
          return false
        }

        const credential = omit(['proof'])(prop('credential')(profile)) as Credential

        const connection = await db()
        const existingUser = await connection.getUserById(credential.credentialSubject.id)

        if (!isEmpty(existingUser)) {
          // User already exists
          return true
        }

        if (equals(CredentialType.AscsUser)(credential.credentialSubject.type as CredentialType)) {
          const principal = await connection.getUserById(credential.issuer)

          if (isEmpty(principal)) {
            // Principal not found
            return false
          }
        }

        await connection.insertUserTx(credential)

        return true
      } catch (error: unknown) {
        console.log(error)

        return false
      }
    },
    async jwt({ token, user, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token
      }

      if (user) {
        token.user = user
      }

      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log(session)
      console.log(token)
      if (session?.user) {
        session.user.pkh = token.user.pkh
        session.user.role = token.user.role
        session.user.id = token.sub
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
