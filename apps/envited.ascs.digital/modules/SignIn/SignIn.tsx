'use client'

import { Button, Size } from '@envited-marketplace/design-system'
import { useSession } from 'next-auth/react'
import { isNil } from 'ramda'
import React, { FC } from 'react'

import { signIn } from '../../common/auth'
import { ColorScheme } from '../../common/types'
import { DashboardNavigationDropdown } from '../../modules/DashboardNavigation'

export const SignIn: FC<{ colorScheme?: ColorScheme }> = ({ colorScheme = ColorScheme.dark }) => {
  const { data: session } = useSession()

  return !isNil(session) ? (
    <DashboardNavigationDropdown colorScheme={colorScheme} />
  ) : (
    <Button onClick={() => signIn({ pkh: 'tz1PRINCIPAL' })} isDisabled={false} size={Size.small}>
      Connect
    </Button>
  )
}
