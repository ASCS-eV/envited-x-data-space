import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { log } from '../common/logger'
import { internalServerError, ok } from '../common/responses'
import { getPresentCredential } from '../handlers/presentCredential'
import { loggerMiddleware } from '../middleware'
import { LogJoseDIDContext } from '../types'

export const lambdaHandler = async (event: any, context: LogJoseDIDContext) => {
  try {
    const {
      queryStringParameters: { loginId },
    } = event
    const { log, importJWK, signJWT, keyToDID, keyToVerificationMethod } = context
    const result = getPresentCredential({ log, importJWK, signJWT, keyToDID, keyToVerificationMethod })(loginId)

    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}

export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
  .use(loggerMiddleware(log))
  .handler(lambdaHandler)
