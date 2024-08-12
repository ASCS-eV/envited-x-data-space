/**
 * Copyright 2024 Software Engineering for Business Information Systems (sebis) <matthes@tum.de> .
 * SPDX-License-Identifier: MIT
 */
import {
  verifyCredential as spruceVerifyCredential,
  verifyPresentation as spruceVerifyPresentation,
} from '@spruceid/didkit-wasm-node'
import crypto from 'crypto'
import { JSONPath } from 'jsonpath-plus'
import {
  __,
  addIndex,
  append,
  assoc,
  equals,
  fromPairs,
  gt,
  has,
  isEmpty,
  isNil,
  lensProp,
  map,
  over,
  pipe,
  propSatisfies,
  reduce,
  reject,
  split,
  when,
} from 'ramda'

import { policies } from '../config/policies'
import { ClaimEntry, CredentialPattern, ExpectedCredential, LoginPolicy } from '../types'

export const generatePresentationDefinition = (policy: LoginPolicy, inputDescriptorOverride: any = null) => {
  if (isNil(policy)) {
    throw Error('A policy must be specified to generate a presentation definition')
  }

  let pd: any = {
    format: {
      ldp_vc: {
        proof_type: ['JsonWebSignature2020', 'Ed25519Signature2018', 'EcdsaSecp256k1Signature2019', 'RsaSignature2018'],
      },
      ldp_vp: {
        proof_type: ['JsonWebSignature2020', 'Ed25519Signature2018', 'EcdsaSecp256k1Signature2019', 'RsaSignature2018'],
      },
    },
    id: crypto.randomUUID(),
    name: 'VC Login Service',
    purpose: 'Sign-in',
    submission_requirements: [],
    input_descriptors: [],
  }

  if (!isNil(inputDescriptorOverride)) {
    pd.input_descriptors = inputDescriptorOverride
    return reject(isEmpty)(pd)
  }

  const submissionRequirementsLens = lensProp('submission_requirements' as never)
  const inputDescriptorsLens = lensProp('input_descriptors' as never)

  const addSubmissionRequirements =
    (submissionRequirementsLens: any) =>
    ({ patterns, credentialID }: ExpectedCredential) => {
      when(
        propSatisfies(gt(__, 1), 'length'),
        () =>
          (pd = over(
            submissionRequirementsLens,
            append({ rule: 'pick', count: 1, from: `group_${credentialID}` }),
          )(pd)),
      )(patterns)
    }

  const addInputDescriptors =
    (inputDescriptorsLens: any) =>
    ({ patterns, credentialID }: ExpectedCredential) => {
      let patternDescription: Record<string, any> = {
        id: credentialID,
        purpose: 'Sign-in',
        name: `Input descriptor for ${credentialID}`,
        constraints: {},
      }

      if (patterns.length > 1) {
        patternDescription = assoc('group', [`group_${credentialID}`])(patternDescription)
      }

      map(({ claims }: CredentialPattern) => {
        const fields: any = reduce(
          (acc, claim) =>
            when(propSatisfies(equals(true), 'required'), x => append({ path: [x.claimPath] })(acc))(claim),
          [],
        )(claims)

        if (fields.length > 0) {
          patternDescription = assoc('constraints', { fields })(patternDescription)
        }
      })(patterns)
      pd = over(inputDescriptorsLens, append(patternDescription))(pd)
    }

  map((expectation: ExpectedCredential) => {
    addSubmissionRequirements(submissionRequirementsLens)(expectation)
    addInputDescriptors(inputDescriptorsLens)(expectation)
  })(policy)

  addIndex(map)((inputDescriptor: unknown, idx: number) => {
    if (propSatisfies(isEmpty, 'constraints')(inputDescriptor)) {
      const inputDescriptorWithConstraints = assoc('constraints', {
        fields: [{ path: ['$.type'], filter: { type: 'string', pattern: 'VerifiableCredential' } }],
      })(inputDescriptor)

      pd.input_descriptors[idx] = inputDescriptorWithConstraints
    }
  })(pd.input_descriptors)
  return reject(isEmpty)(pd)
}

export const _verifyPresentation =
  ({
    spruceVerifyCredential,
    spruceVerifyPresentation,
  }: {
    spruceVerifyPresentation: any
    spruceVerifyCredential: any
  }) =>
  async (VC: any, VP: any): Promise<boolean> => {
    if (
      VP.holder &&
      VP.verifiableCredential.credentialSubject.id === VC.credentialSubject.id &&
      VP.proof.verificationMethod.split('#')[0] === VP.holder
    ) {
      // Verify the signature on the VC
      const verifyOptionsString = '{}'
      console.log(new Date().toISOString())
      console.log('Verify attempt', await spruceVerifyCredential(JSON.stringify(VC), verifyOptionsString))
      // TEST
      const t = {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            {
                "@protected": true,
                "@version": 1.1,
                "AscsMember": {
                    "@context": {
                        "@protected": true,
                        "@version": 1.1,
                        "address": "http://schema.org/address",
                        "articlesOfAssociation": "https://schema.org/termsOfService",
                        "contributionRules": "https://schema.org/termsOfService",
                        "isAscsMember": "http://schema.org/Boolean",
                        "isEnvitedMember": "http://schema.org/Boolean",
                        "name": "https://schema.org/name",
                        "privacyPolicy": "https://schema.org/termsOfService",
                        "url": "https://schema.org/url",
                        "vatID": "http://schema.org/vatID"
                    },
                    "@id": "https://schema.ascs.digital/AscsMemberCredential/v1#AscsMember"
                },
                "AscsMemberCredential": "https://schema.ascs.digital/AscsMemberCredential/v1#",
                "PostalAddress": {
                    "@context": {
                        "@protected": true,
                        "@version": 1.1,
                        "addressCountry": "https://schema.org/addressCountry",
                        "addressLocality": "http://schema.org/addressLocality",
                        "postalCode": "http://schema.org/postalCode",
                        "streetAddress": "http://schema.org/streetAddress"
                    },
                    "@id": "http://schema.org/PostalAddress"
                }
            }
        ],
        "credentialSubject": {
            "address": {
                "addressCountry": "+49",
                "addressLocality": "Aschheim",
                "postalCode": "85609",
                "streetAddress": "Jägerweg 10",
                "type": "PostalAddress"
            },
            "articlesOfAssociation": "https://asc-s.de/media/files/ascs_articles_of_association_2021-09-17.pdf",
            "contributionRules": "https://asc-s.de/media/files/ascs_Contribution_Rules_as_of_2020-07-08_YNCA2wi.pdf",
            "id": "did:pkh:tz:tz1Kj1XAEhrcuPS3rvZ8BGsUGDjv78ykEkEi",
            "isAscsMember": true,
            "isEnvitedMember": true,
            "name": "New Company Inc.",
            "privacyPolicy": "https://asc-s.de/datenschutz",
            "type": "AscsMember",
            "url": "",
            "vatID": "DE717717"
        },
        "expirationDate": "2102-09-15T17:14:33Z",
        "id": "urn:uuid:82384dff-454f-4a7a-87c4-d2be9dc93a90",
        "issuanceDate": "2024-04-23T12:44:38.620Z",
        "issuer": "did:pkh:tz:tz1ZBYB7Lwmoc7xbwq59mHK4GbiPhfPaEo2g",
        "proof": {
            "@context": {
                "TezosMethod2021": "https://w3id.org/security#TezosMethod2021",
                "TezosSignature2021": {
                    "@context": {
                        "@protected": true,
                        "@version": 1.1,
                        "challenge": "https://w3id.org/security#challenge",
                        "created": {
                            "@id": "http://purl.org/dc/terms/created",
                            "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
                        },
                        "domain": "https://w3id.org/security#domain",
                        "expires": {
                            "@id": "https://w3id.org/security#expiration",
                            "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
                        },
                        "id": "@id",
                        "nonce": "https://w3id.org/security#nonce",
                        "proofPurpose": {
                            "@context": {
                                "@protected": true,
                                "@version": 1.1,
                                "assertionMethod": {
                                    "@container": "@set",
                                    "@id": "https://w3id.org/security#assertionMethod",
                                    "@type": "@id"
                                },
                                "authentication": {
                                    "@container": "@set",
                                    "@id": "https://w3id.org/security#authenticationMethod",
                                    "@type": "@id"
                                },
                                "id": "@id",
                                "type": "@type"
                            },
                            "@id": "https://w3id.org/security#proofPurpose",
                            "@type": "@vocab"
                        },
                        "proofValue": "https://w3id.org/security#proofValue",
                        "publicKeyJwk": {
                            "@id": "https://w3id.org/security#publicKeyJwk",
                            "@type": "@json"
                        },
                        "type": "@type",
                        "verificationMethod": {
                            "@id": "https://w3id.org/security#verificationMethod",
                            "@type": "@id"
                        }
                    },
                    "@id": "https://w3id.org/security#TezosSignature2021"
                }
            },
            "created": "2024-04-23T12:44:38.624Z",
            "proofPurpose": "assertionMethod",
            "proofValue": "edsigtns9t53vTqh7LxPhBAj6y9CHkWAtg7R1TPQQZid1xtt1Wu5hAmVEawVGcbp4u44FHZzPksRszwT3vP1ZYEzefSQeusn4Qz",
            "publicKeyJwk": {
                "alg": "EdBlake2b",
                "crv": "Ed25519",
                "kty": "OKP",
                "x": "wQwP7kofPqTHCBSs2FmH21jiK7Agg9N02VXiFmXeOMQ"
            },
            "type": "TezosSignature2021",
            "verificationMethod": "did:pkh:tz:tz1ZBYB7Lwmoc7xbwq59mHK4GbiPhfPaEo2g#TezosMethod2021"
        },
        "type": [
            "VerifiableCredential",
            "AscsMemberCredential"
        ]
    }
    console.log('Verify attempt T', await spruceVerifyCredential(JSON.stringify(t), verifyOptionsString))
      // TEST


      const verifyResult = JSON.parse(await spruceVerifyCredential(JSON.stringify(VC), verifyOptionsString))
      // If credential verification is successful, verify the presentation
      if (verifyResult?.errors?.length === 0) {
        const res = JSON.parse(await spruceVerifyPresentation(JSON.stringify(VP), verifyOptionsString))
        // If verification is successful
        if (res.errors.length === 0) {
          return true
        } else {
          const errorMessage = `Unable to verify presentation: ${res.errors.join(', ')}`
          console.error(errorMessage)
        }
      } else {
        const errorMessage = `Unable to verify credential: ${verifyResult.errors.join(', ')}`
        console.error(errorMessage)
      }
    } else {
      const errorMessage = 'The credential subject does not match the VP holder'
      console.error(errorMessage)
    }
    return false
  }

export const verifyPresentation = _verifyPresentation({ spruceVerifyCredential, spruceVerifyPresentation })

export const _verifyAuthenticationPresentation = (verifyPresentation: any) => async (VP: any) => {
  try {
    if (!VP?.verifiableCredential) {
      console.error('Unable to detect verifiable credentials in the VP')
      return false
    }

    const creds = Array.isArray(VP.verifiableCredential) ? VP.verifiableCredential : [VP.verifiableCredential]

    for (const cred of creds) {
      if (!(await verifyPresentation(cred, VP))) {
        console.log('Unable to verify presentation', cred, VP)
        return false
      }
    }

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const verifyAuthenticationPresentation = _verifyAuthenticationPresentation(verifyPresentation)

export const isTrustedPresentation = (VP: any, policy?: LoginPolicy) => {
  const configuredPolicy = policies[process.env.LOGIN_POLICY || '']
  if (!policy && configuredPolicy === undefined) return false

  const usedPolicy = policy ? policy : configuredPolicy!

  const creds = VP.verifiableCredential
  const credArr = !Array.isArray(creds) ? [creds] : creds

  // collect all credentials that fit an expected credential
  const patternFits = []
  for (const expectation of usedPolicy) {
    const fittingCreds = []
    for (const cred of credArr) {
      if (isCredentialFittingPatternList(cred, expectation.patterns)) {
        fittingCreds.push(cred as never)
      }
    }
    patternFits.push(fittingCreds as never)
  }

  return hasUniquePath(patternFits, [])
}

export const hasUniquePath = (patternFits: any[][], usedCreds: any[]): boolean => {
  if (patternFits.length === 1) return patternFits[0].length > 0

  for (const cred of patternFits[0]) {
    if (!usedCreds.includes(cred)) {
      usedCreds.push(cred)
      const newPatternFits = patternFits.slice(1)
      if (hasUniquePath(newPatternFits, usedCreds)) {
        return true
      }
      usedCreds.pop()
    }
  }
  return false
}

export const isCredentialFittingPatternList = (cred: any, patterns: CredentialPattern[]): boolean => {
  for (const pattern of patterns) {
    if (isCredentialFittingPattern(cred, pattern)) {
      return true
    }
  }
  return false
}

export const isCredentialFittingPattern = (cred: any, pattern: CredentialPattern): boolean => {
  if (cred.issuer !== pattern.issuer && pattern.issuer !== '*') {
    return false
  }

  for (const claim of pattern.claims) {
    if ((!has('required')(claim) || claim.required) && JSONPath({ path: claim.claimPath, json: cred, resultType: 'path' }).length === 0) {
      return false
    }
  }

  return true
}

export const exportedForTesting = {
  hasUniquePath,
}

export const extractClaims = (VP: any, policy?: LoginPolicy) => {
  const configuredPolicy = policies[process.env.LOGIN_POLICY || 'acceptAnything']
  if (!policy && configuredPolicy === undefined) return false

  const usedPolicy = policy ? policy : configuredPolicy!

  const creds = Array.isArray(VP.verifiableCredential) ? VP.verifiableCredential : [VP.verifiableCredential]
  const vcClaims = creds.map((vc: any) => extractClaimsFromVC(vc, usedPolicy))
  const claims = vcClaims.reduce((acc: any, vc: any) => Object.assign(acc, vc), {})
  return claims
}

export const extractClaimsFromVC = (VC: any, policy: LoginPolicy) => {
  for (const expectation of policy) {
    for (const pattern of expectation.patterns) {
      if (pattern.issuer === VC.issuer || pattern.issuer === '*') {
        const containsAllRequired =
          pattern.claims.filter((claim: ClaimEntry) => {
            const claimPathLength = JSONPath({ path: claim.claimPath, json: VC, resultType: 'path' }).length
            return claim.required && claimPathLength === 1
          }).length > 0 || pattern.claims.filter((claim: ClaimEntry) => claim.required).length === 0

        if (!containsAllRequired) {
          continue
        }

        const extractedClaims = {
          tokenId: {},
          tokenAccess: {},
        }

        for (const claim of pattern.claims) {
          const nodes = JSONPath({ path: claim.claimPath, json: VC, resultType: 'all' })
          let newPath = claim.newPath
          let value: any

          if (nodes.length > 1) {
            if (!newPath) {
              throw Error('New path not defined for multi-valued claim: ' + claim.claimPath)
            }

            value = nodes
              .map((node: any) => {
                const obj: any = {}
                obj[node.path[node.path.length - 1]] = node.value
                return obj
              })
              .reduce((acc: any, vals: any) => Object.assign(acc, vals), {})
          } else {
            if (!newPath) {
              newPath = '$.' + nodes[0].path[nodes[0].path.length - 1]
            }

            value = nodes[0].value
          }

          const claimTarget = claim.token === 'id_token' ? extractedClaims.tokenId : extractedClaims.tokenAccess
          setJsonPathValue(claimTarget, newPath, value)
        }

        return extractedClaims
      }
    }
  }

  return {}
}

function setJsonPathValue(target: Record<string, any>, path: string, value: any) {
  // Find the nodes that match the path
  const nodes = JSONPath({ path: path, json: target, resultType: 'all' });

  if (nodes.length > 0) {
      // If the path exists, update the value at the last node
      nodes.forEach(node => {
          const parent = node.parent;
          const lastKey = node.path[node.path.length - 1];
          parent[lastKey] = value;
      });
  } else {
      // If the path does not exist, you may need to create it manually
      // Here, we'll create the path and set the value.
      createPathAndSetValue(target, path, value);
  }
}

function createPathAndSetValue(target: Record<string, any>, path: string, value: any) {
  const keys = path.replace(/^\$|\[(\d+)\]/g, ".$1").split('.').slice(1);
  let current = target;

  for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];

      if (!(key in current)) {
          current[key] = isNaN(Number(keys[i + 1])) ? {} : [];
      }

      current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

export const queryStringToJSON = pipe(
  split('&'),
  map(pipe(
    split('='),
    map(decodeURIComponent), 
    pair => [pair[0], pair[1] || ''] as [string, string] 
  )),
  fromPairs,
)
