import { TezosToolkit } from '@taquito/taquito'

import { isServer } from '../utils'

export const initTezos =
  ({ Tezos }: { Tezos: TezosToolkit }) =>
  async () => {
    if (isServer()) {
      return {
        Tezos: null,
        wallet: null,
        connectWallet: async () => '',
        disconnectWallet: async () => {},
        restoreWallet: async () => {},
      }
    }

    const wallet = new (await import('@taquito/beacon-wallet')).BeaconWallet({
      name: process.env.WALLET_NAME || 'Envited Data Space',
      network: { type: 'ghostnet' as any },
      featuredWallets: ['altme', 'temple'],
    })

    Tezos.setWalletProvider(wallet)

    const connectWallet = async () => {
      try {
        await wallet.requestPermissions({ network: { type: 'ghostnet' as any } })

        return wallet.getPKH()
      } catch (error) {
        console.error('Wallet connection failed:', error)
        return ''
      }
    }

    const disconnectWallet = async () => wallet.clearActiveAccount()

    const restoreWallet = async () => {
      const activeAccount = await wallet.client.getActiveAccount()

      if (activeAccount) {
        return wallet.getPKH()
      }
    }

    return { Tezos, wallet, connectWallet, disconnectWallet, restoreWallet }
  }

export const tezos = initTezos
