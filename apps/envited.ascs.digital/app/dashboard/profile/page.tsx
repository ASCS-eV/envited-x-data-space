import { getCategories, getProfile } from '../../../common/serverActions'
import { Profile } from '../../../modules/Profile'

export default async function Index() {
  const profile = await getProfile('testcompany-gmbh')
  const memberCategories = await getCategories()

  return <Profile profile={profile} memberCategories={memberCategories} />
}

export const dynamic = 'force-dynamic'
