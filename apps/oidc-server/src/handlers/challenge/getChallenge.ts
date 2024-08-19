import crypto from 'crypto'
import { Redis } from 'ioredis'

import { Log } from '../../common/logger'
import { formatError } from '../../common/utils'

export const getChallenge =
  ({ redis, keyToDID, log }: { redis: Redis; keyToDID: any; log: Log }) =>
  async (loginChallenge: string) => {
    try {
      if (loginChallenge === undefined) {
        return {
          redirect: {
            destination: '/common/error',
            permanent: false,
          },
        }
      }

      let loginId = await redis.get('' + loginChallenge)
      console.log('loginId', loginId)
      if (!loginId) {
        loginId = crypto.randomUUID()
        const MAX_AGE = 60 * 5 // 5 minutes
        const EXPIRY_MS = 'EX' // seconds
        const a = await redis.set('' + loginChallenge, '' + loginId, EXPIRY_MS, MAX_AGE)
        const b = await redis.set('' + loginId, '' + loginChallenge, EXPIRY_MS, MAX_AGE)

        console.log('A< B', a, b)
      }
      const redirect = await redis.get('redirect' + loginId)

      if (redirect) {
        return {
          redirect: {
            destination: redirect,
            permanent: false,
          },
        }
      }

      const did = await keyToDID('key', process.env.DID_KEY_JWK!)

      return { loginId, externalUrl: process.env.EXTERNAL_URL, clientId: did }
    } catch (error: unknown) {
      log.error(formatError(error))
      return {
        redirect: {
          destination: '/common/error',
          permanent: false,
        },
      }
    }
  }
