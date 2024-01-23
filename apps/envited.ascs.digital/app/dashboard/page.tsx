import { getServerSession } from '../../common/auth'
import { Dashboard } from '../../modules/Dashboard'

export default async function Index() {
  const session = await getServerSession()

  return session ? (
    <Dashboard id={session?.user?.id} address={session?.user?.pkh} role={session?.user?.role} />
  ) : (
    <div>Not logged in</div>
  )
}
