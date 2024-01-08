import { NextResponse } from 'next/server'

import * as SUT from './utils'

jest.mock('next/server', () => ({
  NextResponse: {
    json: (x: string) => x,
  },
}))

describe('common/utils', () => {
  describe('ok', () => {
    it.each([
      ['Message', 'Message'],
      [[], []],
    ])('should return as expected', (message, expected) => {
      // given ... we have a ok response
      // when ... we want to get the result
      const result = SUT.ok(NextResponse as any)(message)

      // then ... it returns the result as expected
      expect(result).toEqual(expected)
    })
  })

  describe('badRequest', () => {
    it('should return as expected', () => {
      // given ... we have a ok response
      // when ... we want to get the result
      const result = SUT.badRequest(NextResponse as any)

      // then ... it returns the result as expected
      expect(result).toEqual({ status: 403, statusText: 'Bad request' })
    })
  })
})
