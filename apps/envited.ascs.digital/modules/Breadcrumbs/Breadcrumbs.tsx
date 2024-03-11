'use client'

import { HomeIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import { drop, prop } from 'ramda'
import { FC } from 'react'

const BREADCRUMBS_MAP = {
  dashboard: {
    name: 'Dashboard',
    href: '/dashboard',
  },
  profile: {
    name: 'Profile',
    href: '/dashboard/profile',
  },
  users: {
    name: 'Users',
    href: '/dashboard/users',
  },
  assets: {
    name: 'Assets',
    href: '/dashboard/assets',
  },
}

export const Breadcrumbs: FC = () => {
  const pathname = usePathname()
  const pages = drop(1, pathname.split('/'))

  return (
    <div className="pb-8">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {pages.map(slug => {
            const page = prop(slug)(BREADCRUMBS_MAP) as { name: string; href: string; current?: boolean }
            return (
              <li key={prop('name')(page)}>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <a
                    href={prop('href')(page)}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={page.current ? 'page' : undefined}
                  >
                    {prop('name')(page)}
                  </a>
                </div>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
