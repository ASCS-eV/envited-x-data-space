import { BeaconWallet } from '@taquito/beacon-wallet'
import { MichelsonMap, TezosToolkit } from '@taquito/taquito'
import { stringToBytes } from '@taquito/utils'

export const mintToken =
  (web3: { Tezos: TezosToolkit | null; wallet: BeaconWallet | null }) =>
  async ({
    owner,
    from,
    contractAddress,
    tokenInfo,
  }: {
    owner: string
    from: string
    contractAddress: string
    tokenInfo: string
  }) => {
    const contract = await web3.Tezos?.wallet.at(contractAddress)
    const token_info_map = new MichelsonMap()
    token_info_map.set('', stringToBytes(tokenInfo))

    return contract?.methodsObject
      .mint({
        from_uuid: from,
        to_: owner,
        token_info: token_info_map,
      })
      .send()
  }
