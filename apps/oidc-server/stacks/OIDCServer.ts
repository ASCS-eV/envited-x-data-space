import { Api, StackContext } from 'sst/constructs'

export function OIDCServer({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'GET /client-metadata': './src/aws/getClientMetadata.handler',
      'GET /present-credential': './src/aws/getPresentCredential.handler',
      'POST /present-credential': './src/aws/postPresentCredential.handler',
      'GET /consent': './src/aws/getConsent.handler',
      'GET /challenge/:challenge': './src/aws/getChallenge.handler',
      'GET /redirect/:loginId': './src/aws/getRedirect.handler',
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })

  return { api }
}
