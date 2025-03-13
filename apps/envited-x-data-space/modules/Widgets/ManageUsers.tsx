'use client'

import { ActionWidget } from '@envited-x-data-space/design-system'
import React, { FC } from 'react'

import { ROUTES } from '../../common/constants/routes'
import { useTranslation } from '../../common/i18n'

export const ManageUsersWidget: FC = () => {
  const { t } = useTranslation('Widgets')

  return (
    <ActionWidget
      href={ROUTES.DASHBOARD.USERS}
      title={t('[Label] manage users')}
      description={t('[Description] manage users')}
    />
  )
}
