import { USER_CREDENTIAL } from '../fixtures'
import * as SUT from './utils'

describe('common/utils', () => {
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

  describe('slugify', () => {
    it('should create a slug of the string as expected', () => {
      // when ... we want to create a slug of the string
      // then ... we should get the slug as expected
      const result = SUT.slugify('This is a test')

      expect(result).toEqual('this-is-a-test')
    })
  })

  describe('createRandomString', () => {
    const result = SUT.createRandomString(5)

    expect(result).toHaveLength(5)
  })

  describe('segmentsToPath', () => {
    it('should return the url', () => {
      // when ... we want to format a url from a array of paths
      // then ... we should get the url as expected
      const pathNames = ['assets', 'detail']
      const result = SUT.segmentsToPath(pathNames)(1)

      expect(result).toEqual('/assets')
    })

    it('should return the url of second level', () => {
      // when ... we want to format a url from a array of paths
      // then ... we should get the url as expected
      const pathNames = ['assets', 'detail']
      const result = SUT.segmentsToPath(pathNames)(2)

      expect(result).toEqual('/assets/detail')
    })
  })

  describe('slugToLabel', () => {
    it.each([
      ['breadcrumb-label', 'Breadcrumb label'],
      ['breadcrumb', 'Breadcrumb'],
      ['breadcrumb-la-bel', 'Breadcrumb la bel'],
    ])('should format a label from the slug', (slug, label) => {
      // when ... we want to get a label from a path
      // then ... we should get the label as expected

      const result = SUT.slugToLabel(slug)
      expect(result).toEqual(label)
    })
  })

  describe('allTrue', () => {
    it.each([
      [[true, false], false],
      [[true, true], true],
    ])('should, with value %s, return %s as expected', (array, result) => {
      // when ... rendering component
      // then ... should render with expected properties
      expect(SUT.allTrue(array)).toBe(result)
    })
  })
})
