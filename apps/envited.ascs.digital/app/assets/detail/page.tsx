import { Asset } from '../../../modules/Asset'

export default async function Index() {
  return (
    <>
      <main className="mx-auto max-w-2xl px-4 pt-0 pb-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <Asset />
      </main>
    </>
  )
}

export const dynamic = 'force-dynamic'
