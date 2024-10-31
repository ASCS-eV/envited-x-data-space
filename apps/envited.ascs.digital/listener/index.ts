import { RDSDataClient } from '@aws-sdk/client-rds-data'
import { fromIni } from '@aws-sdk/credential-providers'
import { TezosToolkit } from '@taquito/taquito'
import { drizzle } from 'drizzle-orm/aws-data-api/pg'

import { connectDb } from '../common/database'
import * as schema from '../common/database/schema'
import { listenToAssetContract } from './listener'
import { getTokenByTokenId, insertToken } from './persistence'

const Tezos = new TezosToolkit(process.env.NEXT_PUBLIC_WEB3_RPC_URL || 'https://ghostnet.ecadinfra.com')
const db = async () => {
  if (process.env.ENV === 'development') {
    return connectDb()
  } else {
    const rdsClient = new RDSDataClient({
      credentials: fromIni({ profile: process.env.AWS_PROFILE || '' }),
      region: 'eu-central-1',
    })

    return drizzle(rdsClient, {
      database: process.env.RDS_DB_NAME || '',
      secretArn: process.env.RDS_SECRET_ARN || '',
      resourceArn: process.env.RDS_RESOURCE_ARN || '',
      schema,
    })
  }
}

const connection = await db()

listenToAssetContract({
  tezos: Tezos,
  getTokenByTokenId: getTokenByTokenId({ database: connection }),
  insertToken: insertToken({ database: connection }),
})()
