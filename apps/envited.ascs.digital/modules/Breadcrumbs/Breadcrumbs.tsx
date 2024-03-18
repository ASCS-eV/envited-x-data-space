'use client'

import { HomeIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import { FC, Fragment, ReactNode } from 'react'

import { mapIndexed } from '../../common/utils'
import { formatBreadcrumbUri, formatBreadcrumbLabel } from './Breadcrumbs.utils'

export const Breadcrumbs: FC = () => {
  const path = usePathname()
  const pathNames = path.split('/').filter(path => path)
  const getBreadcrumbUri = formatBreadcrumbUri(pathNames)

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
          {mapIndexed((link, index) => {
            const href = getBreadcrumbUri(index)
            const label = formatBreadcrumbLabel(link as any)

            return (
              <Fragment key={index}>
                <li>
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
                      href={href}
                      className={`${
                        path === href ? 'text-gray-700' : ''
                      } ml-4 text-sm font-medium text-gray-500 hover:text-gray-700`}
                    >
                      {label as ReactNode}
                    </a>
                  </div>
                </li>
              </Fragment>
            )
          })(pathNames)}
        </ol>
      </nav>
    </div>
  )
}
