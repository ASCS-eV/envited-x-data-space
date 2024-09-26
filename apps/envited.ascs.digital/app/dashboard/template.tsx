import Link from 'next/link'
import { includes } from 'ramda'

import { getServerSession } from '../../common/auth'
import { NAVIGATION_DASHBOARD_MAP } from '../../common/constants'
import { getProfile } from '../../common/serverActions'
import { Role } from '../../common/types'
import { getImageUrl } from '../../common/utils'
import { Breadcrumbs } from '../../modules/Breadcrumbs'
import { DashboardNavigation } from '../../modules/DashboardNavigation'
import { Footer } from '../../modules/Footer'
import { Header, HeaderPages } from '../../modules/Header'
import { NotificationContainer } from '../../modules/Notifications'
import { ProfileNotification } from '../../modules/Profile'

export default async function Template({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  const profile = await getProfile()

  return (
    <>
      <Header />
      <NotificationContainer />
      <main className="mx-auto max-w-2xl px-4 pt-0 pb-12 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
        <Breadcrumbs />
        <div className="mb-12">
          <div className="relative -z-10 isolate overflow-hidden bg-gray-400 h-32 lg:h-48 rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
              alt=""
              className="inset-0 -z-10 h-full w-full object-cover opacity-40"
            />
            <div
              className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-blue-900 to-blue-800 opacity-20"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
            <div
              className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
              aria-hidden="true"
            >
              <div
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-blue-900 to-blue-800 opacity-20"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
          </div>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-20 sm:-mt-24 sm:flex sm:items-start sm:space-x-5">
              <div className="flex">
                <img
                  className="h-24 w-24 rounded-xl ring-4 ring-white sm:h-32 sm:w-32 bg-gray-300 p-4 object-contain"
                  src={getImageUrl(profile.logo)}
                  alt=""
                />
              </div>
              <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-0 min-w-0 flex-1 sm:hidden md:block">
                  <h1 className="truncate text-2xl font-bold text-white">{profile.name}</h1>
                  <Link className="text-sm underline text-white" href={`/members/${profile.slug}`}>
                    View profile
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
              <h1 className="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
            </div>
          </div>
        </div>
        <div className="flex gap-x-8 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="w-1/4">
            <DashboardNavigation items={NAVIGATION_DASHBOARD_MAP[session?.user.role as Role]} />
          </div>
          <div className="w-3/4 flex flex-col gap-y-4">
            {includes(session?.user.role)([Role.federator, Role.principal]) && !profile.isPublished && (
              <ProfileNotification />
            )}
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const dynamic = 'force-dynamic'
