'use client'

import { Card, Heading, Table, TableBody, TableCell, TableHeader, TableRow } from '@envited-x-data-space/design-system'
import { map } from 'ramda'
import React, { FC } from 'react'

import { useTranslation } from '../../common/i18n'
import { User } from '../../common/types/types'
import { truncateDID } from '../../common/utils'
import { DashboardMembersDialogConfirm } from './DashboardMembersDialogConfirm'

interface UsersProps {
  members: User[]
}
export const DashboardMembers: FC<UsersProps> = ({ members }) => {
  const { t } = useTranslation('DashboardMembers')

  return (
    <Card>
      <Heading importance="h3">{t('[Heading] members')}</Heading>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell extraClasses="pb-0">
              <h4 className="text-gray-400 dark:text-gray-500 text-sm">{t('[Heading] did')}</h4>
            </TableCell>
            <TableCell extraClasses="pb-0">
              <h4 className="text-gray-400 dark:text-gray-500 text-sm">{t('[Heading] name')}</h4>
            </TableCell>
            <TableCell extraClasses="pb-0">
              <h4 className="text-gray-400 dark:text-gray-500 text-sm">{t('[Heading] email')}</h4>
            </TableCell>
            <TableCell extraClasses="pb-0">
              <h4 className="text-gray-400 dark:text-gray-500 text-sm">{t('[Heading] status')}</h4>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {map(({ id, name, email, isActive }: User) => (
            <TableRow key={id}>
              <TableCell>{truncateDID(id)}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-2">
                  <DashboardMembersDialogConfirm id={id} status={isActive} />
                  <div
                    className={`${
                      isActive
                        ? 'bg-green-100 text-green-600 dark:bg-green-600'
                        : 'bg-red-100 text-red-600 dark:bg-red-600'
                    } dark:text-white pl-1 pr-1.5 py-0.5 text-xs text-center rounded-xl`}
                  >
                    {t(isActive ? '[Label] active' : '[Label] inactive')}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))(members)}
        </TableBody>
      </Table>
    </Card>
  )
}
