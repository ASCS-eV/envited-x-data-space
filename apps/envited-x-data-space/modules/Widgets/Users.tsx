'use client'

import { Widget } from '@envited-x-data-space/design-system'
import { UsersIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'

import { useTranslation } from '../../common/i18n'

interface UsersProps {
  users: number
}
export const UsersWidget: FC<UsersProps> = ({ users }) => {
  const { t } = useTranslation('Widgets')

  return (
    <Widget
      title={t('[Label] users')}
      value={users}
      icon={<UsersIcon className="h-10 w-10 text-blue-800/75" aria-hidden="true" />}
      description={t('[Description] users')}
    />
  )
}
