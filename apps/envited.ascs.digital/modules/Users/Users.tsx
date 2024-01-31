'use client'

import { Card, Heading, Table, TableBody, TableCell, TableHeader, TableRow } from '@envited-marketplace/design-system'
import { TrashIcon } from '@heroicons/react/24/outline'
import { has, map } from 'ramda'
import React, { FC } from 'react'

import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { User } from '../../common/types/types'
import { deleteUser } from './Users.actions'

interface UsersProps {
  users: User[]
}
export const Users: FC<UsersProps> = ({ users }) => {
  const { t } = useTranslation('Users')
  const { error, success } = useNotification()

  const deleteUserWithId = (id: string) => async () => {
    try {
      await deleteUser(id)
      success('User is deactivated')
    } catch (e) {
      error('Something went wrong')
    }
  }

  return (
    <Card>
      <Heading importance="h3">{t('[Heading] users')}</Heading>
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
            <TableCell extraClasses="pb-0"> </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {map(({ id, name, email, isActive }: User) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>
                <div
                  className={`${
                    isActive
                      ? 'bg-green-100 text-green-600 dark:bg-green-600'
                      : 'bg-red-100 text-red-600 dark:bg-red-600'
                  } dark:text-white pl-1 pr-1.5 py-0.5 text-xs text-center rounded-xl`}
                >
                  {t(isActive ? '[Label] active' : '[Label] inactive')}
                </div>
              </TableCell>
              <TableCell extraClasses="pl-3">
                {isActive ? (
                  <form action={deleteUserWithId(id)}>
                    <button className="text-white bg-red-500 hover:bg-red-600 p-1.5 rounded-lg">
                      <span className="sr-only">{t('[Button] deactivate')}</span>
                      <TrashIcon className="w-3" />
                    </button>
                  </form>
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
          ))(users)}
        </TableBody>
      </Table>
    </Card>
  )
}
