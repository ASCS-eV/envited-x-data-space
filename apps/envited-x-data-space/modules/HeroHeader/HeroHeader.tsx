'use client'

import { Button, Grid, GridRow } from '@envited-x-data-space/design-system'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { FC, useState } from 'react'

import { signIn } from '../../common/auth'
import { MEMBER_CREDENTIAL } from '../../common/fixtures'
import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { insertUser } from '../../common/serverActions'

export const HeroHeader: FC = () => {
  const { t } = useTranslation('HeroHeader')
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('')

  const { success, error } = useNotification()

  const addPrincipal = async () => {
    try {
      const user = await insertUser(MEMBER_CREDENTIAL)

      if (user) {
        setMessage(`Added ${user.id} as Principal`)
        success('SUCCESS')
      }
    } catch (e) {
      console.log('error', e)
      error('Something went wrong')
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      {searchParams.has('error') ? (
        <div className="w-full text-center text-blue text-2xl">Could not sign you in</div>
      ) : null}
      <Grid>
        <GridRow columns={`three` as any}>
          <Button onClick={() => signIn({ pkh: 'tz1USER' })}>
            <span>Login as User</span>
          </Button>
          <Button onClick={() => signIn({ pkh: 'tz1PRINCIPAL' })}>
            <span>Login as Principal</span>
          </Button>
          <Button onClick={() => signIn({ pkh: 'tz1NO_USER' })}>
            <span>Test Failed Login</span>
          </Button>
          <Button onClick={() => addPrincipal()}>
            <span>Add Principal</span>
          </Button>
        </GridRow>
      </Grid>
      <div className="text-center">
        <div className="flex justify-center items-center">
          <Link href="/members" className="underline text-blue">
            See list of registered members
          </Link>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6"></div>
        <div className="mt-10">
          <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">{message}</h2>
          <p className="mt-2 text-md leading-8 text-gray-600">{t('[Description] why')}</p>
        </div>
      </div>
    </div>
  )
}
