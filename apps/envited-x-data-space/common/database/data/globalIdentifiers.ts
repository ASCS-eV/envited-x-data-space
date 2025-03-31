export const GLOBAL_IDENTIFIERS = [
  {
    method: 'urn:contract',
    namespace: 'tezos',
    chainId: process.env.TEZOS_CHAIN_ID!,
    nss: process.env.TEZOS_ASSETS_CONTRACT!,
  },
]
