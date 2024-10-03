import { ButtonType, ColorScheme } from 'apps/envited.ascs.digital/common/types'
import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
  href: string
  children: React.ReactNode
  type?: ButtonType
  colorScheme?: ColorScheme
}

export const Button: FC<Props> = ({ children, href, type = ButtonType.default, colorScheme = ColorScheme.light }) => {
  const buttonStyleMap = {
    [ButtonType.default]: '',
    [ButtonType.block]: 'block w-full text-center',
  }
  const buttonAnimationMap = {
    [ButtonType.default]: 'duration-1000 group-hover:-translate-x-40',
    [ButtonType.block]: 'duration-300 group-hover:-translate-x-96',
  }

  const buttonColorSchemeMap = {
    [ColorScheme.light]: '',
    [ColorScheme.dark]: 'ring-offset-gray-900',
  }

  return (
    <Link
      href={href}
      className={`${buttonStyleMap[type]} ${buttonColorSchemeMap[colorScheme]} relative rounded-md px-5 py-2.5 overflow-hidden group bg-blue-900 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-800 transition-all ease-out duration-300`}
    >
      <span
        className={`absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 ease ${buttonAnimationMap[type]}`}
      ></span>
      <span className="relative text-base font-semibold">{children}</span>
    </Link>
  )
}
