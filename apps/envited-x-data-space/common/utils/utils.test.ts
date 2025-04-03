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
      [[undefined, true, true], false],
      [[true, false], false],
      [[true, true], true],
    ])('should, with value %s, return %s as expected', (array, result) => {
      // when ... rendering component
      // then ... should render with expected properties
      expect(SUT.allTrue(array)).toBe(result)
    })
  })

  describe('anyFalse', () => {
    it.each([
      [[true, false], true],
      [[true, true], false],
    ])('should, with value %s, return %s as expected', (array, result) => {
      // when ... rendering component
      // then ... should render with expected properties
      expect(SUT.anyFalse(array)).toBe(result)
    })
  })

  describe('extractAddressFromDid', () => {
    it.each([
      ['did:pkh:tz:tz1bpeJArd7apJyTUryfXH1SD6w8GL6Gwhj8', 'tz1bpeJArd7apJyTUryfXH1SD6w8GL6Gwhj8'],
      ['did:pkh:tz:tz1ggujjYjA7oYoaZBzTg1tYSXn3VMjcgDuv', 'tz1ggujjYjA7oYoaZBzTg1tYSXn3VMjcgDuv'],
    ])('should, with value %s, return %s as expected', (did, result) => {
      // when ... we want to get a address from did
      // then ... we should get the address as expected
      expect(SUT.extractAddressFromDid(did)).toBe(result)
    })
  })

  describe('truncateDID', () => {
    it.each([
      ['did:pkh:tz12345678dSTkn2HMEuGa4b1oABCDEFGHIJ', 'did:pkh:tz…ABCDEFGHIJ'],
      ['', ''],
    ])('should, with value %s, return %s as expected', (value, result) => {
      // when ... we provide a value
      // then ... it should return as expected
      expect(SUT.truncateDID(value)).toEqual(result)
    })
  })

  describe('truncateCID', () => {
    it.each([
      ['QmPwE3TS2hPxvCosUZJyF3RABMdKjT63K9fNroFMtqeEaH', 'QmPwE3TS2h…roFMtqeEaH'],
      ['', ''],
    ])('should, with value %s, return %s as expected', (value, result) => {
      // when ... we provide a value
      // then ... it should return as expected
      expect(SUT.truncateCID(value)).toEqual(result)
    })
  })

  describe('addUrn', () => {
    it.each([
      ['uuid', '1234', 'urn:uuid:1234'],
      ['did:tz', '5678', 'urn:did:tz:5678'],
    ])('should, with type %s and uuid %s, return %s as expected', (type, uuid, result) => {
      // when ... we want to add urn to the uuid
      // then ... we should get the urn as expected
      expect(SUT.addUrn(type)(uuid)).toEqual(result)
    })
  })

  describe('addUrnUuid', () => {
    it.each([
      ['1234', 'urn:uuid:1234'],
      ['5678', 'urn:uuid:5678'],
    ])('should, with uuid %s, return %s as expected', (uuid, result) => {
      // when ... we want to add urn to the uuid
      // then ... we should get the urn as expected
      expect(SUT.addUrnUuid(uuid)).toEqual(result)
    })
  })

  describe('formatTokenAttributes', () => {
    it('should return an object with token attributes as expexcted', () => {
      // when ... we want to format a token attributes object
      // then ... we should fromat as expected
      const attributes = [
        {
          tokenId: 'TOKEN_ID',
          name: 'hdmap:georeference:georeference:projectLocation:georeference:city',
          value: 'CITY',
        },
        {
          tokenId: 'TOKEN_ID',
          name: 'hdmap:georeference:georeference:projectLocation:georeference:relationOrArea',
          value: 'AREA',
        },
      ]

      const result = {
        hdmap: {
          georeference: {
            georeference: {
              projectLocation: {
                georeference: {
                  city: 'CITY',
                  relationOrArea: 'AREA',
                },
              },
            },
          },
        },
      }

      expect(SUT.formatTokenAttributes(attributes)).toEqual(result)
    })
  })

  describe('formatSectionName', () => {
    it.each([
      ['hdmap:georeference:projectLocation', 'projectLocation'],
      ['general:description', 'description'],
      ['singleWordWithoutColon', 'singleWordWithoutColon'],
      ['', ''],
    ])('should extract the last part after colon from %s and return %s', (input, expected) => {
      // when ... we want to format a section name
      // then ... it should return the last part after colon
      expect(SUT.formatSectionName(input)).toEqual(expected)
    })
  })

  describe('formatItemName', () => {
    it.each([
      ['formatTabName', 'Format Tab Name'],
      ['camelCase', 'Camel Case'],
      ['PascalCase', 'Pascal Case'],
      ['snake_case', 'Snake_case'], // Note: doesn't handle snake_case specifically
      ['version2', 'Version 2'],
      ['temp32C', 'Temp 3 2C'],
      ['', ''],
    ])('should format %s as %s', (input, expected) => {
      // when ... we want to format an item name
      // then ... it should split at capital letters and properly capitalize
      expect(SUT.formatItemName(input)).toEqual(expected)
    })
  })

  describe('capitalize', () => {
    it.each([
      ['hello', 'Hello'],
      ['world', 'World'],
      ['ALREADY', 'ALREADY'], // Already capitalized
      ['a', 'A'], // Single letter
      ['123abc', '123abc'], // Starts with number
      ['', ''], // Empty string
    ])('should capitalize %s as %s', (input, expected) => {
      // when ... we want to capitalize a string
      // then ... it should capitalize the first letter only
      expect(SUT.capitalize(input)).toEqual(expected)
    })
  })

  describe('displayItemValue', () => {
    it.each([
      [[1, 2, 3], '1, 2, 3'], // Array of numbers should be joined with commas
      [['apple', 'banana', 'cherry'], 'Apple, Banana, Cherry'], // Array of strings should be capitalized
      [['hello world', 'test'], 'Hello world, Test'], // Only first letter of each string should be capitalized
      [['a', 'b', 'c'], 'A, B, C'], // Single letters should be capitalized
      [['a', 1, true], 'A, 1, true'], // Mixed types - only strings should be capitalized
      ['text', 'Text'], // String should be returned capitalized
      [123, 123], // Number should be returned as is
      [true, true], // Boolean should be returned as is
      [false, false], // Boolean should be returned as is
      [{ key: 'value' }, ''], // Object should return empty string
      [null, ''], // Null should return empty string
      [undefined, undefined], // Undefined is not an object, so should return undefined
    ])('should format value %s as %s', (input, expected) => {
      // when ... we want to display an item value
      // then ... it should format it correctly based on its type
      expect(SUT.displayItemValue(input)).toEqual(expected)
    })
  })

  describe('kebabToCamelCase', () => {
    it('should convert a kebab-case string to camelCase', () => {
      // when ... we convert kebab-case strings to camelCase
      // then ... we should get the expected camelCase strings
      expect(SUT.kebabToCamelCase('word-word')).toEqual('wordWord')
      expect(SUT.kebabToCamelCase('multiple-word-string')).toEqual('multipleWordString')
      expect(SUT.kebabToCamelCase('single')).toEqual('single')
      expect(SUT.kebabToCamelCase('kebab-case-to-camel-case')).toEqual('kebabCaseToCamelCase')
    })

    it('should handle edge cases properly', () => {
      // when ... we pass edge cases to the function
      // then ... we should handle them correctly
      expect(SUT.kebabToCamelCase('')).toEqual('')
      expect(SUT.kebabToCamelCase('-')).toEqual('')
      expect(SUT.kebabToCamelCase('--')).toEqual('')
      expect(SUT.kebabToCamelCase('word-')).toEqual('word')
      expect(SUT.kebabToCamelCase('-word')).toEqual('Word')
    })
  })
})
