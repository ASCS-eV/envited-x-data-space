'use server'

import { isEmpty, isNil, pathEq } from 'ramda'

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from '../../database/types'
import { CreateGroup, UploadJson, createGroup, uploadJson } from '../../ipfs'
import { Log, log } from '../../logger'
import { Role, Session } from '../../types'
import { badRequestError, forbiddenError, notFoundError, unauthorizedError } from '../../utils'

export const uploadTokenMetadataToIPFS =
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
  async (uploadId: string) => {
    log.info('uploadTokenMetadataToIPFS', { uploadId })
    if (isNil(uploadId) || isEmpty(uploadId)) {
      throw badRequestError({ resource: 'uploads', resourceId: uploadId, message: 'Missing ID' })
    }

    const session = await getServerSession()

    if (isNil(session)) {
      throw unauthorizedError({ resource: 'users' })
    }

    if (!pathEq(Role.provider, ['user', 'role'])(session)) {
      throw forbiddenError({ resource: 'uploads', message: 'Insufficient permissions', userId: session.user.id })
    }

    const connection = await db()
    const [asset] = await connection.getUpload(uploadId)

    if (isNil(asset) || isEmpty(asset)) {
      throw notFoundError({ resource: 'uploads', resourceId: uploadId, userId: session?.user.id })
    }

    const [user] = await connection.getUserById(session.user.id)

    if (isNil(user.issuerId) || isEmpty(user.issuerId)) {
      throw forbiddenError({ resource: 'uploads', message: 'No issuer found', userId: session.user.id })
    }

    const group = await createGroup(user.issuerId)
    return uploadJson({ data: asset.metadata, filename: 'token_info.json', group })
  }

export const uploadTokenMetadata = uploadTokenMetadataToIPFS({
  uploadJson,
  createGroup,
  db,
  getServerSession,
  log,
})
