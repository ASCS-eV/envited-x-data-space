import { PollingSubscribeProvider, TezosToolkit } from '@taquito/taquito'
import { PutObjectCommand } from '@aws-sdk/client-s3'

import { getTokenMetadata } from './tokenMetadata'
import { convertIpfsUrlToGateway, extractAttributesUri, extractKeyValuePairs, getFileTypeFromBuffer } from './utils'
import { s3Client } from '../common/aws'

const createLocalCopy = async (uri: string) => {
  const { url, filename } = convertIpfsUrlToGateway(uri)

  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  const fileType = await getFileTypeFromBuffer(arrayBuffer)
  
  const uploadParams = {
    Bucket: process.env.ASSET_BUCKET_NAME,
    Key: filename,
    Body: Buffer.from(arrayBuffer),
    ContentType: fileType ? fileType.mime : 'application/octet-stream',
    ContentDisposition: 'inline'
  }

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    return `${process.env.ASSET_URL}/${filename}`
  } catch (err) {
    console.log("Error", err);
  }
}

export const listenToAssetContract =
  ({ tezos, getTokenByTokenId, insertToken }: { tezos: TezosToolkit; getTokenByTokenId: any; insertToken: any }) =>
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
        
        console.log('Registering token ', tokenId)
        
        // Fetch Token metadata from contract
        const tokenMetadata = await getTokenMetadata({ tezos })(destination, tokenId)
        const localDisplayUri = await createLocalCopy(tokenMetadata?.displayUri || '')
        const attributesUri = extractAttributesUri(tokenMetadata?.attributes || [])
        console.log('Attributes URI', attributesUri)
        const manifest = await fetch(convertIpfsUrlToGateway(attributesUri as string).url).then((res) => res.json())
        console.log('Manifest', manifest)
        const attributes = extractKeyValuePairs(manifest)
        console.log('Attributes', attributes)
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
        console.log('Registering token failed')
        console.log(e)
      }
    })
  }
