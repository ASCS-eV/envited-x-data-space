'use client'

import { useSearchParams } from 'next/navigation'

import { Error } from '../../modules/Error'

export default function Index() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return <Error type={error || 'DEFAULT_ERROR'} />
}
