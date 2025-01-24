import { TezosToolkit } from '@taquito/taquito'

import { tezos as tezosToolkit } from './tezos'

export { mintToken } from './web3'

export const Tezos = new TezosToolkit(process.env.NEXT_PUBLIC_WEB3_RPC_URL || 'http://localhost:8732')

export const tezos = tezosToolkit({ Tezos })
