import { Configuration, FrontendApi, IdentityApi, OAuth2Api } from '@ory/client'

const config = new Configuration({
  basePath: process.env.HYDRA_ADMIN_URL,
  accessToken: process.env.ORY_API_KEY,
  baseOptions: {
    withCredentials: true, // Important for CORS
    timeout: 30000, // 30 seconds
  },
})

export const hydraAdmin = {
  identity: new IdentityApi(config),
  frontend: new FrontendApi(config),
  oauth2: new OAuth2Api(config),
}
