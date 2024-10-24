import { PollingSubscribeProvider, TezosToolkit } from '@taquito/taquito'
import { Tzip12Module, tzip12 } from '@taquito/tzip12'

const Tezos = new TezosToolkit(process.env.NEXT_PUBLIC_WEB3_RPC_URL || 'https://ghostnet.ecadinfra.com')

const deploy = async () => {
  Tezos.setStreamProvider(
    Tezos.getFactory(PollingSubscribeProvider)({
      shouldObservableSubscriptionRetry: true,
      pollingIntervalMilliseconds: 1500
    })
  )

  try {
    const sub = Tezos.stream.subscribeOperation({
      destination: process.env.NEXT_PUBLIC_ASSETS_CONTRACT || 'KT1NUDsQ5qCpf5Mxmeo2dqRdnKqqL8kpj2LG',
    })
  
    sub.on('data', async (data) => {
      if(data?.parameters?.entrypoint === 'mint') {
        const { hash, destination, metadata, parameters } = data
        const creator = parameters.value.args[1].args[0].string
        const tokenId = metadata.operation_result.lazy_storage_diff[2].diff.updates[0].key.int

        if (await getAssetByTokenId(tokenId)) {
          return
        }

        // Fetch Token metadata from contract
        const tokenMetadata = await getTokenMetadata(destination, tokenId)
        // Save token to DB
        const asset = await insertAsset(hash, creator, destination, tokenId, tokenMetadata)

        console.log('asset inserted', asset)
      }
    })
  } catch (e) {
    console.log(e);
  }
}

deploy()

const getTokenMetadata = async (contractAddress, id) => {
  const tezos = new TezosToolkit(process.env.NEXT_PUBLIC_WEB3_RPC_URL || 'https://ghostnet.ecadinfra.com')
  tezos.addExtension(new Tzip12Module())

  try {
    const contract = await tezos.contract.at(contractAddress, tzip12)
    const tokenMetadata = await contract.tzip12().getTokenMetadata(Number(id))

    return tokenMetadata
  } catch (e) {
      console.warn(e)
  }
}

const getAssetByTokenId = async (tokenId) => {
  // TODO: add database query to check if token already exists
  return false
}

const insertAsset = async (hash, creator, contract, tokenId, tokenMetadata) => {
  // TODO: Database insert asset
  console.log('insert asset', {
    hash,
    contract,
    creator,
    tokenId,
    tokenMetadata,
  })

  return true
}