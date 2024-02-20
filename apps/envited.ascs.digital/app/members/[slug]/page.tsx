import { getProfile } from '../../../common/serverActions'
import { Header } from '../../../modules/Header'
import { Member } from '../../../modules/Member'

export default async function Index({ params: { slug } }: { params: { slug: string } }) {
  const profile = await getProfile(slug)

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Member member={profile} />
        </div>
      </main>
    </>
  )
}
