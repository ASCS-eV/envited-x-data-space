import { getTokensByIssuerId } from '../../../common/serverActions'
import { DashboardAssets } from '../../../modules/Assets'

export default async function Index() {
  const tokens = await getTokensByIssuerId()

  console.log('dashboard/assets/page.tsx', tokens)

  return <DashboardAssets items={tokens} />
}

export const dynamic = 'force-dynamic'
