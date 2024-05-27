import { getPublishedProfiles } from '../../common/serverActions'
import { Breadcrumbs } from '../../modules/Breadcrumbs'
import { Members } from '../../modules/Members'
import { PageHeader } from '../../modules/PageHeader'

export default async function Index() {
  const profiles = await getPublishedProfiles()

  return (
    <>
      <main className="mx-auto max-w-2xl px-4 pt-0 pb-12 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
        <Breadcrumbs />
        <PageHeader heading="Members" description="" />
        <Members members={profiles} />
      </main>
    </>
  )
}

export const dynamic = 'force-dynamic'
