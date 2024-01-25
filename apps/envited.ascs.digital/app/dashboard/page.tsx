import { getServerSession } from '../../common/auth'
import { getUserById } from '../../common/server'
import { Dashboard } from '../../modules/Dashboard'
import { User } from '../../modules/User'

export default async function Index() {
  const session = await getServerSession()
  const user = await getUserById('did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeE')

  return (
    <>
      <main>
        <div className="mx-auto max-w-6xl">
          {session ? (
            <>
              <User {...user} />
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
