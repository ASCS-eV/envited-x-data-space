import { Redis } from 'ioredis'

export const getRedirect =
  ({ redis }: { redis: Redis }) =>
  async (loginId: string) => {
    const redirect = await redis.get('redirect' + loginId)

    if (redirect) {
      return {
        redirect: {
          destination: redirect,
          permanent: false,
        },
      }
    }

    return {}
  }
