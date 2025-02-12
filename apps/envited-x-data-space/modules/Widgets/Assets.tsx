'use client'

import { Widget } from '@envited-x-data-space/design-system'
import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'

import { useTranslation } from '../../common/i18n'
import { Token } from '../../common/types/types'

interface AssetsWidgetProps {
  tokens: Token[]
}
export const AssetsWidget: FC<AssetsWidgetProps> = ({ tokens }) => {
  const { t } = useTranslation('Widgets')

  return (
    <Widget
      title={t('[Label] assets')}
      value={tokens.length}
      icon={<CubeTransparentIcon className="h-10 w-10 text-blue-800/75" aria-hidden="true" />}
      description={t('[Description] assets')}
    />
  )
}
