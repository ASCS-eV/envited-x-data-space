import { PollingSubscribeProvider, TezosToolkit } from '@taquito/taquito'
import { replace } from 'ramda'

import { pinata } from '../common/ipfs'
import { Log } from '../common/logger'
import { getTokenMetadata } from './tokenMetadata'
import { extractAttributesUri, extractKeyValuePairs } from './utils'

export const createLocalCopy =
  ({ uploadFileToS3 }: { uploadFileToS3: any }) =>
  async (cid: string) => {
    try {
      console.log(`Creating local copy for ${cid}`)
      const { data, contentType } = await pinata.gateways.get(cid)

      let body = null

      if (!data) {
        throw new Error('No data')
      }

      if (data instanceof Blob) {
        const arrayBuffer = await data.arrayBuffer()
        body = Buffer.from(arrayBuffer)
      } else if (typeof data === 'string') {
        body = data
      } else {
        body = JSON.stringify(data)
      }

      const uploadParams = {
        Bucket: process.env.ASSET_BUCKET_NAME,
        Key: cid,
        Body: body,
        ContentType: contentType ? contentType : 'application/octet-stream',
        ContentDisposition: 'inline',
      }

      await uploadFileToS3(uploadParams)
      return `${process.env.ASSET_URL}/${cid}`
    } catch (err) {
      console.log(err)
      throw new Error(`Unable to create local copy: ${err}`)
    }
  }

export const listenToAssetContract =
  ({
    tezos,
    getTokenByTokenId,
    insertToken,
    log,
  }: {
    tezos: TezosToolkit
    getTokenByTokenId: any
    insertToken: any
    log: Log
  }) =>
  async () => {
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
        const tokenId = parseInt(metadata.operation_result.lazy_storage_diff[2].diff.updates[0].key.int, 10)
        const [existingToken] = await getTokenByTokenId({ contract: process.env.ASSETS_CONTRACT, tokenId })

        if (existingToken) {
          return
        }

        log.info('Registering token ', tokenId)
        // Fetch Token metadata from contract
        const tokenMetadata = await getTokenMetadata({ tezos })(destination, tokenId)
        log.info('Token metadata', tokenMetadata)
        const displayCid = replace('ipfs://', '')(tokenMetadata?.displayUri || '')
        const localDisplayUri = `${process.env.PUBLIC_ASSET_URL}/${tokenMetadata?.identifier}/${displayCid}`
        log.info('Local display URI', localDisplayUri)
        const attributesUri = extractAttributesUri(tokenMetadata?.attributes || [])
        log.info('Attributes URI', attributesUri)
        const manifest = await pinata.gateways.get(replace('ipfs://', '')(attributesUri as string))
        const attributes = extractKeyValuePairs(manifest)
        // Save token to DB
        return insertToken({
          hash,
          contract: destination,
          minter: creator,
          tokenId,
          name: tokenMetadata?.name,
          description: tokenMetadata?.description,
          creators: tokenMetadata?.creators,
          publishers: tokenMetadata?.publishers,
          date: new Date(tokenMetadata?.date || Date.now()),
          type: tokenMetadata?.type,
          rights: tokenMetadata?.rights,
          rightsUri: tokenMetadata?.rightsUri,
          language: tokenMetadata?.language,
          artifactUri: tokenMetadata?.artifactUri,
          identifier: tokenMetadata?.identifier,
          externalUri: tokenMetadata?.externalUri,
          displayUri: localDisplayUri,
          tags: tokenMetadata?.tags,
          attributes,
          tokenMetadata,
        })
      } catch (e) {
        log.error('Registering token failed')
        log.error(e)
      }
    })
  }
