import { isEmpty, isNil, pathEq } from "ramda"

import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { Database } from "../../database/types"
import { Role, Session } from "../../types"
import { badRequestError, extractAddressFromDid, forbiddenError, notFoundError, unauthorizedError } from "../../utils"

export const _getAssetMintParams = ({ db, getServerSession }: {db: Database
  getServerSession: () => Promise<Session | null>}) => async (assetId: string) => {
  
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
  
  return {
    from: 'urn:uuid:8bb912dc-6746-42c0-8628-9cfb8e9eb4d4',
    owner: extractAddressFromDid(user.issuerId),
    tokenId: assetId,
    contractAddress: process.env.ASSETS_CONTRACT!
  }
}

export const getAssetMintParams = _getAssetMintParams({ db, getServerSession })
