import { TezosToolkit } from '@taquito/taquito'

const url = process.env.RPC_NODE_URL || 'https://mainnet.api.tez.ie'

export const tezos = new TezosToolkit(url)
