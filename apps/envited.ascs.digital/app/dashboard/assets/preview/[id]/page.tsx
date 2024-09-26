import { getAsset } from '../../../../../common/serverActions'
import { Asset } from '../../../../../modules/Asset'

export default async function Index({ params: { id } }: { params: { id: string } }) {
  const data = await getAsset(id)

  return (
    <main className="mx-auto max-w-2xl px-4 pt-0 pb-12 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
      <Asset />
    </main>
  )
}
