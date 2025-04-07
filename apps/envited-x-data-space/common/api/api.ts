import { httpGet } from '../http'

export const fetchAssetDataByCID = async (cid: string) => httpGet(`/api/assets/${cid}`)
