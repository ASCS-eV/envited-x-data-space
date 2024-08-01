import middy from '@middy/core'
import { keyToDID } from '@spruceid/didkit-wasm-node'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { redis } from '../common'
import { log } from '../common/logger'
import { internalServerError, ok } from '../common/responses'
import { getChallenge } from '../handlers/challenge'
import { loggerMiddleware, redisMiddleware } from '../middleware'
import { RedisLogContext } from '../types'

export const lambdaHandler = async (event: any, context: RedisLogContext) => {
  try {
    const { redis, log } = context
    const loginChallenge = event.pathParameters?.challenge

    const result = getChallenge({ redis, log, keyToDID })(loginChallenge)

    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}

export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
  .use(redisMiddleware(redis))
  .use(loggerMiddleware(log))
  .handler(lambdaHandler)
