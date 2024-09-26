import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { equals, map } from 'ramda'
import React, { FC } from 'react'

interface NavItemProps {
  href: string
  name: string
  icon?: JSX.Element | string
  light?: boolean
}

const NavLink: FC<NavItemProps> = ({ href, name, icon = <></>, light }) => {
  const pathname = usePathname()
  const isActive = equals(pathname)(href)
  const theme = light ? 'text-white hover:text-blue-800' : 'text-gray-600 hover:text-black'

  return (
    <Link href={href} className={`${isActive ? 'text-blue' : theme} text-sm font-semibold leading-6 `}>
      {name}
    </Link>
  )
}

export const Navigation: FC<{ items: NavItemProps[]; light: boolean }> = ({ items, light }) => {
  return (
    <>
      {map(({ href, name, icon }: NavItemProps) => (
        <NavLink key={href} href={href} name={name} icon={icon} light={light} />
      ))(items)}
    </>
  )
}
