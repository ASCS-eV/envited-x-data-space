import { initDb } from './database'

describe('common/database', () => {
  describe('database', () => {
    it('should should setup a connection with a local database', async () => {
      // when ... we want to make a connection with a local db
      // then ... we should get a connection as expected
      process.env.ENV = 'local'
      process.env.POSTGRES_DATABASE_NAME = 'DB_NAME'
      process.env.POSTGRES_DATABASE_USER = 'DB_USER'
      process.env.POSTGRES_DATABASE_PASSWORD = 'DB_PASSWORD'

      const drizzle = jest.fn().mockReturnValue('DB_CONNECTION')
      const postgres = jest.fn().mockReturnValue(jest.fn())
      const getSecret = jest.fn().mockResolvedValue({})

      const config = {
        host: 'localhost',
        port: 5432,
        database: 'DB_NAME',
        username: 'DB_USER',
        password: 'DB_PASSWORD',
        max: 1,
      }

      const db = await initDb({ drizzle, postgres, getSecret })()

      expect(postgres).toHaveBeenCalledWith(config)
      expect(drizzle).toHaveBeenCalledWith(postgres(config))
      expect(getSecret).not.toHaveBeenCalled()
      expect(db).toEqual('DB_CONNECTION')
    })

    it('should should setup a connection with a local remote database', async () => {
      // when ... we want to make a connection with a remote db
      // then ... we should get a connection as expected while using the secrets manager to get the credentials
      process.env.ENV = 'staging'

      const drizzle = jest.fn().mockReturnValue('DB_CONNECTION')
      const postgres = jest.fn().mockReturnValue(jest.fn())
      const getSecret = jest.fn().mockResolvedValue({
        host: 'localhost',
        port: 5432,
        dbname: 'DB_NAME',
        username: 'DB_USER',
        password: 'DB_PASSWORD',
        max: 1,
      })

      const config = {
        host: 'localhost',
        port: 5432,
        database: 'DB_NAME',
        username: 'DB_USER',
        password: 'DB_PASSWORD',
        max: 1,
      }

      const db = await initDb({ drizzle, postgres, getSecret })()

      expect(postgres).toHaveBeenCalledWith(config)
      expect(drizzle).toHaveBeenCalledWith(postgres(config))
      expect(getSecret).toHaveBeenCalled()
      expect(db).toEqual('DB_CONNECTION')
    })
  })
})
