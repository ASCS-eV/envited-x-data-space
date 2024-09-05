import { EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline'
import { map } from 'ramda'

import { getServerSession } from '../../common/auth'
import { ROUTES } from '../../common/constants/routes'
import { Dashboard } from '../../modules/Dashboard'

export default async function Index() {
  const session = await getServerSession()

  const stats = [
    { id: 1, name: 'Users', stat: '1', icon: UsersIcon, route: ROUTES.DASHBOARD.USERS },
    { id: 2, name: 'Assets', stat: '2', icon: EnvelopeOpenIcon, route: ROUTES.DASHBOARD.ASSETS },
  ]

  return (
    <div>
      <div className="mb-12">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Overview</h3>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {map((item: { id: number; icon: any; name: string; stat: string; route: string }) => (
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
                    <a href={item.route} className="font-medium text-blue-900 hover:text-blue-800">
                      View all<span className="sr-only"> {item.name}</span>
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          ))(stats)}
        </dl>
      </div>
      {session ? (
        <>
          <Dashboard id={session?.user?.id} address={session?.user?.pkh} role={session?.user?.role} />
        </>
      ) : (
        <div>Not logged in</div>
      )}
    </div>
  )
}
