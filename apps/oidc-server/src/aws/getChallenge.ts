import { Handler } from 'aws-lambda'

import { internalServerError, ok } from '../common/responses'
import { getChallenge } from '../handlers/challenge'

export const handler: Handler = async event => {
  try {
    const loginChallenge = event.queryStringParameters?.loginChallenge

    const result = getChallenge(loginChallenge)

    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}
