import { getUsersByIssuerId } from '../../../common/serverActions'
import { Users } from '../../../modules/Users'

export default async function Index() {
  const users = await getUsersByIssuerId()

  return <Users users={users} />
}
