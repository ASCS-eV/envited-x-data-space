'use client'

import { Button } from '@envited-marketplace/design-system'
import React, { FC } from 'react'

import { signOut } from '../../common/auth'
import { Role } from '../../common/types'

interface DashboardProps {
  id: string
  address: string
  role: Role
}

export const Dashboard: FC<DashboardProps> = ({ id, address, role }) => {
  const getUserById = async (userId: string) => {
    try {
      const result = await fetch(`/api/user/${userId}`)
      const body = await result.json()

      return body
    } catch (error) {
      console.log(error)
    }
  }

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
        <Button onClick={() => getUserById(address)}>Get current user</Button>
        <Button onClick={() => getUserById('did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeE')}>
          Get employer data
        </Button>
      </div>
    </div>
  )
}
