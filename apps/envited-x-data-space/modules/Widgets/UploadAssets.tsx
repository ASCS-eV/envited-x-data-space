'use client'

import { ActionWidget } from '@envited-x-data-space/design-system'
import React, { FC } from 'react'

import { ROUTES } from '../../common/constants/routes'
import { useTranslation } from '../../common/i18n'

export const UploadAssetsWidget: FC = () => {
  const { t } = useTranslation('Widgets')

  return (
    <ActionWidget
      href={ROUTES.DASHBOARD.ADD_ASSETS}
      title={t('[Label] upload assets')}
      description={t('[Description] upload assets')}
    />
  )
}
