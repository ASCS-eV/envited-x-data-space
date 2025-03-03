import { isEmpty } from 'ramda'

import { createFilename } from '../../common/asset/utils'
import { ERRORS } from '../../common/constants'
import { fetchAssetDataByCID } from '../../common/fetcher'
import { validateShaclFile } from '../../common/validator'

export const validateAsset = async (file: File) => {
  try {
    const arrayBuffer = Buffer.from(await file.arrayBuffer())
    const cid = await createFilename(arrayBuffer)
    const asset = await fetchAssetDataByCID(cid)

    if (!isEmpty(asset)) {
      return {
        isValid: false,
        data: {},
        error: ERRORS.ASSET_EXISTS,
      }
    }

    return validateShaclFile(file)
  } catch {
    return { isValid: false, data: {}, error: ERRORS.ASSET_FILE_NOT_FOUND }
  }
}
