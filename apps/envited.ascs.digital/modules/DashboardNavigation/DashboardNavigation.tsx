'use client'

import { Nav, NavItem } from '@envited-marketplace/design-system'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { equals, isEmpty, map } from 'ramda'
import React, { FC } from 'react'

import { signOut } from '../../common/auth'
import { ROUTES } from '../../common/constants/routes'

interface NavItemProps {
  href: string
  name: string
  icon?: JSX.Element | string
}

const NavLink: FC<NavItemProps> = ({ href, name, icon = <></> }) => {
  const pathname = usePathname()
  const isActive = equals(pathname)(href)

  const iconElement = !isEmpty(icon) ? (
    <div className={`${isActive ? 'text-blue' : null} flex-shrink-0 mr-4`}>{icon}</div>
  ) : null

  return (
    <NavItem active={isActive}>
      <Link href={href}>
        <div className="w-full py-4 px-5">
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
      {map(({ href, name, icon }: NavItemProps) => <NavLink key={href} href={href} name={name} icon={icon} />)(items)}
      <NavItem>
        <button onClick={signOut}>
          <div className="w-full py-4 px-5">
            <p className="text-base font-medium">Sign out</p>
          </div>
        </button>
      </NavItem>
    </Nav>
  )
}

export const DashboardNavigationDropdown: FC = () => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <MenuButton className="flex items-center text-white">
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
