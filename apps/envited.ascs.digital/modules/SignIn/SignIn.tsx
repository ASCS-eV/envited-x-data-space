'use client'

import { Button, Size } from '@envited-marketplace/design-system'
import { useSession } from 'next-auth/react'
import { isNil } from 'ramda'
import React, { FC } from 'react'

import { signIn } from '../../common/auth'
import { DashboardNavigationDropdown } from '../../modules/DashboardNavigation'

export const SignIn: FC = () => {
  const { data: session } = useSession()

  return !isNil(session) ? (
    <DashboardNavigationDropdown />
  ) : (
    <Button onClick={() => signIn({ pkh: 'tz1PRINCIPAL' })} isDisabled={false} size={Size.small}>
      Connect
    </Button>
  )
}
