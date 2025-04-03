import { PollingSubscribeProvider, TezosToolkit } from '@taquito/taquito'
import { GetCIDResponse } from 'pinata-web3'
import { replace } from 'ramda'

import { pinata } from '../common/ipfs'
import { Log } from '../common/logger'
import { getTokenMetadata } from './tokenMetadata'
import { extractDomainMetadataUri, extractKeyValuePairs, extractManifestUri } from './utils'

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
    getAssetByCID,
    updateAsset,
    getGlobalIdentifierByFullResourceName,
    insertGlobalIdentifier,
    log,
  }: {
    tezos: TezosToolkit
    getTokenByTokenId: any
    insertToken: any
    getAssetByCID: any
    updateAsset: any
    getGlobalIdentifierByFullResourceName: any
    insertGlobalIdentifier: any
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
      destination: process.env.TEZOS_ASSETS_CONTRACT!,
    })

    subscription.on('data', async (data: any) => {
      if (data?.parameters?.entrypoint !== 'mint') {
        return
      }

      try {
        const { hash, destination, metadata, parameters } = data
        const creator = parameters.value.args[1].args[0].string
        const tokenId = parseInt(metadata.operation_result.lazy_storage_diff[2].diff.updates[0].key.int, 10)
        let contractGuid = await getGlobalIdentifierByFullResourceName({
          method: 'urn:contract',
          namespace: 'tezos',
          chainId: process.env.TEZOS_CHAIN_ID!,
          nss: process.env.TEZOS_ASSETS_CONTRACT!,
        })

        if (contractGuid) {
          const [existingToken] = await getTokenByTokenId({ contractGlobalIdentifierId: contractGuid.id, tokenId })

          if (existingToken) {
            return
          }
        } else {
          contractGuid = await insertGlobalIdentifier({
            method: 'urn:contract',
            namespace: 'tezos',
            chainId: process.env.TEZOS_CHAIN_ID!,
            nss: process.env.TEZOS_ASSETS_CONTRACT!,
          })
        }

        log.info('Registering token ', tokenId)
        // Fetch Token metadata from contract
        const tokenMetadata = await getTokenMetadata({ tezos })(destination, tokenId)
        log.info('Token metadata', tokenMetadata)
        const displayCid = replace('ipfs://', '')(tokenMetadata?.displayUri || '')
        const localDisplayUri = `${process.env.PUBLIC_ASSET_URL}/${tokenMetadata?.identifier}/${displayCid}`
        log.info('Local display URI', localDisplayUri)
        const manifestUri = extractManifestUri(tokenMetadata?.attributes || [])
        const manifest: GetCIDResponse = await pinata.gateways.get(replace('ipfs://', '')(manifestUri as string))
        const domainMetadataUri = extractDomainMetadataUri(tokenMetadata?.attributes || [])
        const domainMetadata: GetCIDResponse = await pinata.gateways.get(
          replace('ipfs://', '')(domainMetadataUri as string),
        )
        const attributes = extractKeyValuePairs(domainMetadata.data)
        let minterGuid = await getGlobalIdentifierByFullResourceName({
          method: 'did:pkh',
          namespace: 'tezos',
          chainId: process.env.TEZOS_CHAIN_ID!,
          nss: creator,
        })

        if (!minterGuid) {
          minterGuid = await insertGlobalIdentifier({
            method: 'did:pkh',
            namespace: 'tezos',
            chainId: process.env.TEZOS_CHAIN_ID!,
            nss: creator,
          })
        }

        const operationGuid = await insertGlobalIdentifier({
          method: 'urn:operation',
          namespace: 'tezos',
          chainId: process.env.TEZOS_CHAIN_ID!,
          nss: hash,
        })

        // Save token to DB
        const token = await insertToken({
          operationGlobalIdentifierId: operationGuid.id,
          contractGlobalIdentifierId: contractGuid.id,
          minterGlobalIdentifierId: minterGuid.id,
          tokenId: `${destination}:${tokenId}`,
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
          manifest: manifest?.data,
          domainMetadata: domainMetadata?.data,
        })
        log.info('Token registered', token)
        log.info('Updating Asset')
        const [asset] = await getAssetByCID(token.identifier)
        log.info('Asset', asset)
        if (!asset) {
          return true
        }

        await updateAsset({ id: asset.id, tokenId: token.id, hash })

        return true
      } catch (e) {
        log.error('Registering token failed')
        log.error(e)
      }
    })
  }
