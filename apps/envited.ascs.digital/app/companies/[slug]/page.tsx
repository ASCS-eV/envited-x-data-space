import { getProfile } from '../../../common/serverActions'
import { Header } from '../../../modules/Header'

export default async function Index({ params }: { params: { slug: string } }) {
  const { slug } = params
  const profile = await getProfile(slug)

  return (
    <>
      <Header />
      <main>{JSON.stringify(profile)}</main>
    </>
  )
}
