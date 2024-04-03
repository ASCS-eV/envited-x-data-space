import type { NextAuthOptions } from 'next-auth'
import { signIn as NASignIn, signOut as NASignOut } from 'next-auth/react'

export const authOptions: NextAuthOptions = {
  pages: {
    error: '/',
    signIn: '/',
  },
  providers: [
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
      profile: profile => ({
        id: profile.sub,
      }),
    },
  ],
  secret: process.env.SECRET,
  debug: true,
  callbacks: {
    // async callback({ session, token, user }) {
    //   console.log('CALLBACK')
    //   console.log("session", session);
    //   console.log("token", token);
    //   console.log("user", user);
    //   return Promise.resolve(session);
    // },
    // async signin(user, account, profile) {
    //   console.log("user", user, account, profile);
    //   return true;
    // },
    // async jwt(token, user, account, profile, isNewUser) {
    //   console.log(token);
    //   console.log(user);
    //   console.log(account);
    //   console.log(profile);
    //   console.log(isNewUser);
    //   if (account.access_token) {
    //     token.accessToken = account.access_token;
    //   }
    //   return Promise.resolve(token);
    // },
    // async session(session, token) {
    //   console.log(session);
    //   console.log(token);
    //   return session;
    // },
  },
}

export const _signIn =
  (NASignIn: any) =>
  ({ pkh }: { pkh: string }) => {
    return NASignIn('siwt', {
      pkh,
      callbackUrl: '/dashboard',
    })
  }

export const signIn = _signIn(NASignIn)

export const signOut = () =>
  NASignOut({
    callbackUrl: '/',
  })
