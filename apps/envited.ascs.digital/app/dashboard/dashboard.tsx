'use client'

import { prop } from 'ramda'

import { useGetUserById } from '../../common/api'

export default function DashboardPage({ id }: { id: string }) {
  const { data } = useGetUserById('did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeE')

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">User data:</h1>
      <dl className="mb-10">
        <dt className="font-bold">User</dt>
        <dd className="ml-5 italic">{prop('id')(data)}</dd>
        <dt className="font-bold">Isseud by</dt>
        <dd className="ml-5 italic">{prop('issuerId')(data)}</dd>
      </dl>
    </div>
  )
}
