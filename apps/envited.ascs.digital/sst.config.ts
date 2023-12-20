import { SSTConfig } from 'sst'

import Envited from './stacks/Envited'

export default {
  config(_input) {
    return {
      name: 'envitedascsdigital',
      region: 'eu-central-1',
      role: process.env.ROLE_TO_ASSUME,
    }
  },
  stacks(app) {
    app.stack(Envited)
  },
} satisfies SSTConfig
