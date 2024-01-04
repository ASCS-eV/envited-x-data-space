import { init } from './queries'

describe('common/database/queries', () => {
  describe('queries', () => {
    it('should load the queries with an active db connection', async () => {
      // when ... we want to load the queries
      // then ... we should get the queries as expected
      const connectDb = jest.fn().mockResolvedValue('DB_CONNECTION')
      const testQuery = jest.fn().mockReturnValue('TEST_QUERY')

      const db = await init(connectDb)({ testQuery: testQuery })()

      expect(connectDb).toHaveBeenCalled()
      expect(testQuery).toHaveBeenCalledWith('DB_CONNECTION')
      expect(db).toEqual({ testQuery: 'TEST_QUERY' })
    })
  })
})
