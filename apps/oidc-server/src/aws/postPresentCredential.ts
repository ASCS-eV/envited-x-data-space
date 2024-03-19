import { Handler } from 'aws-lambda'

import { postPresentCredential } from '../handlers/presentCredential'
import { internalServerError, ok } from '../common/responses'

export const handler: Handler = async (event) => {
  try {
    const { body } = event
    const result = postPresentCredential(() => {}, () => {})(body)
    return ok(result)
  } catch (error) {
    return internalServerError(error.message)
  }
}
