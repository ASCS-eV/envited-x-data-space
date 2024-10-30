import { getProfileBySlug } from '../../../common/serverActions'
import { Breadcrumbs } from '../../../modules/Breadcrumbs'
import { Member } from '../../../modules/Member'
import { PageHeader } from '../../../modules/PageHeader'

export default async function Index({ params: { slug } }: { params: { slug: string } }) {
  const profile = await getProfileBySlug(slug)

  return (
    <>
      <PageHeader
        heading="Community"
        title={profile.name}
        description=""
        backgroundImage="/images/AdobeStock_619508170_Onchira.jpeg"
      />
      <main className="mx-auto max-w-2xl px-4 pt-0 pb-12 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
        <Breadcrumbs />
        <Member member={profile} />
      </main>
    </>
  )
}
