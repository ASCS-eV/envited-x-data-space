import { getProfile } from '../../../common/serverActions'
import { Header } from '../../../modules/Header'

export default async function Index({ params: { slug } }: { params: { slug: string } }) {
  const profile = await getProfile(slug)

  return (
    <>
      <Header />
      <main>{JSON.stringify(profile)}</main>
    </>
  )
}
