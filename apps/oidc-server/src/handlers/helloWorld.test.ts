import * as SUT from './helloWorld'

describe('handlers/helloWorld', () => {
  it('should return "Hello, World!"', () => {
    const result = SUT.helloWorld()
    expect(result).toBe('Hello, World!')
  })
})
