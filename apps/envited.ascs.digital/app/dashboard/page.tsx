import { getServerSession } from '../../common/auth'
import { Dashboard } from '../../modules/Dashboard'
import { Header } from '../../modules/Header'
import DashboardPage from './dashboard'

export default async function Index() {
  const session = await getServerSession()

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-6xl">
          {session ? (
            <>
              <DashboardPage id={session?.user?.pkh} />
              <Dashboard id={session?.user?.id} address={session?.user?.pkh} role={session?.user?.role} />
            </>
          ) : (
            <div>Not logged in</div>
          )}
        </div>
      </main>
    </>
  )
}
