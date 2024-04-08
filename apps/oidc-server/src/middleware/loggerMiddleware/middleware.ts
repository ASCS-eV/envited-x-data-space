import middy from '@middy/core'
import { Context } from 'aws-lambda'

import { Log } from '../../common/logger'
import { LogContext } from '../../types'

export const middleware = (log: Log): middy.MiddlewareObj<any, any, Error, LogContext> => ({
  before: async (handler: { context: Context }) => {
    Object.assign(handler.context, { log })
  },
})
