export const VPEmailPass = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  'id': 'urn:uuid:89581491-c9d6-47d2-bd4b-e606fe6acd70',
  'type': ['VerifiablePresentation'],
  'verifiableCredential': {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      {
        EmailPass: {
          '@context': {
            '@protected': true,
            '@version': 1.1,
            'email': 'schema:email',
            'id': '@id',
            'issuedBy': {
              '@context': {
                '@protected': true,
                '@version': 1.1,
                'logo': {
                  '@id': 'schema:image',
                  '@type': '@id',
                },
                'name': 'schema:name',
              },
              '@id': 'schema:issuedBy',
            },
            'schema': 'https://schema.org/',
            'type': '@type',
          },
          '@id': 'https://github.com/TalaoDAO/context#emailpass',
        },
      },
    ],
    'id': 'urn:uuid:c2ceaca0-8e9b-11ee-9aa4-0a5bad1dad00',
    'type': ['VerifiableCredential', 'EmailPass'],
    'credentialSubject': {
      id: 'did:key:z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd',
      email: 'felix.hoops@tum.de',
      type: 'EmailPass',
      issuedBy: {
        name: 'Altme',
      },
    },
    'issuer': 'did:web:app.altme.io:issuer',
    'issuanceDate': '2023-11-29T09:43:33Z',
    'proof': {
      type: 'Ed25519Signature2018',
      proofPurpose: 'assertionMethod',
      verificationMethod: 'did:web:app.altme.io:issuer#key-1',
      created: '2023-11-29T09:43:33.482Z',
      jws: 'eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..wl9s4OXCG5vV_sDvxn0E8DmHqQ482e2BlKy-sRsIN9WSwO0ZTU3O75wnEl0PtAcwIFPz_3VIlpz9hjJcRUqABA',
    },
    'expirationDate': '2024-11-28T09:43:33.446349Z',
  },
  'proof': {
    type: 'Ed25519Signature2018',
    proofPurpose: 'authentication',
    challenge: 'test',
    verificationMethod:
      'did:key:z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd#z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd',
    created: '2023-11-29T14:12:48.142Z',
    domain: 'https://ec80-2003-ee-af45-6c00-e0d1-7850-acea-8745.ngrok-free.app',
    jws: 'eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..cUfNpVhLFOmBIebiJO345ImTzKN0_G9Al2k8dJx7wcYvXCfyfWnxFdCGCi13c2tNj6bA-RbzFmo6qrEaQTxtAw',
  },
  'holder': 'did:key:z6MkkdC46uhBGjMYS2ZDLUwCrTWdaqZdTD3596sN4397oRNd',
}
