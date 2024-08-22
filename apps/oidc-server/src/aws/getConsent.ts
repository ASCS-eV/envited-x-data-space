import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { redis } from '../common'
import { hydraAdmin } from '../common/hydra'
import { log } from '../common/logger'
import { internalServerError, ok } from '../common/responses'
import { getConsent } from '../handlers/consent'
import { hydraMiddleware, loggerMiddleware, redisMiddleware } from '../middleware'
import { RedisHydraLogContext } from '../types'

const lambdaHandler = async (event: any, context: RedisHydraLogContext) => {
  try {
    const {
      queryStringParameters: { challenge },
    } = event
    const { hydraAdmin, log } = context
    const result = await getConsent({ hydraAdmin, log })(challenge as string)

    return ok(result)
  } catch (error) {
    log.error(error)
    return internalServerError(error.message)
  }
}

export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
  .use(redisMiddleware(redis))
  .use(hydraMiddleware(hydraAdmin))
  .use(loggerMiddleware(log))
  .handler(lambdaHandler)
