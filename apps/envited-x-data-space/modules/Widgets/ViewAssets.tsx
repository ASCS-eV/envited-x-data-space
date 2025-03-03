'use client'

import { ActionWidget } from '@envited-x-data-space/design-system'
import React, { FC } from 'react'

import { ROUTES } from '../../common/constants/routes'
import { useTranslation } from '../../common/i18n'

export const ViewAssetsWidget: FC = () => {
  const { t } = useTranslation('Widgets')

  return (
    <ActionWidget
      href={ROUTES.DASHBOARD.ASSETS}
      title={t('[Label] view assets')}
      description={t('[Description] view assets')}
    />
  )
}
