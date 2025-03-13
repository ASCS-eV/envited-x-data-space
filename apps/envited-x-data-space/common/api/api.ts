export const fetchAssetDataByCID = async (cid: string) => {
  const response = await fetch(`/api/assets/${cid}`)

  return response.json()
}
