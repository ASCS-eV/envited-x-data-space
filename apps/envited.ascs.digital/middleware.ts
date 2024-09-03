import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

import { AUTHORIZED_ROLES, ROLE_PROTECTED_ROUTES_MAP } from './common/constants'
import { ROUTES } from './common/constants/routes'
import { Role } from './common/types'

export default withAuth(
  req => {
    const role = req.nextauth.token?.user.role as Role
    const path = req.nextUrl.pathname

    if (!ROLE_PROTECTED_ROUTES_MAP[role].includes(path)) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD.HOME, req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => AUTHORIZED_ROLES.includes(token?.user.role),
    },
  },
)

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
}
