export const getOpenIdConnectUrl = data => {
  const { clientId, externalUrl, loginId } = data
  if (!clientId || !externalUrl || !loginId) {
    throw new Error('Missing required parameters')
  }

  return `openid-vc://?client_id=${clientId}&request_uri=${encodeURIComponent(
    `${externalUrl}/present-credential?login_id=${loginId}`,
  )}`
}
