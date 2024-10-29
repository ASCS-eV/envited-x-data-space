import { PollingSubscribeProvider, TezosToolkit } from '@taquito/taquito'
import { Tzip12Module, tzip12 } from '@taquito/tzip12'

export const listenToAssetContract = ({ tezos }: { tezos: TezosToolkit }) => async () => {
  tezos.setStreamProvider(
    tezos.getFactory(PollingSubscribeProvider)({
      shouldObservableSubscriptionRetry: true,
      pollingIntervalMilliseconds: 1500,
    }),
  )
  console.log('Contract listener started listening on:', process.env.ASSETS_CONTRACT)    
  try {
    const subscription = tezos.stream.subscribeOperation({
      destination: process.env.ASSETS_CONTRACT || 'KT1JzYzRCMMFQbsKSPrtxmXCf4vSVX4k3AtT',
    })
    console.log('Subscription:', subscription)

    subscription.on('data', async (data: any) => {
      console.log('Data:', data)
      if (data?.parameters?.entrypoint === 'mint') {
        const { hash, destination, metadata, parameters } = data
        const creator = parameters.value.args[1].args[0].string
        const tokenId = metadata.operation_result.lazy_storage_diff[2].diff.updates[0].key.int

        if (await getAssetByTokenId(tokenId)) {
          return
        }

        // Fetch Token metadata from contract
        const tokenMetadata = await getTokenMetadata({ tezos })(destination, tokenId)
        // Save token to DB
        const asset = await insertAsset(hash, creator, destination, tokenId, tokenMetadata)

        return asset
      }
    })
  } catch (e) {
    console.log(e)
  }
}

export const getTokenMetadata = ({ tezos }: { tezos: TezosToolkit }) => async (contractAddress: string, id: string) => {
  tezos.addExtension(new Tzip12Module())

  try {
    const contract = await tezos.contract.at(contractAddress, tzip12)
    const tokenMetadata = await contract.tzip12().getTokenMetadata(Number(id))

    return tokenMetadata
  } catch (e) {
    console.warn(e)
  }
}

export const getAssetByTokenId = async (tokenId: number) => {
  // TODO: add database query to check if token already exists
  return false
}

export const insertAsset = async (
  hash: string,
  creator: string,
  contract: string,
  tokenId: number,
  tokenMetadata: any,
) => {
  // TODO: Database insert asset
  console.log('insert asset', {
    hash,
    contract,
    creator,
    tokenId,
    tokenMetadata,
  })
}
