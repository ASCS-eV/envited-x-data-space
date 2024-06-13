import { getAssets } from '../../../../common/serverActions'
import { AddAssets } from '../../../../modules/AddAssets'
import { UploadedAssets } from '../../../../modules/UploadedAssets'

export default async function Index() {
  const assets = await getAssets()

  console.log(assets)

  return (
    <>
      <AddAssets />
      <UploadedAssets assets={assets} />
    </>
  )
}
