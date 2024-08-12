import middy from '@middy/core'
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { log } from '../common/logger'
import { internalServerError, ok } from '../common/responses'
import { postVerifyUser } from '../handlers/verifyUser'
import { loggerMiddleware } from '../middleware'

const lambdaHandler = async (event: APIGatewayEvent) => {
  try {
    const { body } = event
    const { id, pkh, issuer, type } = JSON.parse(body)
    const result = await postVerifyUser(id, pkh, issuer, type)

    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}

export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
  .use(loggerMiddleware(log))
  .handler(lambdaHandler)
