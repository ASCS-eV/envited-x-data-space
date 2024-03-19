import middy from '@middy/core'

import * as SUT from './middleware'

describe.skip('common/hydraMiddleware/middleware', () => {
  describe('middleware', () => {
    describe('before', () => {
      it('should associate hydra with context', async () => {
        // given
        // ... hydra
        const hydraStub = {} as any
        // ... and a handler
        const handlerStub = jest.fn().mockResolvedValue(null)

        // when ... we use hydra middleware with our handler
        console.log(middy)
        const handler = middy(handlerStub).use(SUT.middleware(hydraStub) as any) as any
        const event = { name: 'EVENT' } as any
        const context = { name: 'CONTEXT' } as any
        await handler(event, context)
        // then ... should associate hydra instance with context provided to handler
        const expectedContext = {
          name: 'CONTEXT',
          hydraAdmin: {},
        }
        expect(handlerStub).toHaveBeenCalledWith(event, expectedContext)
      })
    })
  })
})
