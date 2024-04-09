import { assoc, propOr } from 'ramda'

import { ExtendedError } from './errors'

export const formatError = (error: unknown) => {
  const errorMessage = {
    message: propOr('Unknown error message', 'message')(error),
    name: propOr('Unknown error name', 'name')(error),
  }
  if (error instanceof ExtendedError) {
    assoc('code', error.code)(errorMessage)
  }

  return errorMessage
}
