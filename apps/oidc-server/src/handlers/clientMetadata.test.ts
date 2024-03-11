import * as SUT from './clientMetadata'

describe('handlers/clientMetadata', () => {
  it('should return the metadata as expected', () => {
    // given .. we have the client name and the api url
    // when ... we want to get the metadata for the client
    // then ... we should get the metadata as expected

    process.env.CLIENT_NAME = 'CLIENT_NAME'
    process.env.API_URL = 'API_URL'
    const clientMetadata = {
      scopes_supported: ['openid'],
      response_types_supported: ['id_token', 'vp_token'],
      response_modes_supported: ['query'],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['ES256', 'ES256k', 'EdDSA', 'RS256'],
      request_object_signing_alg_values_supported: ['ES256', 'ES256K', 'EdDSA', 'RS256'],
      vp_formats: {
        jwt_vp: {
          alg_values_supported: ['ES256', 'ES256K', 'EdDSA', 'RS256'],
        },
        jwt_vc: {
          alg_values_supported: ['ES256', 'ES256K', 'EdDSA', 'RS256'],
        },
      },
      subject_syntax_types_supported: ['did:key', 'did:ebsi', 'did:tz', 'did:pkh', 'did:key', 'did:ethr'],
      subject_syntax_types_discriminations: ['did:key:jwk_jcs-pub', 'did:ebsi:v1'],
      subject_trust_frameworks_supported: ['ebsi'],
      id_token_types_supported: ['subject_signed_id_token'],
      client_name: 'CLIENT_NAME',
      request_uri_parameter_supported: true,
      request_parameter_supported: false,
      redirect_uris: ['API_URL/presentCredential'],
    }
    
    const result = SUT.getClientMetadata()
    expect(result).toStrictEqual(clientMetadata)
  })
})
