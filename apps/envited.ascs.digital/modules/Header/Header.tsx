'use client'

import { Button, Size } from '@envited-marketplace/design-system'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { useTranslation } from '../../common/i18n'

// import { ThemeToggle } from '../ThemeToggle'

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { t } = useTranslation('Header')

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Assets', href: '/assets' },
    { name: 'Members', href: '/members' },
    { name: 'Contact', href: '#' },
  ]

  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Image src="/envited-logo.png" alt="ENVITED" priority height={40} width={170} />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
            {navigation.map(item => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
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
