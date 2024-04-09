import middy from '@middy/core'
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { redis } from '../common'
import { internalServerError, ok } from '../common/responses'
import { getRedirect } from '../handlers/redirect'
import { redisMiddleware } from '../middleware'
import { RedisHydraContext } from '../types'

const lambdaHandler = async (event: APIGatewayEvent, context: RedisHydraContext) => {
  try {
    const {
      queryStringParameters: { loginId },
    } = event
    const { redis } = context
    const result = getRedirect({ redis })(loginId as string)

    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}

export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
  .use(redisMiddleware(redis))
  .handler(lambdaHandler)
