export const acceptAnything = [
  {
    credentialID: 'credential1',
    patterns: [
      {
        issuer: '*',
        claims: [
          {
            claimPath: '$.credentialSubject.*',
            newPath: '$.subjectData',
            required: false,
          },
        ],
      },
    ],
  },
]

export const acceptEmailFromAltme = [
  {
    credentialID: 'one',
    patterns: [
      {
        issuer: 'did:web:app.altme.io:issuer',
        claims: [
          {
            claimPath: '$.credentialSubject.email',
            token: 'id_token',
          },
        ],
      },
    ],
  },
]

export const acceptEmployeeFromAnyone = [
  {
    credentialID: 'one',
    patterns: [
      {
        issuer: '*',
        claims: [
          {
            claimPath: '$.credentialSubject.hasLegallyBindingName',
            newPath: '$.companyName',
          },
          {
            claimPath: '$.credentialSubject.name',
            token: 'id_token',
          },
          {
            claimPath: '$.credentialSubject.email',
            token: 'id_token',
          },
        ],
      },
    ],
  },
]

export const acceptAnythingFromAltme = [
  {
    credentialID: 'one',
    patterns: [
      {
        issuer: 'did:web:app.altme.io:issuer',
        claims: [
          {
            claimPath: '$.credentialSubject.*',
            required: false,
          },
        ],
      },
    ],
  },
]

export const policies = {
  acceptAnything,
  acceptEmailFromAltme,
  acceptEmployeeFromAnyone,
  acceptAnythingFromAltme,
}
