import type { Config } from 'drizzle-kit'

export default {
  schema: './common/database/schema.ts',
  out: `./drizzle/${process.env.ENV}`,
  dialect: 'postgresql',
} satisfies Config
