
import { Entry } from '@zip.js/zip.js'

import { ASSETS_VALIDATION_MAP, Asset, MetadataSchema } from './assetValidator.schema'
import { extract, read } from '../archive'

export const _validateAssetFile = (getMetadataJsonFromZip: (file: File) => Promise<Record<string, any>>) => async (file: File) => {
  try {
    const metadata = await getMetadataJsonFromZip(file)
    const metadataResult = MetadataSchema.safeParse(metadata)

    if (!metadataResult.success) {
      return { isValid: false, data: {} }
    }

    const { type } = metadata 
    const resultAssetTypeValidation = ASSETS_VALIDATION_MAP[type as Asset].safeParse(metadata)

    if (!resultAssetTypeValidation.success) {
      return { isValid: false, data: {} }
    }

    return { isValid: true, data: metadata }
  } catch (e) {
    throw new Error('Error validating asset file')
  }
}

export const _getMetadataJsonFromZip = ({ extract }: { extract: (archive: File, fileName: string) => Promise<Entry> }) => async (asset: File) => 
  extract(asset, 'metadata.json')
  .then(readContentFromJsonFile)

export const getMetadataJsonFromZip = _getMetadataJsonFromZip({ extract })

export const _readContentFromJsonFile = ({ read }: { read: (file: Entry) => Promise<string> }) => async (file: Entry) => read(file).then(JSON.parse)

export const readContentFromJsonFile = _readContentFromJsonFile({ read })

export const validateAssetFile = _validateAssetFile(getMetadataJsonFromZip)
