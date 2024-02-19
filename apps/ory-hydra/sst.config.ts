import { SSTConfig } from 'sst'

import { OryHydra } from './stacks/OryHydra'

export default {
  config() {
    return {
      name: 'oryhydra',
      region: 'eu-central-1',
      role: process.env.ROLE_TO_ASSUME,
    }
  },
  stacks(app) {
    app.stack(OryHydra)
  },
} satisfies SSTConfig
