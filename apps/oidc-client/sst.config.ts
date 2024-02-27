import { SSTConfig } from 'sst'

import { OIDCClient } from './stacks/OIDCClient'

export default {
  config() {
    return {
      name: 'oidc-client',
      region: 'eu-central-1',
    }
  },
  stacks(app) {
    app.stack(OIDCClient)
  },
} satisfies SSTConfig
