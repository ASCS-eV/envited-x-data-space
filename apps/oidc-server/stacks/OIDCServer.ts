import { Api, StackContext } from 'sst/constructs'

export function OIDCServer({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        timeout: 20,
        environment: {
          CLIENT_NAME: process.env.CLIENT_NAME!,
          API_URL: process.env.API_URL!,
          LOGIN_POLICY: process.env.LOGIN_POLICY!,
          DID_KEY_JWK: process.env.DID_KEY_JWK!,
          EXTERNAL_URL: process.env.EXTERNAL_URL!,
          REDIS_HOST: process.env.REDIS_HOST!,
          REDIS_PORT: process.env.REDIS_PORT!,
          HYDRA_ADMIN_URL: process.env.HYDRA_ADMIN_URL!,
        },
      },
    },
    routes: {
      'GET /client-metadata': './src/aws/getClientMetadata.handler',
      'GET /present-credential': './src/aws/getPresentCredential.handler',
      'POST /present-credential': './src/aws/postPresentCredential.handler',
      'GET /consent': './src/aws/getConsent.handler',
      'GET /challenge/:challenge': './src/aws/getChallenge.handler',
      'GET /redirect/:loginId': './src/aws/getRedirect.handler',
      'POST /verify-user': './src/aws/postVerifyUser.handler',
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })

  return { api }
}
