import * as SUT from './utils'

describe('src/utils', () => {
  describe('getOpenIdConnectUrl', () => {
    it('should get the open id connect url as expected', () => {
      // when ... we want to get the open id connect url from the url search params
      // then ... it should get the url as expected
      const params = new URLSearchParams()
      params.set('client_id', 'CLIENT_ID')
      params.set('external_url', 'EXTERNAL_URL')
      params.set('login_id', 'LOGIN_ID')

      const result = SUT.getOpenIdConnectUrl(params)

      expect(result).toEqual(
        'openid-vc://?client_id=CLIENT_ID&request_uri=EXTERNAL_URL%2Fapi%2FpresentCredential%3Flogin_id%3DLOGIN_ID',
      )
    })

    it('should throw an error when not all url params are set', () => {
      // when ... we want to get the open id connect url from the url search params
      // then ... it should get the url as expected
      const params = new URLSearchParams()
      params.set('client_id', 'CLIENT_ID')
      params.set('external_url', 'EXTERNAL_URL')

      const result = () => SUT.getOpenIdConnectUrl(params)

      expect(result).toThrow('Missing required parameters')
    })
  })
})
