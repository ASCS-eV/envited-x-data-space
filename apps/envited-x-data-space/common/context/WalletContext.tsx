'use client'

import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'
import { createContext, useContext, useEffect, useState } from 'react'

import { tezos } from '../web3'

const WalletContext = createContext<{
  account: string
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
  Tezos: TezosToolkit | undefined | null
  wallet: BeaconWallet | undefined | null
}>({} as any)

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<string>('')
  const [Tezos, setTezos] = useState<TezosToolkit | null>()
  const [wallet, setWallet] = useState<BeaconWallet | null>()
  const [connectWallet, setConnectWallet] = useState<() => Promise<string>>(async () => '')
  const [disconnectWallet, setDisconnectWallet] = useState<() => Promise<void>>(async () => {})

  useEffect(() => {
    const setupWallet = async () => {
      const { Tezos, wallet, connectWallet, disconnectWallet, restoreWallet } = await tezos()
      setTezos(Tezos)
      setWallet(wallet)
      setConnectWallet(() => connectWallet)
      setDisconnectWallet(() => disconnectWallet)

      const savedAccount = await restoreWallet()
      if (savedAccount) setAccount(savedAccount)
    }

    setupWallet()
  }, [])

  const handleConnect = async () => {
    const userAddress = await connectWallet()
    if (userAddress) setAccount(userAddress)
  }

  const handleDisconnect = async () => {
    await disconnectWallet()
    setAccount('')
  }

  return (
    <WalletContext.Provider
      value={{ account, connectWallet: handleConnect, disconnectWallet: handleDisconnect, Tezos, wallet }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
