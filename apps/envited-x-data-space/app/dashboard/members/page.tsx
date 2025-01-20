import { getMembers } from '../../../common/serverActions/members'
import { DashboardMembers } from '../../../modules/DashboardMembers'

export default async function Index() {
  const members = await getMembers()

  return <DashboardMembers members={members} />
}

export const dynamic = 'force-dynamic'
