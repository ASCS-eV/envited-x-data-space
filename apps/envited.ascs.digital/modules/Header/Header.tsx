'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { NAVIGATION } from '../../common/constants'
import { Navigation } from '../Navigation'
import { SignIn } from '../SignIn'

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <header className={`py-4 sticky top-0 z-40 w-full bg-white border-b border-gray-300`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-40 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Image src="/ASCS_logo_envited-X_colour_alex.png" alt="ENVITED" priority height={40} width={170} />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
            <Navigation items={NAVIGATION} />
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <SignIn />
          </div>
        </nav>
      </div>
    </header>
  )
}

export const HeaderPages: FC<HeaderProps> = () => {
  return (
    <>
      <div className="fixed top-0 z-40 w-full">
        <div className="absolute top-0 w-full bg-white h-2"></div>
        <div className="absolute z-40 bg-logo bg-no-repeat inline-flex justify-center px-24 pt-2 pb-4">
          <Link href="/" aria-label="Home">
            <Image src="/ASCS_logo_envited-X_colour_alex.png" alt="ENVITED" priority height={40} width={170} />
          </Link>
        </div>
      </div>
      <header className={`py-4 absolute top-0 z-20 w-full`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-end lg:gap-x-12 py-4">
            <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
              <Navigation items={NAVIGATION} />
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
              <SignIn />
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
