import { isEmpty } from 'ramda'

import { fetchAssetDataByCID } from '../api'
import { createFilename } from '../asset/utils'
import { ERRORS } from '../constants'
import { validateShaclFile } from './shacl'

export const _validateAsset =
  ({
    createFilename,
    fetchAssetDataByCID,
    validateShaclFile,
  }: {
    createFilename: (byteArray: Uint8Array) => Promise<any>
    fetchAssetDataByCID: (cid: string) => Promise<any>
    validateShaclFile: (file: File) => Promise<
      | {
          isValid: boolean
          data: {
            manifest?: undefined
            domainMetadata?: undefined
          }
          error: string
        }
      | {
          isValid: boolean
          data: {
            manifest: any
            domainMetadata: any
          }
          error?: undefined
        }
    >
  }) =>
  async (file: File) => {
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
    } catch (error) {
      console.log(error)
      return { isValid: false, data: {}, error: ERRORS.ASSET_FILE_NOT_FOUND }
    }
  }

export const validateAsset = _validateAsset({
  createFilename,
  fetchAssetDataByCID,
  validateShaclFile,
})
