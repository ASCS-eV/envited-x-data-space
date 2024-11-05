import { getTokenById } from '../../../common/serverActions'
import { Asset } from '../../../modules/Asset'
import { Breadcrumbs } from '../../../modules/Breadcrumbs'

export default async function Index({ params: { id } }: { params: { id: string } }) {
  console.log('assets/[id]/page.tsx - before', id)
  const token = await getTokenById(id)

  console.log('assets/[id]/page.tsx', token)

  return (
    <>
      <main className="mx-auto max-w-2xl px-4 pt-0 pb-12 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
        <Breadcrumbs />
        <Asset item={token} />
      </main>
    </>
  )
}

export const dynamic = 'force-dynamic'
