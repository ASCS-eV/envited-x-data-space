'use server'

import { isEmpty, isNil, pathEq } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { CreateGroup, UploadJson, createGroup, uploadJson } from '../../ipfs'
import { Log, log } from '../../logger'
import { Role, Session } from '../../types'
import { badRequestError, forbiddenError, notFoundError, unauthorizedError } from '../../utils'

export const uploadAssetTokenMetadataToIPFS =
  ({
    uploadJson,
    createGroup,
    db,
    getServerSession,
    log,
  }: {
    uploadJson: UploadJson
    createGroup: CreateGroup
    db: Database
    getServerSession: () => Promise<Session | null>
    log: Log
  }) =>
  async (assetId: string) => {
    log.info('uploadAssetTokenMetadataToIPFS', { assetId })
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

    const [user] = await connection.getUserById(session.user.id)

    if (isNil(user.issuerId) || isEmpty(user.issuerId)) {
      throw forbiddenError({ resource: 'assets', message: 'No issuer found', userId: session.user.id })
    }

    const group = await createGroup(user.issuerId)
    return uploadJson({ data: asset.metadata, filename: 'token_info.json', group })
  }

export const uploadAssetTokenMetadata = uploadAssetTokenMetadataToIPFS({
  uploadJson,
  createGroup,
  db,
  getServerSession,
  log,
})
