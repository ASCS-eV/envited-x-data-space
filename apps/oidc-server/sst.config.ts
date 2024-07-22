import { SSTConfig } from 'sst'

import { OIDCServer } from './stacks/OIDCServer'

export default {
  config() {
    return {
      name: 'oidc-server',
      region: 'eu-central-1',
    }
  },
  stacks(app) {
    app.stack(OIDCServer)
  },
} satisfies SSTConfig
