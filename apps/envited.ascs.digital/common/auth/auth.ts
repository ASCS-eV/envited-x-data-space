import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn as NASignIn, signOut as NASignOut } from 'next-auth/react'
import { match } from 'ts-pattern'

import { Role } from '../types'

export const authOptions: NextAuthOptions = {
  pages: {
    error: '/',
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Sign in with Your Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
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
            id: '1',
            pkh: 'tz1USER',
            role: Role.user,
          }))
          .with('tz1PRINCIPAL', () => ({
            id: '1',
            pkh: 'tz1PRINCIPAL',
            role: Role.principal,
          }))
          .with('tz1NO_USER', () => null)
          .otherwise(() => null)
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }

      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.pkh = token.user.pkh
      session.user.role = token.user.role
      session.user.id = token.sub
      session.user.email = undefined
      session.user.image = undefined
      return session
    },
  },
}

export const _signIn =
  (NASignIn: any) =>
  ({ pkh }: { pkh: string }) =>
    NASignIn('credentials', {
      pkh,
      callbackUrl: '/dashboard',
    })

export const signIn = _signIn(NASignIn)

export const signOut = () =>
  NASignOut({
    callbackUrl: '/',
  })
