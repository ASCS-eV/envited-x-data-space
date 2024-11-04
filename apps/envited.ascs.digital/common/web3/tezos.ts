import { TezosToolkit } from '@taquito/taquito'

import { isServer } from '../utils'

export const initTezos =
  ({ Tezos }: { Tezos: TezosToolkit }) =>
  async () => {
    if (isServer()) {
      return { Tezos: null, wallet: null }
    }

    const wallet = new (await import('@taquito/beacon-wallet')).BeaconWallet({
      name: process.env.WALLET_NAME || 'Envited Data Space',
      network: { type: 'ghostnet' as any },
      featuredWallets: ['altme', 'temple'],
    })
    // @ts-expect-error BeaconWallet typing seems to be outdated
    Tezos.setWalletProvider(wallet)

    return { Tezos, wallet }
  }

export const tezos = initTezos
