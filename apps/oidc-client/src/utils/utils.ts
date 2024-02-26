export const getOpenIdConnectUrl = (urlSearchParams: URLSearchParams) => {
  const clientId = urlSearchParams.get('client_id')
  const externalUrl = urlSearchParams.get('external_url')
  const loginId = urlSearchParams.get('login_id')

  if (!clientId || !externalUrl || !loginId) {
    throw new Error('Missing required parameters')
  }

  return `openid-vc://?client_id=${clientId}&request_uri=${encodeURIComponent(
    externalUrl + '/api/presentCredential?login_id=' + loginId,
  )}`
}
