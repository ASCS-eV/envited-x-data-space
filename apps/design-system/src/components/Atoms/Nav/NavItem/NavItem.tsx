import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  active?: boolean
}

const NavItem: FC<Props> = ({ children, active = false }) => {
  const styleClassMap = {
    default: 'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
    active: 'text-black bg-gray-100 dark:text-white dark:bg-gray-900',
  }

  const styleClass = active ? styleClassMap.active : styleClassMap.default

  return (
    <li className={`${styleClass} text-base font-medium cursor-pointer flex items-start rounded-full`}>{children}</li>
  )
}

export default NavItem
