import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { redis } from '../common'
import { hydraAdmin } from '../common/hydra'
import { internalServerError, ok } from '../common/responses'
import { postPresentCredential } from '../handlers/presentCredential'
import { hydraMiddleware, redisMiddleware } from '../middleware'
import { RedisHydraContext } from '../types'

const lambdaHandler = async (event: any, context: RedisHydraContext) => {
  try {
    const { queryStringParameters: { challenge } } = event
    const { redis, hydraAdmin } = context
    const result = postPresentCredential(redis, hydraAdmin)(challenge as string)

    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}

export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
  .use(redisMiddleware(redis))
  .use(hydraMiddleware(hydraAdmin))
  .handler(lambdaHandler)
