import { getPublishedProfiles } from '../../common/serverActions'
import { Members } from '../../modules/Members'

export default async function Index() {
  const profiles = await getPublishedProfiles()

  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Members members={profiles} />
        </div>
      </main>
    </>
  )
}

export const dynamic = 'force-dynamic'
