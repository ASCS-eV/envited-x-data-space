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
          SMART_CONTRACT_ADDRESS: process.env.SMART_CONTRACT_ADDRESS!,
          RPC_NODE_URL: process.env.RPC_NODE_URL!,
        },
        runtime: 'nodejs20.x',
      },
    },
    routes: {
      'GET /client-metadata': './src/aws/getClientMetadata.handler',
      'GET /present-credential': {
        function: {
          handler: './src/aws/getPresentCredential.handler',
          copyFiles: [{ from: './src/aws/didkit_wasm_bg.wasm' }],
        },
      },
      'POST /present-credential': {
        function: {
          handler: './src/aws/postPresentCredential.handler',
          copyFiles: [{ from: './src/aws/didkit_wasm_bg.wasm' }],
        },
      },
      'GET /consent': './src/aws/getConsent.handler',
      'GET /challenge/{challenge}': {
        function: {
          handler: './src/aws/getChallenge.handler',
          copyFiles: [{ from: './src/aws/didkit_wasm_bg.wasm' }],
        },
      },
      'GET /redirect/{loginId}': './src/aws/getRedirect.handler',
      'POST /verify-user': './src/aws/postVerifyUser.handler',
    },
    customDomain: {
      domainName: 'api.ascs.digital',
      hostedZone: 'ascs.digital',
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })

  return { api }
}
