'use client'

import { Nav, NavItem } from '@envited-marketplace/design-system'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { equals, isEmpty, map } from 'ramda'
import React, { FC } from 'react'

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
    </Nav>
  )
}
