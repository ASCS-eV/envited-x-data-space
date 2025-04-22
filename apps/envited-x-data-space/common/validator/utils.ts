import { fetchAssetDataByCID } from '../api'
import { predetermineCID } from '../asset/utils'
import { ERRORS } from '../constants'
import { validateAsset } from '../asset/validation'

export const _validateAsset =
  ({
    predetermineCID,
    fetchAssetDataByCID,
    validateAsset,
  }: {
    predetermineCID: (array: Uint8Array) => Promise<string>
    fetchAssetDataByCID: (cid: string) => Promise<any>
    validateAsset: (file: File) => Promise<
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
      const cid = await predetermineCID(arrayBuffer)
      const asset = await fetchAssetDataByCID(cid)

      // if (!isEmpty(asset)) {
      //   return {
      //     isValid: false,
      //     data: {},
      //     error: ERRORS.ASSET_EXISTS,
      //   }
      // }

      return validateAsset(file)
    } catch (error) {
      console.log(error)
      return { isValid: false, data: {}, error: ERRORS.ASSET_FILE_NOT_FOUND }
    }
  }

export const validate = _validateAsset({
  predetermineCID,
  fetchAssetDataByCID,
  validateAsset,
})
