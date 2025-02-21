'use client'

import { Nav, NavItem } from '@envited-x-data-space/design-system'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArrowRightStartOnRectangleIcon,
  BuildingOfficeIcon,
  CubeTransparentIcon,
  DocumentCurrencyEuroIcon,
  Squares2X2Icon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { equals, has, map } from 'ramda'
import React, { FC } from 'react'

import { signOut } from '../../common/auth'
import { ROUTES } from '../../common/constants/routes'
import { ColorScheme } from '../../common/types'

interface NavItemProps {
  href: string
  name: string
}

enum DashboardIcons {
  dashboard = 'Dashboard',
  members = 'Members',
  users = 'Users',
  profile = 'Profile',
  assets = 'Assets',
  accounting = 'Accounting',
}

const ICON_MAP = {
  [DashboardIcons.dashboard]: <Squares2X2Icon className="w-5 h-5" />,
  [DashboardIcons.members]: <BuildingOfficeIcon className="w-5 h-5" />,
  [DashboardIcons.users]: <UsersIcon className="w-5 h-5" />,
  [DashboardIcons.profile]: <UserIcon className="w-5 h-5" />,
  [DashboardIcons.assets]: <CubeTransparentIcon className="w-5 h-5" />,
  [DashboardIcons.accounting]: <DocumentCurrencyEuroIcon className="w-5 h-5" />,
}

const NavLink: FC<NavItemProps> = ({ href, name }) => {
  const pathname = usePathname()
  const isActive = equals(pathname)(href)

  const iconElement = has(name)(ICON_MAP) ? (
    <div className={`${isActive ? 'text-blue' : null} flex-shrink-0 mr-4`}>{ICON_MAP[name as DashboardIcons]}</div>
  ) : null

  return (
    <NavItem active={isActive}>
      <Link href={href}>
        <div className="w-full py-4 px-5 flex items-center">
          {iconElement}
          <p className="text-base font-medium">{name}</p>
        </div>
      </Link>
    </NavItem>
  )
}

export const DashboardNavigation: FC<{ items: NavItemProps[] }> = ({ items }) => {
  return (
    <Nav>
      {map(({ href, name }: NavItemProps) => <NavLink key={href} href={href} name={name} />)(items)}
      <NavItem>
        <div className="mt-3 pt-3 w-full border-t border-gray-200">
          <button onClick={signOut}>
            <div className="w-full py-4 px-5 flex items-center">
              <div className="flex-shrink-0 mr-4">
                <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
              </div>
              <p className="text-base font-medium">Sign out</p>
            </div>
          </button>
        </div>
      </NavItem>
    </Nav>
  )
}

export const DashboardNavigationDropdown: FC<{ colorScheme?: ColorScheme }> = ({ colorScheme = ColorScheme.dark }) => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <MenuButton
        className={`flex items-center ${equals(colorScheme)(ColorScheme.light) ? 'text-white' : 'text-black'}`}
      >
        <span className="sr-only">Open options</span>
        <UserIcon className="h-6 w-6" aria-hidden="true" />
      </MenuButton>
    </div>
    <MenuItems
      transition
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <div className="py-1">
        <MenuItem>
          <Link
            href={ROUTES.DASHBOARD.HOME}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
          >
            Dashboard
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            onClick={signOut}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
          >
            Sign out
          </button>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
)
