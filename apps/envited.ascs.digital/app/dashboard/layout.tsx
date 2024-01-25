import { ReactNode } from 'react'

import { NAVIGATION_DASHBOARD } from '../../common/constants'
import { Header } from '../../modules/Header'
import { Navigation } from '../../modules/Navigation'

interface DashboardProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardProps) {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-x-8">
            <div className="w-1/5">
              <Navigation items={NAVIGATION_DASHBOARD} />
            </div>
            <div className="w-4/5">{children}</div>
          </div>
        </div>
      </main>
    </>
  )
}
