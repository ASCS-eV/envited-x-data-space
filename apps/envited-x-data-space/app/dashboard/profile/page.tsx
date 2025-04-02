import { getActiveUsersByIssuerId, getBusinessCategories, getProfile } from '../../../common/serverActions'
import { Profile } from '../../../modules/Profile'

export default async function Index() {
  const profile = await getProfile()
  console.log('PROFILE PAGE', profile)
  const businessCategories = await getBusinessCategories()
  console.log('BUSINESS CATEGORIES', businessCategories)
  const users = await getActiveUsersByIssuerId()
  console.log('USERS', users)

  return <Profile profile={profile} businessCategories={businessCategories} users={users} />
}

export const dynamic = 'force-dynamic'
