export const FEATURE_FLAGS = {
  development: {
    oidc: true,
    contract: false,
    uniqueAsset: false,
    uniqueGlobalIdentifier: false,
  },
  staging: {
    oidc: true,
    contract: false,
    uniqueAsset: false,
    uniqueGlobalIdentifier: false,
  },
  production: {
    oidc: true,
    contract: true,
    uniqueAsset: true,
    uniqueGlobalIdentifier: true,
  },
}
