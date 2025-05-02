import { httpGet } from '../http'

export const fetchAssetDataByCID = async (cid: string) => httpGet(`/api/assets/${cid}`)

export const fetchGlobalIdentifierByFullResourceName = async (fullResourceName: string) =>
  httpGet(`/api/global-identifiers/${fullResourceName}`)

export const fetchTokenByFullResourceName = async (fullResourceName: string) =>
  httpGet(`/api/tokens/${fullResourceName}`)
