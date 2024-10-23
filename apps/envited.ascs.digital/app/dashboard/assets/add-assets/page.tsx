import { getUploads } from '../../../../common/serverActions'
import { AddAssets } from '../../../../modules/AddAssets'
import { Uploads } from '../../../../modules/Uploads'

export default async function Index() {
  const uploads = await getUploads()

  return (
    <>
      <AddAssets />
      <Uploads uploads={uploads} />
    </>
  )
}
