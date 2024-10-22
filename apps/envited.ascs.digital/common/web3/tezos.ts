import { TezosToolkit } from '@taquito/taquito'

import { isServer } from '../utils'

export const initTezos = async () => {
  if (isServer() ) { return { Tezos: null, wallet: null } }

  const Tezos = new TezosToolkit(process.env.NEXT_PUBLIC_WEB3_RPC_URL || 'http://localhost:8732')
  const wallet = new (await import("@taquito/beacon-wallet")).BeaconWallet({ name: process.env.WALLET_NAME || 'Envited Data Space', network: { type: 'ghostnet' as any }})
  
  Tezos.setProvider({ wallet })
  
  return { Tezos, wallet }
}

export const tezos = initTezos
