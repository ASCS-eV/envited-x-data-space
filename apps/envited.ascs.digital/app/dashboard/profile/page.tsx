import { getBusinessCategories, getProfile } from '../../../common/serverActions'
import { Profile } from '../../../modules/Profile'

export default async function Index() {
  const profile = await getProfile()
  const businessCategories = await getBusinessCategories()

  return <Profile profile={profile} businessCategories={businessCategories} />
}

export const dynamic = 'force-dynamic'
