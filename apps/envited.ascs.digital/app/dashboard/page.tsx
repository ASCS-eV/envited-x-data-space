import { EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline'

import { getServerSession } from '../../common/auth'
// import { getUserById } from '../../common/serverActions'
import { Dashboard } from '../../modules/Dashboard'

// import { User } from '../../modules/User'

export default async function Index() {
  const session = await getServerSession()
  // const user = await getUserById('did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeE')

  const stats = [
    { id: 1, name: 'Users', stat: '5', icon: UsersIcon },
    { id: 2, name: 'Assets', stat: '8', icon: EnvelopeOpenIcon },
  ]

  return (
    <>
      <main>
        <div>
          <div className="mb-12">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Overview</h3>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {stats.map(item => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 border sm:px-6 sm:pt-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-blue-900 p-3">
                      <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-sm">
                        <a href="#" className="font-medium text-blue-900 hover:text-blue-800">
                          View all<span className="sr-only"> {item.name} stats</span>
                        </a>
                      </div>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          {session ? (
            <>
              {/* <User {...user} /> */}
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
