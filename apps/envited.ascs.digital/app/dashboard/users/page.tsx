import { getProfile, getUsersByIssuerId } from '../../../common/serverActions'
import { Users } from '../../../modules/Users'

export default async function Index() {
  const users = await getUsersByIssuerId()
  const { principalUserId } = await getProfile()

  return <Users users={users} principalUserId={principalUserId} />
}

export const dynamic = 'force-dynamic'
