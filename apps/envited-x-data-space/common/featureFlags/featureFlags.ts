export const FEATURE_FLAGS = {
  development: {
    oidc: false,
    contract: false,
  },
  staging: {
    oidc: true,
    contract: true,
  },
  production: {
    oidc: true,
    contract: true,
  },
}
