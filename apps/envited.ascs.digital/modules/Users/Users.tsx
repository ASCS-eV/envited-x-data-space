'use client'

import { Card, Heading, Table, TableBody, TableCell, TableHeader, TableRow } from '@envited-marketplace/design-system'
import React, { FC } from 'react'

import { useTranslation } from '../../common/i18n'
import { User } from '../../common/types/types'
import { map } from 'ramda'

interface UsersProps {
  users: Partial<User>[]
}
export const Users: FC<UsersProps> = ({ users }) => {
  const { t } = useTranslation('Users')

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {map(({id, name, email }: Partial<User>) => 
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
          )(users)}
        </TableBody>
      </Table>
    </Card>
  )
}
