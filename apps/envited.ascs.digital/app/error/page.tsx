'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { Error } from '../../modules/Error'

export default function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary />
    </Suspense>
  )
}

function ErrorBoundary() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return <Error type={error || 'DEFAULT_ERROR'} />
}
