'use client'

import { useSession } from 'next-auth/react'
import { equals, isNil } from 'ramda'
import React, { FC } from 'react'

import { signIn } from '../../common/auth'
import { ColorScheme } from '../../common/types'
import { DashboardNavigationDropdown } from '../../modules/DashboardNavigation'

export const SignIn: FC<{ colorScheme?: ColorScheme }> = ({ colorScheme = ColorScheme.dark }) => {
  const { data: session } = useSession()

  return !isNil(session) ? (
    <DashboardNavigationDropdown colorScheme={colorScheme} />
  ) : (
    <button
      onClick={() => signIn({ pkh: 'tz1USER' })}
      className={`${
        equals(colorScheme)(ColorScheme.light) ? 'ring-offset-gray-900' : ''
      } relative rounded-md px-4 py-1.5 overflow-hidden group bg-blue-900 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-800 transition-all ease-out duration-300`}
    >
      <span
        className={`absolute right-0 w-8 h-32 -mt-12 transition-all transform translate-x-12 bg-white opacity-10 rotate-12 ease duration-1000 group-hover:-translate-x-40`}
      ></span>
      <span className="relative text-base font-semibold">Connect</span>
    </button>
  )
}
