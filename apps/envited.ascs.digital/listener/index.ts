import http from 'http'
import { listenToAssetContract } from './listener'
import { Tezos } from '../common/web3'
import { PollingSubscribeProvider } from '@taquito/taquito';

console.log('Starting server...')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Server is alive\n')
});

server.listen(3000, () => {
  console.log('Server listening on port 3000')

  Tezos.setStreamProvider(
    Tezos.getFactory(PollingSubscribeProvider)({
      shouldObservableSubscriptionRetry: true,
      pollingIntervalMilliseconds: 1500,
    }),
  )
  console.log('Contract listener started listening on:', process.env.ASSETS_CONTRACT)    
  try {
    const subscription = Tezos.stream.subscribeOperation({
      destination: process.env.ASSETS_CONTRACT || 'KT1JzYzRCMMFQbsKSPrtxmXCf4vSVX4k3AtT',
    })
    console.log(process.env.ASSETS_CONTRACT)
    subscription.on('data', async (data: any) => {
      console.log(data)
    })
  } catch (e) {
    console.log(e)
  }
  // listenToAssetContract({ tezos: Tezos })()
})
