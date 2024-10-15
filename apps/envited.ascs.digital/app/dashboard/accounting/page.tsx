'use client'

import { Heading } from '@envited-marketplace/design-system'

export default async function Index() {
  return (
    <>
      <div className="flex justify-between mb-6 pb-6 border-b">
        <Heading importance="h3">Accounting</Heading>
      </div>
      <div className="">Coming soon</div>
    </>
  )
}

export const dynamic = 'force-dynamic'
