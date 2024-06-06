import { Entry } from '@zip.js/zip.js'

import { extractFromFile, readContentFromJsonFile } from '../../archive'
import { ERRORS } from '../../constants'
import { assetSchema } from './json.schema'

export const _validateJSONFile =
  (getMetadataJsonFromZip: (file: File) => Promise<Record<string, any>>) => async (file: File) => {
    try {
      const metadata = await getMetadataJsonFromZip(file)
      const metadataResult = assetSchema.safeParse(metadata)

      if (!metadataResult.success) {
        return { isValid: false, data: {}, error: ERRORS.ASSET_INVALID }
      }

      return { isValid: true, data: metadataResult.data }
    } catch {
      return { isValid: false, data: {}, error: ERRORS.ASSET_FILE_NOT_FOUND }
    }
  }

export const _getMetadataJsonFromZip =
  ({ extract }: { extract: (archive: File, fileName: string) => Promise<Entry> }) =>
  async (asset: File) =>
    extract(asset, 'metadata.json').then(readContentFromJsonFile)

export const getMetadataJsonFromZip = _getMetadataJsonFromZip({ extract: extractFromFile })

export const validateJSONFile = _validateJSONFile(getMetadataJsonFromZip)
