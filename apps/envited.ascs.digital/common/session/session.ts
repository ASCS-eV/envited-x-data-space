import { getServerSession as NAGetServerSession } from 'next-auth'

import { authOptions } from '../../app/api/auth/[...nextauth]/route'

export const _getServerSession = (NAGetServerSession: any) => () => NAGetServerSession(authOptions)

export const getServerSession = _getServerSession(NAGetServerSession)
