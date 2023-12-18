'use client'

import { Button } from '@envited-marketplace/design-system'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { useTranslation } from '../../common/i18n'

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation('Header')

  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Image src="/envited-logo.png" alt="ENVITED" priority height={40} width={170} />
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <Button onClick={() => {}}>
              <span>{t('[Button} connect')}</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
