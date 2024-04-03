import { Button } from '@envited-marketplace/design-system'
import React, { FC } from 'react'

export const SignIn: FC = () => {
  const signIn = () => {
    console.log('signin in')
  }

  return (
    <Button onClick={signIn} isDisabled={false}>
      Sign in
    </Button>
  )
}
