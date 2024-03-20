import middy from '@middy/core'
import { Context } from 'aws-lambda'
import { Redis } from 'ioredis'

import { RedisContext } from '../../types'

export const middleware = (redis: Redis): middy.MiddlewareObj<any, any, Error, RedisContext> => ({
  before: async (handler: { context: Context }) => {
    Object.assign(handler.context, { redis })
  },
})
