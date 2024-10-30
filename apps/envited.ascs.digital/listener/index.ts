import { TezosToolkit } from '@taquito/taquito'

import { connectDb } from '../common/database'
import { listenToAssetContract } from './listener'
import { getTokenByTokenId, insertToken } from './persistence'

const Tezos = new TezosToolkit(process.env.NEXT_PUBLIC_WEB3_RPC_URL || 'https://ghostnet.ecadinfra.com')
const db = await connectDb()

listenToAssetContract({
  tezos: Tezos,
  getTokenByTokenId: getTokenByTokenId({ database: db }),
  insertToken: insertToken({ database: db }),
})()
