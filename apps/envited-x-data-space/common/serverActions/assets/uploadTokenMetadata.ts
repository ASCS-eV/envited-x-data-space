import { isEmpty, isNil, pathEq } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { CreateGroup, UploadJson, createGroup, uploadJsonToIPFS } from '../../ipfs'
import { Log, log } from '../../logger'
import { Asset, Role, Session } from '../../types'
import { badRequestError, extractAddressFromDid, forbiddenError, notFoundError, unauthorizedError } from '../../utils'

export const uploadTokenMetadataToIPFS =
  ({
    uploadJsonToIPFS,
    createGroup,
    db,
    getServerSession,
    log,
  }: {
    uploadJsonToIPFS: UploadJson
    createGroup: CreateGroup
    db: Database
    getServerSession: () => Promise<Session | null>
    log: Log
  }) =>
  async (assetId: string) => {
    log.info('uploadTokenMetadataToIPFS', { assetId })
    if (isNil(assetId) || isEmpty(assetId)) {
      throw badRequestError({ resource: 'assets', resourceId: assetId, message: 'Missing ID' })
    }

    const session = await getServerSession()

    if (isNil(session)) {
      throw unauthorizedError({ resource: 'users' })
    }

    if (!pathEq(Role.provider, ['user', 'role'])(session)) {
      throw forbiddenError({ resource: 'assets', message: 'Insufficient permissions', userId: session.user.id })
    }

    const connection = await db()
    const [asset] = await connection.getAsset(assetId)

    if (isNil(asset) || isEmpty(asset)) {
      throw notFoundError({ resource: 'assets', resourceId: assetId, userId: session?.user.id })
    }
    console.log('asset', asset)
    const user = await connection.getUserById(session.user.id)
    console.log('user', user)
    if (isNil(user.issuerId) || isEmpty(user.issuerId)) {
      throw forbiddenError({ resource: 'assets', message: 'No issuer found', userId: session.user.id })
    }

    const group = await createGroup(extractAddressFromDid(user.issuerId))
    console.log('group', group)
    const upload = await uploadJsonToIPFS({ data: (asset as Asset).metadata, filename: 'token_info.json', group })
    console.log('upload', upload)

    return upload
  }

export const uploadTokenMetadata = uploadTokenMetadataToIPFS({
  uploadJsonToIPFS,
  createGroup,
  db,
  getServerSession,
  log,
})
