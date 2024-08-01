import { aws_elasticache } from 'aws-cdk-lib'
import { Api, StackContext } from 'sst/constructs'

export function OIDCServer({ stack }: StackContext) {
  /*
   * Create ElastiCache Redis
   */
  const redis = new aws_elasticache.CfnServerlessCache(this, 'OidcServerRedis', {
    engine: 'redis',
    serverlessCacheName: 'OidcServerRedis',
    cacheUsageLimits: {
      dataStorage: {
        maximum: 1,
        unit: 'GB',
      },
      ecpuPerSecond: {
        maximum: 1000,
      },
    },
    description: 'OIDC Server Redis',
  })

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
          REDIS_HOST: redis.attrEndpointAddress,
          REDIS_PORT: redis.attrReaderEndpointPort,
          HYDRA_ADMIN_URL: process.env.HYDRA_ADMIN_URL!,
        },
      },
    },
    routes: {
      'GET /client-metadata': './src/aws/getClientMetadata.handler',
      'GET /present-credential': './src/aws/getPresentCredential.handler',
      'POST /present-credential': './src/aws/postPresentCredential.handler',
      'GET /consent': './src/aws/getConsent.handler',
      'GET /challenge/{challenge}': {
        function: {
          handler: './src/aws/getChallenge.handler',
          copyFiles: [{ from: './src/aws/didkit_wasm_bg.wasm' }],
        },
      },
      'GET /redirect/{loginId}': './src/aws/getRedirect.handler',
    },
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
    RedisEndpoint: redis.attrEndpointAddress,
    RedisPort: redis.attrEndpointPort,
  })

  return { api }
}
