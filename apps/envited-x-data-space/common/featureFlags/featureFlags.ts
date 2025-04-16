import { unique } from "drizzle-orm/mysql-core";

export const FEATURE_FLAGS = {
  development: {
    oidc: false,
    contract: false,
    uniqueAsset: false,
    uniqueGlobalIdentifier: false,
  },
  staging: {
    oidc: true,
    contract: true,
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
