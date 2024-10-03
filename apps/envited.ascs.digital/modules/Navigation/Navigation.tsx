import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { ColorScheme } from 'apps/envited.ascs.digital/common/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { equals, map } from 'ramda'
import React, { FC } from 'react'

interface NavItemProps {
  href: string
  name: string
  icon?: JSX.Element | string
  colorScheme?: ColorScheme
}

const NavLink: FC<NavItemProps> = ({ href, name, icon = <></>, colorScheme = ColorScheme.dark }) => {
  const pathname = usePathname()
  const isActive = equals(pathname)(href)
  const theme = equals(colorScheme)(ColorScheme.light)
    ? 'text-white hover:text-blue-800'
    : 'text-gray-600 hover:text-black'

  return (
    <Link href={href} className={`${isActive ? 'text-blue' : theme} text-sm font-semibold leading-6 `}>
      {name}
    </Link>
  )
}

export const Navigation: FC<{ items: NavItemProps[]; colorScheme?: ColorScheme }> = ({
  items,
  colorScheme = ColorScheme.dark,
}) => {
  return (
    <>
      {map(({ href, name, icon }: NavItemProps) => (
        <NavLink key={href} href={href} name={name} icon={icon} colorScheme={colorScheme} />
      ))(items)}
    </>
  )
}

export const NavigationDropdown: FC<{ items: NavItemProps[]; colorScheme?: ColorScheme }> = ({
  items,
  colorScheme = ColorScheme.dark,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className={`flex items-center ${equals(colorScheme)(ColorScheme.light) ? 'text-white' : 'text-black'}`}
        >
          <span className="sr-only">Open options</span>
          <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {map(({ href, name }: NavItemProps) => (
            <MenuItem key={href}>
              <Link
                href={href}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                {name}
              </Link>
            </MenuItem>
          ))(items)}
        </div>
      </MenuItems>
    </Menu>
  )
}
