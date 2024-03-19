import middy from '@middy/core'
import { Context } from 'aws-lambda'

import { HydraAdmin, HydraContext } from '../../types'

export const middleware = (hydraAdmin: HydraAdmin): middy.MiddlewareObj<any, any, Error, HydraContext> => ({
  before: async (handler: { context: Context }) => {
    Object.assign(handler.context, { hydraAdmin })
  },
})
