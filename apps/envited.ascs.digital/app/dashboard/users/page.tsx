import { Users } from '../../../modules/Users'

export default async function Index() {
  const USERS_MAP = [
    {
      name: 'John Johnson',
      email: 'j.johnson@ascs.digital',
      id: 'did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeE',
    },
  ]

  return <Users users={USERS_MAP} />
}
