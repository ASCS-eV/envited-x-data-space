import { httpGet } from '../http'

export const fetchAssetDataByCID = async (cid: string) => httpGet(`/api/assets/${cid}`)

export const fetchGlobalIdentifierByScopedIdentifier = async (scopedIdentifier: string) =>
  httpGet(`/api/global-identifiers/${scopedIdentifier}`)

export const fetchTokenByScopedIdentifier = async (scopedIdentifier: string) =>
  httpGet(`/api/tokens/${scopedIdentifier}`)
