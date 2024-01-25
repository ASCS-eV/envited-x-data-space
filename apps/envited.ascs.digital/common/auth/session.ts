import { getServerSession as NAGetServerSession, NextAuthOptions } from 'next-auth'

import { authOptions } from './auth'
import { Session } from '../types/types'

export const _getServerSession = (NAGetServerSession: (arg0: NextAuthOptions) => Promise<Session | null>) => (authOptions: NextAuthOptions) => () =>
  NAGetServerSession(authOptions)

export const getServerSession = _getServerSession(NAGetServerSession)(authOptions)
