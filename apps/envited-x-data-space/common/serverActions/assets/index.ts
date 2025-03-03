import { log } from '../../../common/logger'
import { getServerSession } from '../../auth'
import { db } from '../../database/queries'
import { deleteAsset as deleteAssetById } from './delete'

export { get as getAsset, getAssets, getAssetByCID } from './get'
export { insert as insertAsset } from './insert'
export { update as updateAsset, updateStatus as updateAssetStatus } from './update'
export { uploadTokenMetadata } from './uploadTokenMetadata'
export { getMintParams } from './getMintParams'

export const deleteAsset = deleteAssetById({ db, getServerSession, log })
