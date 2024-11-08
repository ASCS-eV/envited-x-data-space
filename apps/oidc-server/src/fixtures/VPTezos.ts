export const VPTezos = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  'id': 'urn:uuid:9175110e-d09a-47c2-bfa1-e3b6cbc238ad',
  'type': ['VerifiablePresentation'],
  'verifiableCredential': {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      {
        TezosAssociatedAddress: {
          '@context': {
            '@protected': true,
            '@version': 1.1,
            'accountName': 'schema:identifier',
            'associatedAddress': 'schema:account',
            'cryptoWalletPayload': 'schema:identifier',
            'cryptoWalletSignature': 'schema:identifier',
            'id': '@id',
            'issuedBy': {
              '@context': {
                '@protected': true,
                '@version': 1.1,
                'name': 'schema:legalName',
                'schema': 'https://schema.org/',
              },
              '@id': 'schema:issuedBy',
            },
            'schema': 'https://schema.org/',
            'type': '@type',
          },
          '@id': 'https://github.com/TalaoDAO/context#tezosassociatedaddress',
        },
      },
    ],
    'id': 'urn:uuid:9aac1cdf-2753-47d2-a07b-d56c0070c28b',
    'type': ['VerifiableCredential', 'TezosAssociatedAddress'],
    'credentialSubject': {
      id: 'did:key:z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd',
      issuedBy: {
        name: 'My wallet',
      },
      accountName: 'Demo ascs',
      associatedAddress: 'tz1RvTJhbVPas1sCPDUQknNLXDdjWyF2hMXe',
      type: 'TezosAssociatedAddress',
    },
    'issuer': 'did:pkh:tz:tz1RvTJhbVPas1sCPDUQknNLXDdjWyF2hMXe',
    'issuanceDate': '2023-11-24T13:43:15Z',
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
      'verificationMethod': 'did:pkh:tz:tz1RvTJhbVPas1sCPDUQknNLXDdjWyF2hMXe#blockchainAccountId',
      'created': '2023-11-24T12:43:15.768Z',
      'jws':
        'eyJhbGciOiJFZEJsYWtlMmIiLCJjcml0IjpbImI2NCJdLCJiNjQiOmZhbHNlfQ..ajZUM4s4_SJGc22Xn0JWciaVD-CI0npfvv8rlROyx3BjP5Cmed8S453KjBE6GXf8pvW3peYM-eAsmOvxjzYbBg',
      'publicKeyJwk': {
        crv: 'Ed25519',
        kty: 'OKP',
        x: 'zCqtyJzkG7tGRonDKhz02vUrAYt58uyOjP_ETgF2pO8',
      },
    },
  },
  'proof': {
    type: 'Ed25519Signature2018',
    proofPurpose: 'authentication',
    challenge: 'test',
    verificationMethod:
      'did:key:z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd#z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd',
    created: '2023-11-29T14:14:25.282Z',
    domain: 'https://ec80-2003-ee-af45-6c00-e0d1-7850-acea-8745.ngrok-free.app',
    jws: 'eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..aYfqJNjfz_SEYxo3W7d3rWCpezZidaR-gKhTIbt6VrsgXi0GFs8Pn0Xtv4ZFNLyIbLpwwWyZFwKY4AnWox0PBw',
  },
  'holder': 'did:key:z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd',
}
