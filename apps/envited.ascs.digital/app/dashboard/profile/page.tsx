import { chain, prop } from 'ramda'

import { getBusinessCategories, getProfile, getProfileBusinessCategories } from '../../../common/serverActions'
import { Profile } from '../../../modules/Profile'

export default async function Index() {
  const profile = await getProfile('testcompany-gmbh')
  const businessCategories = await getBusinessCategories()
  const connectedProfileBusinessCategories = await getProfileBusinessCategories(profile.id)
  const profileBusinessCategories = chain(prop('businessCategoryId'))(connectedProfileBusinessCategories) as string[]

  return (
    <Profile
      profile={profile}
      profileBusinessCategories={profileBusinessCategories}
      businessCategories={businessCategories}
    />
  )
}

export const dynamic = 'force-dynamic'
