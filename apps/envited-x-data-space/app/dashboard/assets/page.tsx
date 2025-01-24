import { getTokensForLoggedInUser } from '../../../common/serverActions'
import { DashboardAssets } from '../../../modules/Assets'

export default async function Index() {
  const tokens = await getTokensForLoggedInUser()

  return <DashboardAssets tokens={tokens} />
}

export const dynamic = 'force-dynamic'
