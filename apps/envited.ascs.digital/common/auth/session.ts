import { getServerSession as NAGetServerSession, NextAuthOptions } from 'next-auth'

import { Session } from '../types/types'
import { authOptions } from './auth'

export const _getServerSession =
  (NAGetServerSession: (arg0: NextAuthOptions) => Promise<Session | null>) => (authOptions: NextAuthOptions) => () =>
    NAGetServerSession(authOptions)

export const getServerSession = _getServerSession(NAGetServerSession)(authOptions)
