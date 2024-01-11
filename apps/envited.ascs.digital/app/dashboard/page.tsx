import { getServerSession } from '../../common/session'
import { Header } from '../../modules/Header'

export default async function Index() {
  const session = await getServerSession()
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-6xl">{session ? JSON.stringify(session) : 'No session'}</div>
      </main>
    </>
  )
}
