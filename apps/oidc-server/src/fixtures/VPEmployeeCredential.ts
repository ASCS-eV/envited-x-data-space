export const VPEmployeeCredential = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  'id': 'urn:uuid:befddbe3-4cbc-430a-b5b5-b61b3850b14a',
  'type': ['VerifiablePresentation'],
  'verifiableCredential': {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      {
        StatusList2021Entry: {
          '@context': {
            '@protected': true,
            'id': '@id',
            'statusListCredential': {
              '@id': 'https://w3id.org/vc/status-list#statusListCredential',
              '@type': '@id',
            },
            'statusListIndex': 'https://w3id.org/vc/status-list#statusListIndex',
            'statusPurpose': 'https://w3id.org/vc/status-list#statusPurpose',
            'type': '@type',
          },
          '@id': 'https://w3id.org/vc/status-list#StatusList2021Entry',
        },
        EmployeeCredential: {
          '@context': {
            '@protected': true,
            '@version': 1.1,
            'email': 'schema:email',
            'ethereumAddress': 'schema:identifier',
            'hasCountry': 'schema:addressCountry',
            'hasJurisdiction': 'schema:addressCountry',
            'hasLegallyBindingName': 'schema:legalName',
            'hasRegistrationNumber': 'schema:identifier',
            'hash': 'schema:sha256',
            'id': '@id',
            'leiCode': 'schema:leiCode',
            'name': 'schema:name',
            'parentOrganisation': 'schema:legalName',
            'schema': 'https://schema.org/',
            'subOrganisation': 'schema:legalName',
            'surname': 'schema:givenName',
            'title': 'schema:jobTitle',
            'type': '@type',
          },
          '@id': 'urn:employeecredential',
        },
      },
    ],
    'id': 'urn:uuid:2eb827bc-8ecc-11ee-9722-0a1628958560',
    'type': ['VerifiableCredential', 'EmployeeCredential'],
    'credentialSubject': {
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
    'issuer': 'did:tz:tz1NyjrTUNxDpPaqNZ84ipGELAcTWYg6s5Du',
    'issuanceDate': '2023-11-29T15:30:10.335704Z',
    'proof': {
      '@context': {
        Ed25519BLAKE2BDigestSize20Base58CheckEncodedSignature2021: {
          '@context': {
            '@protected': true,
            '@version': 1.1,
            'challenge': 'https://w3id.org/security#challenge',
            'created': {
              '@id': 'http://purl.org/dc/terms/created',
              '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            },
            'domain': 'https://w3id.org/security#domain',
            'expires': {
              '@id': 'https://w3id.org/security#expiration',
              '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            },
            'id': '@id',
            'jws': 'https://w3id.org/security#jws',
            'nonce': 'https://w3id.org/security#nonce',
            'proofPurpose': {
              '@context': {
                '@protected': true,
                '@version': 1.1,
                'assertionMethod': {
                  '@container': '@set',
                  '@id': 'https://w3id.org/security#assertionMethod',
                  '@type': '@id',
                },
                'authentication': {
                  '@container': '@set',
                  '@id': 'https://w3id.org/security#authenticationMethod',
                  '@type': '@id',
                },
                'id': '@id',
                'type': '@type',
              },
              '@id': 'https://w3id.org/security#proofPurpose',
              '@type': '@vocab',
            },
            'publicKeyJwk': {
              '@id': 'https://w3id.org/security#publicKeyJwk',
              '@type': '@json',
            },
            'type': '@type',
            'verificationMethod': {
              '@id': 'https://w3id.org/security#verificationMethod',
              '@type': '@id',
            },
          },
          '@id': 'https://w3id.org/security#Ed25519BLAKE2BDigestSize20Base58CheckEncodedSignature2021',
        },
        Ed25519PublicKeyBLAKE2BDigestSize20Base58CheckEncoded2021: {
          '@id': 'https://w3id.org/security#Ed25519PublicKeyBLAKE2BDigestSize20Base58CheckEncoded2021',
        },
        P256BLAKE2BDigestSize20Base58CheckEncodedSignature2021: {
          '@context': {
            '@protected': true,
            '@version': 1.1,
            'challenge': 'https://w3id.org/security#challenge',
            'created': {
              '@id': 'http://purl.org/dc/terms/created',
              '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            },
            'domain': 'https://w3id.org/security#domain',
            'expires': {
              '@id': 'https://w3id.org/security#expiration',
              '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
            },
            'id': '@id',
            'jws': 'https://w3id.org/security#jws',
            'nonce': 'https://w3id.org/security#nonce',
            'proofPurpose': {
              '@context': {
                '@protected': true,
                '@version': 1.1,
                'assertionMethod': {
                  '@container': '@set',
                  '@id': 'https://w3id.org/security#assertionMethod',
                  '@type': '@id',
                },
                'authentication': {
                  '@container': '@set',
                  '@id': 'https://w3id.org/security#authenticationMethod',
                  '@type': '@id',
                },
                'id': '@id',
                'type': '@type',
              },
              '@id': 'https://w3id.org/security#proofPurpose',
              '@type': '@vocab',
            },
            'publicKeyJwk': {
              '@id': 'https://w3id.org/security#publicKeyJwk',
              '@type': '@json',
            },
            'type': '@type',
            'verificationMethod': {
              '@id': 'https://w3id.org/security#verificationMethod',
              '@type': '@id',
            },
          },
          '@id': 'https://w3id.org/security#P256BLAKE2BDigestSize20Base58CheckEncodedSignature2021',
        },
        P256PublicKeyBLAKE2BDigestSize20Base58CheckEncoded2021: {
          '@id': 'https://w3id.org/security#P256PublicKeyBLAKE2BDigestSize20Base58CheckEncoded2021',
        },
      },
      'type': 'Ed25519BLAKE2BDigestSize20Base58CheckEncodedSignature2021',
      'proofPurpose': 'assertionMethod',
      'verificationMethod': 'did:tz:tz1NyjrTUNxDpPaqNZ84ipGELAcTWYg6s5Du#blockchainAccountId',
      'created': '2023-11-29T15:30:27.583Z',
      'jws':
        'eyJhbGciOiJFZEJsYWtlMmIiLCJjcml0IjpbImI2NCJdLCJiNjQiOmZhbHNlfQ..EHmQL4JQ6RLZVFob3mH_Rlue3Nv9qyeug0ZYtysWJOfC-dJqCphb3li9llmSmazB1vvCFvG5WKTg2ooXpowYCg',
      'publicKeyJwk': {
        crv: 'Ed25519',
        kty: 'OKP',
        x: 'FUoLewH4w4-KdaPH2cjZbL--CKYxQRWR05Yd_bIbhQo',
      },
    },
    'expirationDate': '2024-11-28T15:30:10.335716Z',
    'credentialStatus': {
      id: 'https://revocation-registry.abc-federation.dev.gaiax.ovh/api/v1/revocations/credentials/ABC-Federation-revocation#51',
      type: 'StatusList2021Entry',
      statusListCredential:
        'https://revocation-registry.abc-federation.dev.gaiax.ovh/api/v1/revocations/credentials/ABC-Federation-revocation',
      statusPurpose: 'revocation',
      statusListIndex: '51',
    },
    'credentialSchema': {
      id: 'https://raw.githubusercontent.com/walt-id/waltid-ssikit-vclib/master/src/test/resources/schemas/ParticipantCredential.json',
      type: 'JsonSchemaValidator2018',
    },
    'validFrom': '2023-07-20T15:36:41Z',
    'issued': '2023-07-20T15:36:41Z',
  },
  'proof': {
    type: 'Ed25519Signature2018',
    proofPurpose: 'authentication',
    challenge: 'test',
    verificationMethod:
      'did:key:z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd#z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd',
    created: '2023-11-29T16:04:44.263Z',
    domain: 'https://ec80-2003-ee-af45-6c00-e0d1-7850-acea-8745.ngrok-free.app',
    jws: 'eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..4yZ9ttUWUqtizm7LUBOSosqHU8kv2D8rsiwJrgzbGxN_CRDeqIbvEw1gYQ7KBsDmYcKlwK-OG1cdQ2weEvJjCw',
  },
  'holder': 'did:key:z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd',
}
