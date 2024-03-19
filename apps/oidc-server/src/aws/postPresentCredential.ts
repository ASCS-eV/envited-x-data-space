import { Handler } from 'aws-lambda'

import { internalServerError, ok } from '../common/responses'
import { postPresentCredential } from '../handlers/presentCredential'

export const handler: Handler = async event => {
  try {
    const { body } = event
    const result = postPresentCredential(
      () => {},
      () => {},
    )(body)
    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}
