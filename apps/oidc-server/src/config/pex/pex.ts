export const descriptorAnything = [
  {
    id: 'anything_1',
    name: 'Input descriptor for credential 1',
    purpose: 'Sign-in',
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
]

export const descriptorEmailFromAltme = [
  {
    id: 'emailpass_1',
    name: 'Input descriptor for credential 1',
    purpose: 'Sign-in',
    constraints: {
      fields: [
        {
          path: ['$.credentialSubject.type'],
          filter: {
            type: 'string',
            pattern: 'EmailPass',
          },
        },
      ],
    },
  },
]
