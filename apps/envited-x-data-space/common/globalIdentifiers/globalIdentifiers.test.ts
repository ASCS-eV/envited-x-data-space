import { GlobalIdentifier } from '../types'
import { parseGlobalIdentifier, stringifyGlobalIdentifier } from './globalIdentifiers'

describe('Global Identifier Utilities', () => {
  const didPkhIdentifier: GlobalIdentifier = {
    method: 'did:pkh',
    namespace: 'exampleNamespace',
    chainId: '1234',
    nss: 'exampleNSS',
  }

  const didPkhString = 'did:pkh:exampleNamespace:1234:exampleNSS'

  const uuidIdentifier: GlobalIdentifier = {
    method: 'urn:uuid',
    nss: 'UUID',
  }

  const uuidString = 'urn:uuid:UUID'

  describe('stringifyGlobalIdentifier', () => {
    it.each([
      { identifier: didPkhIdentifier, expected: didPkhString },
      { identifier: uuidIdentifier, expected: uuidString },
    ])('should convert a GlobalIdentifier to a string', ({ identifier, expected }) => {
      const result = stringifyGlobalIdentifier(identifier)
      expect(result).toBe(expected)
    })
  })

  describe('parseGlobalIdentifier', () => {
    it.each([
      { input: didPkhString, expected: didPkhIdentifier },
      { input: uuidString, expected: uuidIdentifier },
    ])('should parse a string back into a GlobalIdentifier', ({ input, expected }) => {
      const result = parseGlobalIdentifier(input)
      expect(result).toEqual(expected)
    })

    it('should handle empty strings gracefully', () => {
      const result = parseGlobalIdentifier('')
      expect(result).toEqual({})
    })

    it('should handle strings with missing values', () => {
      const result = parseGlobalIdentifier('did:pkh::1234:')
      expect(result).toEqual({ method: 'did:pkh', namespace: null, chainId: '1234', nss: null })
    })

    it('should handle Tezos DIDs by converting tz namespace to tezos with specific chainId', () => {
      const tezosDid = 'did:pkh:tz:exampleAddress'
      const expected: GlobalIdentifier = {
        method: 'did:pkh',
        namespace: 'tezos',
        chainId: 'NetXnHfVqm9iesp',
        nss: 'exampleAddress',
      }
      const result = parseGlobalIdentifier(tezosDid)
      expect(result).toEqual(expected)
    })
  })
})
