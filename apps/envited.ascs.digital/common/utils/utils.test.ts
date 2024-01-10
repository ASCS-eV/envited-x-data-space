/**
 * @jest-environment node
 */
import { RESPONSES } from '../constants'
import * as SUT from './utils'

describe('common/utils', () => {
  const mockFetch = Promise.resolve({ json: () => Promise.resolve('') })
  global.fetch = jest.fn().mockImplementation(() => mockFetch)

  describe('ok', () => {
    it.each([
      ['Message', 'Message'],
      [[], []],
    ])('should return as expected', async (message, expected) => {
      // when ... we want to get the result
      // then ... it returns the result as expected
      const response = SUT.ok(message)
      const result = await response.json()

      expect(result).toEqual(expected)
      expect(response.status).toEqual(200)
    })
  })

  describe('badRequest', () => {
    it('should return a bad request reponse as expected', async () => {
      // when ... we submit a bad request
      // then ... it returns a bad request as expected
      const response = SUT.badRequest()

      expect(response.status).toEqual(403)
      expect(response.statusText).toEqual(RESPONSES.badRequest.statusText)
    })
  })

  describe('internalServerError', () => {
    it('should return an internal server error as expected', async () => {
      // when ... we encounter a irrecoverable error during the request
      // then ... it returns an internal server error response as expected
      const response = SUT.internalServerError()

      expect(response.status).toEqual(500)
      expect(response.statusText).toEqual(RESPONSES.internalServerError.statusText)
    })
  })

  describe('notFound', () => {
    it('should return a not found as expected', async () => {
      // when ... we cannot find the requested resource
      // then ... it returns a not found response as expected
      const response = SUT.notFound()

      expect(response.status).toEqual(404)
      expect(response.statusText).toEqual(RESPONSES.notFound.statusText)
    })
  })

  describe('noContent', () => {
    it('should return a no content as expected', async () => {
      // when ... we request a resource that returns an empty response
      // then ... it returns a no content response as expected
      const response = SUT.noContent()

      expect(response.status).toEqual(204)
      expect(response.statusText).toEqual(RESPONSES.noContent.statusText)
    })
  })
})
