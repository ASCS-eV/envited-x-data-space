import { dissoc } from 'ramda'

import { policies } from '../config/policies'
import { VPEmailPass, VPEmployeeCredential, VPTezos } from '../fixtures'
import * as SUT from './utils'

describe('utils', () => {
  describe('generatePresentationDefinition', () => {
    it('should generate a presentation definition with acceptAnything policy as expected', () => {
      // when ... we want to generate a presentation definition with acceptAnything policy
      // then ... we should get a presentation definition as expected
      const result = SUT.generatePresentationDefinition(policies.acceptAnything)
      const expected = {
        format: {
          ldp_vc: {
            proof_type: [
              'JsonWebSignature2020',
              'Ed25519Signature2018',
              'EcdsaSecp256k1Signature2019',
              'RsaSignature2018',
            ],
          },
          ldp_vp: {
            proof_type: [
              'JsonWebSignature2020',
              'Ed25519Signature2018',
              'EcdsaSecp256k1Signature2019',
              'RsaSignature2018',
            ],
          },
        },
        id: expect.any(String),
        name: 'VC Login Service',
        purpose: 'Sign-in',
        input_descriptors: [
          {
            id: 'credential1',
            purpose: 'Sign-in',
            name: 'Input descriptor for credential1',
            constraints: {
              fields: [
                {
                  path: ['$.type'],
                  filter: {
                    type: 'string',
                    pattern: 'VerifiableCredential',
                  },
                },
              ],
            },
          },
        ],
      }

      expect(result).toEqual(expected)
    })

    it('should generate a presentation definition with accept employee from anyone policy as expected', () => {
      // when ... we want to generate a presentation definition with accept employee from anyone policy
      // then ... we should get a presentation definition as expected
      const result = SUT.generatePresentationDefinition(policies.acceptEmployeeFromAnyone)
      const expected = {
        format: {
          ldp_vc: {
            proof_type: [
              'JsonWebSignature2020',
              'Ed25519Signature2018',
              'EcdsaSecp256k1Signature2019',
              'RsaSignature2018',
            ],
          },
          ldp_vp: {
            proof_type: [
              'JsonWebSignature2020',
              'Ed25519Signature2018',
              'EcdsaSecp256k1Signature2019',
              'RsaSignature2018',
            ],
          },
        },
        id: expect.any(String),
        name: 'VC Login Service',
        purpose: 'Sign-in',
        input_descriptors: [
          {
            id: 'one',
            purpose: 'Sign-in',
            name: 'Input descriptor for one',
            constraints: {
              fields: [
                {
                  path: ['$.type'],
                  filter: {
                    type: 'string',
                    pattern: 'VerifiableCredential',
                  },
                },
              ],
            },
          },
        ],
      }
      expect(result).toEqual(expected)
    })

    it('should generate a presentation definition with accept Email From Altme policy as expected', () => {
      // when ... we want to generate a presentation definition with accept Email From Altme policy
      // then ... we should get a presentation definition as expected
      const result = SUT.generatePresentationDefinition(policies.acceptEmailFromAltme)
      const expected = {
        format: {
          ldp_vc: {
            proof_type: [
              'JsonWebSignature2020',
              'Ed25519Signature2018',
              'EcdsaSecp256k1Signature2019',
              'RsaSignature2018',
            ],
          },
          ldp_vp: {
            proof_type: [
              'JsonWebSignature2020',
              'Ed25519Signature2018',
              'EcdsaSecp256k1Signature2019',
              'RsaSignature2018',
            ],
          },
        },
        id: expect.any(String),
        name: 'VC Login Service',
        purpose: 'Sign-in',
        input_descriptors: [
          {
            id: 'one',
            purpose: 'Sign-in',
            name: 'Input descriptor for one',
            constraints: {
              fields: [
                {
                  path: ['$.type'],
                  filter: {
                    type: 'string',
                    pattern: 'VerifiableCredential',
                  },
                },
              ],
            },
          },
        ],
      }
      expect(result).toEqual(expected)
    })

    it('should generate a presentation definition with accept Anything From Altme policy as expected', () => {
      // when ... we want to generate a presentation definition with accept Anything From Altme policy
      // then ... we should get a presentation definition as expected
      const result = SUT.generatePresentationDefinition(policies.acceptAnythingFromAltme)
      const expected = {
        format: {
          ldp_vc: {
            proof_type: [
              'JsonWebSignature2020',
              'Ed25519Signature2018',
              'EcdsaSecp256k1Signature2019',
              'RsaSignature2018',
            ],
          },
          ldp_vp: {
            proof_type: [
              'JsonWebSignature2020',
              'Ed25519Signature2018',
              'EcdsaSecp256k1Signature2019',
              'RsaSignature2018',
            ],
          },
        },
        id: expect.any(String),
        name: 'VC Login Service',
        purpose: 'Sign-in',
        input_descriptors: [
          {
            id: 'one',
            purpose: 'Sign-in',
            name: 'Input descriptor for one',
            constraints: {
              fields: [
                {
                  path: ['$.type'],
                  filter: {
                    type: 'string',
                    pattern: 'VerifiableCredential',
                  },
                },
              ],
            },
          },
        ],
      }
      expect(result).toEqual(expected)
    })

    it('should throw an error when the policy is not specified', () => {
      // when ... we want to generate a presentation definition without a policy
      // then ... we should get an error as expected
      expect(() => SUT.generatePresentationDefinition(null)).toThrow(
        'A policy must be specified to generate a presentation definition',
      )
    })
  })
  describe('verifyAuthenticationPresentation', () => {
    it('should verify the authentication presentation as expected', async () => {
      // when ... we want to verify the authentication presentation
      // then ... we should verify the authentication presentation as expected
      const verifyPresentationStub = jest.fn().mockResolvedValue(true)
      const result = await SUT._verifyAuthenticationPresentation(verifyPresentationStub)(VPEmployeeCredential)
      expect(result).toEqual(true)
    })

    it('should fail to verify because of missing credentials', async () => {
      // when ... we want to verify the authentication presentation without credentials
      // then ... it should return false
      const verifyPresentationStub = jest.fn().mockResolvedValue(true)
      const result = await SUT._verifyAuthenticationPresentation(verifyPresentationStub)(
        dissoc('verifiableCredential')(VPEmployeeCredential),
      )
      expect(result).toEqual(false)
    })

    it('should fail to verify because presentation missed', async () => {
      // when ... we want to verify the authentication presentation with failing verifyPresentation
      // then ... it should return false
      const verifyPresentationStub = jest.fn().mockResolvedValue(false)
      const result = await SUT._verifyAuthenticationPresentation(verifyPresentationStub)(
        dissoc('verifiableCredential')(VPEmployeeCredential),
      )
      expect(result).toEqual(false)
    })
  })
  describe('verifyPresentation', () => {
    it('should verify the presentation as expected', async () => {
      // when ... we want to verify the presentation
      // then ... we should verify the presentation as expected
      const spruceVerifyPresentationStub = jest.fn().mockResolvedValue(JSON.stringify({ errors: [] }))
      const spruceVerifyCredentialStub = jest.fn().mockResolvedValue(JSON.stringify({ errors: [] }))
      const vp = VPEmployeeCredential
      const result = await SUT._verifyPresentation({
        spruceVerifyCredential: spruceVerifyCredentialStub,
        spruceVerifyPresentation: spruceVerifyPresentationStub,
      })(vp.verifiableCredential, vp)
      expect(result).toEqual(true)
    })

    it('should be unable to verify the presentation because of Verify Presentation', async () => {
      // when ... we want to verify the presentation but Verify Presentation returns an error
      // then ... it should return false as expected
      const spruceVerifyPresentationStub = jest.fn().mockResolvedValue(JSON.stringify({ errors: ['ERROR'] }))
      const spruceVerifyCredentialStub = jest.fn().mockResolvedValue(JSON.stringify({ errors: [] }))
      const vp = VPEmployeeCredential
      const result = await SUT._verifyPresentation({
        spruceVerifyCredential: spruceVerifyCredentialStub,
        spruceVerifyPresentation: spruceVerifyPresentationStub,
      })(vp.verifiableCredential, vp)
      expect(result).toEqual(false)
    })

    it('should be unable to verify the presentation because of Verify Credential', async () => {
      // when ... we want to verify the presentation but the Verify Credential returns an error
      // then ... it should return false as expected
      const spruceVerifyPresentationStub = jest.fn().mockResolvedValue(JSON.stringify({ errors: [] }))
      const spruceVerifyCredentialStub = jest.fn().mockResolvedValue(JSON.stringify({ errors: ['ERROR'] }))
      const vp = VPEmployeeCredential
      const result = await SUT._verifyPresentation({
        spruceVerifyCredential: spruceVerifyCredentialStub,
        spruceVerifyPresentation: spruceVerifyPresentationStub,
      })(vp.verifiableCredential, vp)
      expect(result).toEqual(false)
    })

    it('should be unable to verify the presentation because VP holder does not match', async () => {
      // when ... we want to verify the presentation but the VP holder does not match
      // then ... it should return false as expected
      const spruceVerifyPresentationStub = jest.fn().mockResolvedValue(JSON.stringify({ errors: [] }))
      const spruceVerifyCredentialStub = jest.fn().mockResolvedValue(JSON.stringify({ errors: [] }))
      const vp = VPEmployeeCredential
      vp.holder = 'OTHER HOLDER'
      const result = await SUT._verifyPresentation({
        spruceVerifyCredential: spruceVerifyCredentialStub,
        spruceVerifyPresentation: spruceVerifyPresentationStub,
      })(vp.verifiableCredential, vp)
      expect(result).toEqual(false)
    })
  })
  describe('hasUniquePath', () => {
    it.each([
      [
        [
          ['A', 'B'],
          ['C', 'D'],
          ['E', 'F'],
        ],
        ['A', 'C', 'E'],
        true,
      ],
      [
        [
          ['A', 'B'],
          ['C', 'D'],
          ['E', 'F'],
        ],
        ['A', 'C', 'E', 'B'],
        false,
      ],
      [[[]], [], false],
    ])('should return as expected when checking for unique path', (patternFits, usedCreds, expected) => {
      // when ... we want to check for unique path
      // then ... we should return as expected when checking for unique path
      const result = SUT.hasUniquePath(patternFits, usedCreds)
      expect(result).toEqual(expected)
    })
  })
  describe('isTrustedPresentation', () => {
    it.each([
      [VPEmployeeCredential, undefined, false],
      [VPEmployeeCredential, policies.acceptAnything, true],
      [VPEmailPass, policies.acceptAnything, true],
      [VPTezos, policies.acceptAnything, true],
      [VPEmployeeCredential, policies.acceptEmployeeFromAnyone, true],
      [VPEmailPass, policies.acceptEmployeeFromAnyone, false],
      [VPTezos, policies.acceptEmployeeFromAnyone, false],
      [VPEmployeeCredential, policies.acceptEmailFromAltme, false],
      [VPEmailPass, policies.acceptEmailFromAltme, true],
      [VPTezos, policies.acceptEmailFromAltme, false],
      [VPEmployeeCredential, policies.acceptAnythingFromAltme, false],
      [VPEmailPass, policies.acceptAnythingFromAltme, true],
      [VPTezos, policies.acceptAnythingFromAltme, false],
    ])('should verify the presentation as trusted as expected', (VP, policy, expected) => {
      // when ... we want to verify the presentation as trusted
      // then ... we should verify the presentation as trusted as expected
      const result = SUT.isTrustedPresentation(VP, policy)
      expect(result).toEqual(expected)
    })
  })
  describe('isCredentialFittingPattern', () => {
    it.each([
      [
        {
          issuer: 'ISSUER',
        },
        {
          issuer: 'ISSUER',
          claims: [
            {
              required: false,
              claimPath: 'CLAIM_PATH',
            },
          ],
        },
        true,
      ],
      [
        {
          issuer: 'ISSUER',
        },
        {
          issuer: '*',
          claims: [
            {
              required: false,
              claimPath: 'CLAIM_PATH',
            },
          ],
        },
        true,
      ],
      [
        {
          issuer: 'ISSUER',
          CLAIM_PATH: 'VALUE',
        },
        {
          issuer: 'ISSUER',
          claims: [
            {
              required: true,
              claimPath: 'CLAIM_PATH',
            },
          ],
        },
        true,
      ],
      [
        {
          issuer: 'ISSUER',
        },
        {
          issuer: 'ISSUER',
          claims: [
            {
              required: true,
              claimPath: 'CLAIM_PATH',
            },
          ],
        },
        false,
      ],
      [
        {
          issuer: 'ISSUER',
        },
        {
          issuer: 'OTHER_ISSUER',
          claims: [
            {
              required: false,
              claimPath: 'CLAIM_PATH',
            },
          ],
        },
        false,
      ],
      [
        {
          issuer: 'ISSUER',
        },
        {
          issuer: 'ISSUER',
          claims: [
            {
              claimPath: 'CLAIM_PATH',
            },
          ],
        },
        false,
      ],
      [
        {
          issuer: 'ISSUER',
        },
        {
          issuer: 'ISSUER',
          claims: [
            {
              required: true,
              claimPath: 'CLAIM_PATH',
            },
          ],
        },
        false,
      ],
      [
        {
          issuer: 'ISSUER',
        },
        {
          issuer: 'ISSUER',
          claims: [
            {
              required: true,
              claimPath: 'CLAIM_PATH',
            },
          ],
        },
        false,
      ],
    ])(
      'should return true/false when the credential fits or does not fit the pattern',
      (credential, pattern, expected) => {
        // when ... we want to check if the credential fits the pattern
        // then ... we should return true/false when the credential fits or does not fit the pattern
        const result = SUT.isCredentialFittingPattern(credential, pattern)
        expect(result).toEqual(expected)
      },
    )
  })
  describe('extractClaims', () => {
    it.each([
      [
        VPEmployeeCredential,
        policies.acceptAnything,
        {
          tokenAccess: {
            subjectData: {
              id: 'did:key:z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd',
              hash: '9ecf754ffdad0c6de238f60728a90511780b2f7dbe2f0ea015115515f3f389cd',
              leiCode: '391200FJBNU0YW987L26',
              hasLegallyBindingName: 'deltaDAO AG',
              ethereumAddress: '0x4C84a36fCDb7Bc750294A7f3B5ad5CA8F74C4A52',
              email: 'test@test.com',
              hasRegistrationNumber: 'DEK1101R.HRB170364',
              name: 'Name Surname',
              hasCountry: 'GER',
              type: 'EmployeeCredential',
              title: 'CEO',
              hasJurisdiction: 'GER',
              surname: 'Surname',
            },
          },
          tokenId: {},
        },
      ],
      [
        VPEmailPass,
        policies.acceptEmailFromAltme,
        {
          tokenId: {
            email: 'felix.hoops@tum.de',
          },
          tokenAccess: {},
        },
      ],
      [
        VPEmployeeCredential,
        policies.acceptEmployeeFromAnyone,
        {
          tokenAccess: {
            companyName: 'deltaDAO AG',
          },
          tokenId: {
            email: 'test@test.com',
            name: 'Name Surname',
          },
        },
      ],
    ])('should extract the claims from the VC as expected', (vp, policy, expected) => {
      // when ... we want to extract the claims from the VC
      // then ... we should extract the claims from the VC as expected
      const result = SUT.extractClaims(vp, policy)
      expect(result).toEqual(expected)
    })
  })

  describe('queryStringToJSON', () => {
    it('should convert a query string to JSON as expected', () => {
      // when ... we want to convert a query string to JSON
      // then ... we should convert a query string to JSON as expected
      const result = SUT.queryStringToJSON('key1=value1&key2=value2')
      const expected = {
        key1: 'value1',
        key2: 'value2',
      }
      expect(result).toEqual(expected)
    })
  })
})
