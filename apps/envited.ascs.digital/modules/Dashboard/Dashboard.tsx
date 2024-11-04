'use client'

import { Button } from '@envited-x-data-space/design-system'
import React, { FC } from 'react'

import { signOut } from '../../common/auth'
import { Role } from '../../common/types'

interface DashboardProps {
  id: string
  address: string
  role: Role
}

export const Dashboard: FC<DashboardProps> = ({ id, address, role }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">You are logged in:</h1>
      <dl className="mb-10">
        <dt className="font-bold">ID</dt>
        <dd className="ml-5 italic">{id}</dd>
        <dt className="font-bold">Address</dt>
        <dd className="ml-5 italic">{address}</dd>
        <dt className="font-bold">Role</dt>
        <dd className="ml-5 italic">{role}</dd>
      </dl>
      <div className="flex gap-x-3">
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </div>
  )
}
