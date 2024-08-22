import { TezosToolkit } from '@taquito/taquito'

import { tezos } from './taquitoClient'

const _getContractStorage = (tezos: TezosToolkit) => async (contractAddress: string) => {
  try {
    const contract = await tezos.contract.at(contractAddress)
    const storage: unknown = await contract.storage()

    return storage
  } catch (error) {
    console.error('Failed to get registrars: ', error)
    throw error
  }
}

export const getContractStorage = _getContractStorage(tezos)
