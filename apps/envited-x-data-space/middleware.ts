import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { includes } from 'ramda'

import { AUTHORIZED_ROLES, ROLE_PROTECTED_ROUTES_MAP } from './common/constants'
import { ROUTES } from './common/constants/routes'
import { Role } from './common/types'

export default withAuth(
  req => {
    const role = req.nextauth.token?.user.role as Role
    const path = req.nextUrl.pathname as string

    if (!includes(path)(ROLE_PROTECTED_ROUTES_MAP[role])) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD.HOME, req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => includes(token?.user.role as Role)(AUTHORIZED_ROLES),
    },
  },
)

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
}
