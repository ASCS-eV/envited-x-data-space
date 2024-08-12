import middy from '@middy/core'
import { keyToDID, keyToVerificationMethod } from '@spruceid/didkit-wasm-node'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { SignJWT, importJWK } from 'jose'

import { log } from '../common/logger'
import { internalServerError, ok } from '../common/responses'
import { getPresentCredential } from '../handlers/presentCredential'
import { joseMiddleware, loggerMiddleware } from '../middleware'
import { LogJoseDIDContext } from '../types'

export const lambdaHandler = async (event: any, context: LogJoseDIDContext) => {
  try {
    const {
      queryStringParameters: { login_id },
    } = event
    const { log, importJWK, signJWT } = context
    const result = await getPresentCredential({ log, importJWK, signJWT, keyToDID, keyToVerificationMethod })(login_id)
    console.log(result)
    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}

export const handler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
  .use(loggerMiddleware(log))
  .use(joseMiddleware({ importJWK, signJWT: SignJWT }))

  .handler(lambdaHandler)
