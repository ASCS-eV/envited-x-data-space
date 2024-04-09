import middy from '@middy/core'
import { Context } from 'aws-lambda'

import { JoseContext } from '../../types'

export const middleware = ({ importJWK, signJWT }): middy.MiddlewareObj<any, any, Error, JoseContext> => ({
  before: async (handler: { context: Context }) => {
    Object.assign(handler.context, { importJWK, signJWT })
  },
})
