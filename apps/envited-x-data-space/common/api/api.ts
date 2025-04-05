import { httpGet } from '../http'

export const fetchAssetDataByCID = async (cid: string) => {
  // const response = await fetch(`/api/assets/${cid}`)
  const asset = await httpGet(`/api/assets/${cid}`)

  return asset
}
