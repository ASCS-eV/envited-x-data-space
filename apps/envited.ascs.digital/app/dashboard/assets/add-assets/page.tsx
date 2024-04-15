import { AddAssets } from '../../../../modules/AddAssets'
import { UploadedAssets } from '../../../../modules/UploadedAssets'

export default async function Index() {
  return (
    <>
      <AddAssets />
      <UploadedAssets />
    </>
  )
}
