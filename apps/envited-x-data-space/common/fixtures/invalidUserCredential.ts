export const INVALID_USER_CREDENTIAL = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    {
      '@version': 1.1,
      '@protected': true,
      'AscsUserCredential': 'https://schema.ascs.digital/AscsUserCredential/v1#',
      'AscsIssuer': {
        '@id': 'https://schema.ascs.digital/AscsUserCredential/v1#AscsIssuer',
        '@context': {
          '@version': 1.1,
          '@protected': true,
          'name': 'https://schema.org/name',
          'url': 'https://schema.org/url',
        },
      },
      'AscsUser': {
        '@id': 'https://schema.ascs.digital/AscsUserCredential/v1#AscsUser',
        '@context': {
          '@version': 1.1,
          '@protected': true,
          'name': 'https://schema.org/name',
          'email': 'https://schema.org/email',
          'address': 'http://schema.org/address',
          'isAscsMember': 'http://schema.org/Boolean',
          'isEnvitedMember': 'http://schema.org/Boolean',
          'privacyPolicy': 'https://schema.org/termsOfService',
        },
      },
      'PostalAddress': {
        '@id': 'http://schema.org/PostalAddress',
        '@context': {
          '@version': 1.1,
          '@protected': true,
          'streetAddress': 'http://schema.org/streetAddress',
          'postalCode': 'http://schema.org/postalCode',
          'addressLocality': 'http://schema.org/addressLocality',
          'addressCountry': 'https://schema.org/addressCountry',
        },
      },
    },
  ],
  'type': ['VerifiableCredential', 'AscsUserCredential'],
  'issuanceDate': '2023-11-22T17:14:33Z',
  'expirationDate': '2102-09-15T17:14:33Z',
  'id': 'urn:uuid:cf1f329d-9c4c-458e-ba0a-a762a296b79c',
  'issuer': 'did:pkh:tz:tz1bfenLGF9XFdvy4FCLqsFLueqw6XuDFYCo',
  'credentialSubject': {
    id: 'did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeX',
    type: 'AscsUser',
    name: 'User',
    email: 'mailto:user@test.de',
    address: {
      type: 'PostalAddress',
      streetAddress: 'Teststraße 1',
      postalCode: '12345',
      addressLocality: 'Munich',
      addressCountry: 'DE',
    },
    isAscsMember: true,
    isEnvitedMember: true,
    privacyPolicy: 'https://media.ascs.digital/terms/ascs_privacy_policy_2020-07-08.pdf#SHA-256',
  },
}
