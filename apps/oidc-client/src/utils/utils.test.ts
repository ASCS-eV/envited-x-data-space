import * as SUT from './utils'

describe('src/utils', () => {
  describe('getOpenIdConnectUrl', () => {
    it('should get the open id connect url as expected', () => {
      // when ... we want to get the open id connect url from the url search params
      // then ... it should get the url as expected
      const data = {
        clientId: 'CLIENT_ID',
        externalUrl: 'EXTERNAL_URL',
        loginId: 'LOGIN_ID',
      }

      const result = SUT.getOpenIdConnectUrl(data)

      expect(result).toEqual(
        'openid-vc://?client_id=CLIENT_ID&request_uri=EXTERNAL_URL%2Fpresent-credential%3Flogin_id%3DLOGIN_ID',
      )
    })

    it('should throw an error when not all url params are set', () => {
      // when ... we want to get the open id connect url from the url search params
      // then ... it should get the url as expected
      const data = {
        clientId: 'CLIENT_ID',
        externalUrl: 'EXTERNAL_URL',
      }

      const result = () => SUT.getOpenIdConnectUrl(data)

      expect(result).toThrow('Missing required parameters')
    })
  })
})
