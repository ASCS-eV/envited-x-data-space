'use client'

import { useSearchParams } from 'next/navigation'

import { LoginError } from '../../modules/LoginError'

export default function Index() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  return <LoginError type={type || 'default-error'} />
}
