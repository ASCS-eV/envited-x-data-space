import { getPublishedProfiles } from '../../common/serverActions'
import { Header } from '../../modules/Header'
import { Members } from '../../modules/Members'

export default async function Index() {
  const profiles = await getPublishedProfiles()

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Members members={profiles} />
        </div>
      </main>
    </>
  )
}
