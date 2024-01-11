import { getServerSession as NAGetServerSession, NextAuthOptions } from 'next-auth'

import { authOptions } from './auth'

export const _getServerSession = (NAGetServerSession: any) => (authOptions: NextAuthOptions) => () =>
  NAGetServerSession(authOptions)

export const getServerSession = _getServerSession(NAGetServerSession)(authOptions)
