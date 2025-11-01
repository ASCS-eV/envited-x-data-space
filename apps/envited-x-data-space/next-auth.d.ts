import { DefaultSession } from 'next-auth'
import { User } from 'next-auth/jwt'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string
      did: string
      id: string
    } & DefaultSession['user']
  }

  /**
   * The shape of the user info returned from OAuth providers
   */
  interface Profile {
    credential?: string
    acr?: string
    at_hash?: string
    aud?: string[]
    auth_time?: number
    exp?: number
    iat?: number
    iss?: string
    jti?: string
    rat?: number
    sid?: string
    sub?: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: {
      role: string
      did: string
      id: string
    } & User
  }
}
