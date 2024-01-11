import { getServerSession } from '../../common/auth'
import { Dashboard } from '../../modules/Dashboard'
import { Header } from '../../modules/Header'

export default async function Index() {
  const session = await getServerSession()

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-6xl">
          {session ? (
            <Dashboard id={session?.user?.id} address={session?.user?.pkh} role={session?.user?.role} />
          ) : (
            <div>Not logged in</div>
          )}
        </div>
      </main>
    </>
  )
}
