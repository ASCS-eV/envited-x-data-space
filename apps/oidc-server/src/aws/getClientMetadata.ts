import { Handler } from 'aws-lambda'

import { getClientMetadata } from '../handlers/clientMetadata/clientMetadata'

export const handler: Handler = async () => {
  return getClientMetadata()
}
