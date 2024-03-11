'use client'

import { Button, Size } from '@envited-marketplace/design-system'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { NAVIGATION } from '../../common/constants'
import { useTranslation } from '../../common/i18n'
import { Navigation } from '../Navigation'

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation('Header')

  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-40 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Image src="/envited-logo.png" alt="ENVITED" priority height={40} width={170} />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
            <Navigation items={NAVIGATION} />
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <Button onClick={() => {}} size={Size.small}>
              <span>{t('[Button] connect')}</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
