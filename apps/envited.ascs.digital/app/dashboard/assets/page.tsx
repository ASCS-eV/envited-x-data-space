import { getTokensByIssuerId } from '../../../common/serverActions'
import { DashboardAssets } from '../../../modules/Assets'

export default async function Index() {
  const tokens = await getTokensByIssuerId()

  return <DashboardAssets items={tokens} />
}

export const dynamic = 'force-dynamic'
