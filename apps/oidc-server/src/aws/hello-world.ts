import { Handler } from 'aws-lambda'

import { helloWorld } from '../handlers/helloWorld'

export const handler: Handler = async (event, context) => {
  console.log('EVENT: \n' + JSON.stringify(event, null, 2))
  console.log(context)
  return helloWorld()
}
