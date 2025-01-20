'use client'

import { usePathname } from 'next/navigation'

import { Header, HeaderPages } from '../modules/Header'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      {pathname.startsWith('/dashboard') || pathname.startsWith('/assets/') ? <Header /> : <HeaderPages />}
      {children}
    </>
  )
}
