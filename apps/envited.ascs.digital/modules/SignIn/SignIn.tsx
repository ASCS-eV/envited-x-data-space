'use client'

import { Button, Size } from '@envited-marketplace/design-system'
import { useSession } from 'next-auth/react'
import { isNil } from 'ramda'
import React, { FC } from 'react'

import { signIn, signOut } from '../../common/auth'

export const SignIn: FC = () => {
  const { data: session } = useSession()

  return !isNil(session) ? (
    <Button onClick={signOut} isDisabled={false} size={Size.small}>
      Sign out
    </Button>
  ) : (
    <Button onClick={() => signIn({ pkh: 'tz1PRINCIPAL' })} isDisabled={false} size={Size.small}>
      Sign in
    </Button>
  )
}
