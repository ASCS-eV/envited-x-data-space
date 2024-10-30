import { PollingSubscribeProvider, TezosToolkit } from '@taquito/taquito'
import { Tzip12Module, tzip12 } from '@taquito/tzip12'

export const listenToAssetContract = ({ tezos, getTokenByTokenId, insertToken }: { tezos: TezosToolkit, getTokenByTokenId: any, insertToken: any }) => async () => {
  tezos.setStreamProvider(
    tezos.getFactory(PollingSubscribeProvider)({
      shouldObservableSubscriptionRetry: true,
      pollingIntervalMilliseconds: 1500,
    }),
  )
  
  const subscription = tezos.stream.subscribeOperation({
    destination: process.env.ASSETS_CONTRACT!,
  })

  subscription.on('data', async (data: any) => {
    if (data?.parameters?.entrypoint !== 'mint') {
      return
    }

    try {
      const { hash, destination, metadata, parameters } = data
      const creator = parameters.value.args[1].args[0].string
      const tokenId = metadata.operation_result.lazy_storage_diff[2].diff.updates[0].key.int
      const [existingToken] = await getTokenByTokenId({ contract: process.env.ASSETS_CONTRACT, tokenId })
      
      if (existingToken) {
        return
      }

      // Fetch Token metadata from contract
      const tokenMetadata = await getTokenMetadata({ tezos })(destination, tokenId)
      console.log(tokenMetadata)
      // Save token to DB
      const asset = await insertToken({
        hash,
        creator,
        contract: process.env.ASSETS_CONTRACT!,
        tokenId,
        tokenMetadata,
        thumbnail: '',
      })

      return asset
    } catch (e) {
      console.log("Registering token failed")
      console.log(e)
    }
  })
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
