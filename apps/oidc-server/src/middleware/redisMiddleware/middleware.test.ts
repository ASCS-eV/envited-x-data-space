import middy from '@middy/core'

import * as SUT from './middleware'

describe.skip('common/redisMiddleware/middleware', () => {
  describe('middleware', () => {
    describe('before', () => {
      it('should associate redis with context', async () => {
        // given
        // ... redis
        const redisStub = jest.fn().mockResolvedValue({}) as any
        // ... and a handler
        const handlerStub = jest.fn().mockResolvedValue(null)

        // when ... we use http middleware with our handler
        const handler = middy(handlerStub).use(SUT.middleware(redisStub) as any) as any
        const event = { name: 'EVENT' } as any
        const context = { name: 'CONTEXT' } as any
        await handler(event, context)
        // then ... should associate http instance with context provided to handler
        const expectedContext = {
          name: 'CONTEXT',
          db: {},
        }
        expect(redisStub).toHaveBeenCalledWith()
        expect(handlerStub).toHaveBeenCalledWith(event, expectedContext)
      })
    })
  })
})
