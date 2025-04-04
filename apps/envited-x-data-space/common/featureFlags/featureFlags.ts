export const FEATURE_FLAGS = {
  development: {
    oidc: false,
    contract: false,
    uniqueAsset: false,
  },
  staging: {
    oidc: true,
    contract: true,
    uniqueAsset: false,
  },
  production: {
    oidc: true,
    contract: true,
    uniqueAsset: true,
  },
}
