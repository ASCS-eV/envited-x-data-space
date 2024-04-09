import middy from '@middy/core'
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { redis } from '../common'
import { hydraAdmin } from '../common/hydra'
import { log } from '../common/logger'
import { internalServerError, ok } from '../common/responses'
import { postPresentCredential } from '../handlers/presentCredential'
import { hydraMiddleware, loggerMiddleware, redisMiddleware } from '../middleware'
import { RedisHydraLogContext } from '../types'

const lambdaHandler = async (event: APIGatewayEvent, context: RedisHydraLogContext) => {
  try {
    const { body } = event
    const { redis, hydraAdmin, log } = context
    const result = postPresentCredential({ redis, hydraAdmin, log })(body as string)

    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}

export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
  .use(redisMiddleware(redis))
  .use(hydraMiddleware(hydraAdmin))
  .use(loggerMiddleware(log))
  .handler(lambdaHandler)
