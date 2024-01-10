import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
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
            memberId: '',
            role: '',
          }
        }
        const { pkh } = credentials

        return {
          id: '',
          pkh,
          memberId: '',
          role: '',
        }
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
      session.user.memberId = token.user.memberId
      session.user.id = token.sub
      session.user.email = undefined
      session.user.image = undefined
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
