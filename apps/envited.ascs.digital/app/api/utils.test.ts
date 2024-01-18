import { USER_CREDENTIAL } from '../../common/fixtures'
import * as SUT from './utils'

describe('api/utils', () => {
  describe('extractIdFromCredential', () => {
    it('should return the id from the credentialSubject', () => {
      // when ... we want to get the id from the credential
      // then ... we should get the id as expected
      const result = SUT.extractIdFromCredential(USER_CREDENTIAL)

      expect(result).toEqual('did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeE')
    })
  })

  describe('extractIssuerIdFromCredential', () => {
    it('should return the issuer id from the credential', () => {
      // when ... we want to get the issuer id from the credential
      // then ... we should get the id as expected
      const result = SUT.extractIssuerIdFromCredential(USER_CREDENTIAL)

      expect(result).toEqual('did:pkh:tz:tz1bpeJArd7apJyTUryfXH1SD6w8GL6Gwhj8')
    })
  })

  describe('extractTypeFromCredential', () => {
    it('should return the type from the credentialSubject', () => {
      // when ... we want to get the type from the credential
      // then ... we should get the type as expected
      const result = SUT.extractTypeFromCredential(USER_CREDENTIAL)

      expect(result).toEqual('AscsUser')
    })
  })
})
