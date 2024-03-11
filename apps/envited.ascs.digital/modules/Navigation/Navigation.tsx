import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { equals, map } from 'ramda'
import React, { FC } from 'react'

interface NavItemProps {
  href: string
  name: string
  icon?: JSX.Element | string
}

const NavLink: FC<NavItemProps> = ({ href, name, icon = <></> }) => {
  const pathname = usePathname()
  const isActive = equals(pathname)(href)

  return (
    <Link href={href} className={`${isActive ? 'text-blue' : 'text-gray-900'} text-sm font-semibold leading-6 `}>
      {name}
    </Link>
  )
}

export const Navigation: FC<{ items: NavItemProps[] }> = ({ items }) => {
  return (
    <>
      {map(({ href, name, icon }: NavItemProps) => <NavLink key={href} href={href} name={name} icon={icon} />)(items)}
    </>
  )
}
