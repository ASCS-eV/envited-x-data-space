'use client'

import { Alert, AlertType } from '@envited-marketplace/design-system'
import Link from 'next/link'
import { FC } from 'react'

import { ROUTES } from '../../common/constants/routes'
import { useTranslation } from '../../common/i18n'

export const ProfileNotification: FC = () => {
  const { t } = useTranslation('Profile')

  return (
    <Alert type={AlertType.info}>
      <div className="flex justify-between">
        <p className="text-sm">{t('[Notification] welcome message')}</p>{' '}
        <Link href={ROUTES.DASHBOARD.PROFILE} className="text-sm underline text-gray-800">
          {t('[Button] notification')}
        </Link>
      </div>
    </Alert>
  )
}
