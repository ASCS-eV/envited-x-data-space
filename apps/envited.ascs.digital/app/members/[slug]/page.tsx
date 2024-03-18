import { getProfile } from '../../../common/serverActions'
import { Breadcrumbs } from '../../../modules/Breadcrumbs'
import { Member } from '../../../modules/Member'

export default async function Index({ params: { slug } }: { params: { slug: string } }) {
  const profile = await getProfile(slug)

  return (
    <>
      <main className="mx-auto max-w-2xl px-4 pt-0 pb-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <Breadcrumbs />
        <Member member={profile} />
      </main>
    </>
  )
}
