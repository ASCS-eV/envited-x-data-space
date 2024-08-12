import middy from '@middy/core'
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { redis } from '../common'
import { hydraAdmin } from '../common/hydra'
import { log } from '../common/logger'
import { internalServerError, ok } from '../common/responses'
import { postPresentCredential } from '../handlers/presentCredential'
import { hydraMiddleware, loggerMiddleware, redisMiddleware } from '../middleware'
import { RedisHydraLogContext } from '../types'
import { queryStringToJSON } from '../utils'

const lambdaHandler = async (event: APIGatewayEvent, context: RedisHydraLogContext) => {
  try {
    const { body, isBase64Encoded } = event
    let presentationString = body
    if (isBase64Encoded) {
      presentationString = Buffer.from(body as string, 'base64').toString('utf-8')
    }
    const { redis, hydraAdmin, log } = context
    const presentation = queryStringToJSON(presentationString)
    const result = await postPresentCredential({ redis, hydraAdmin, log })(JSON.parse(presentation.vp_token))

    return ok(result)
  } catch (error) {
    log.error(error)
    return internalServerError(error.message)
  }
  return ok('ok')
}

export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
  .use(redisMiddleware(redis))
  .use(hydraMiddleware(hydraAdmin))
  .use(loggerMiddleware(log))
  .handler(lambdaHandler)
