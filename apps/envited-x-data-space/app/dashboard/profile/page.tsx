import { getActiveUsersByIssuerId, getBusinessCategories, getProfile } from '../../../common/serverActions'
import { Profile } from '../../../modules/Profile'

export default async function Index() {
  const profile = await getProfile()
  const businessCategories = await getBusinessCategories()
  const users = await getActiveUsersByIssuerId()

  return <Profile profile={profile} businessCategories={businessCategories} users={users} />
}

export const dynamic = 'force-dynamic'
