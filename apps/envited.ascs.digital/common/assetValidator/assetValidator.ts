import { Entry } from '@zip.js/zip.js'
import fs from 'fs'

import { extract, read, readStream } from '../archive'
import { ERRORS } from '../constants'
import { _loadJsonLdDataset } from '../turtleValidator/turtleValidator.utils'
import { assetSchema } from './assetValidator.schema'

export const _validateAssetFile =
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

export const _validateAssetShaclFile =
  (getMetadataJsonFromZip: (file: File) => Promise<Record<string, any>>) => async (file: File) => {
    try {
      const metadata = await getMetadataJsonFromZip(file)
      // console.log(metadata)
      // const metadataResult = assetSchema.safeParse(metadata)

      // if (!metadataResult.success) {
      //   return { isValid: false, data: {}, error: ERRORS.ASSET_INVALID }
      // }

      return { isValid: true, data: metadata }
    } catch {
      return { isValid: false, data: {}, error: ERRORS.ASSET_FILE_NOT_FOUND }
    }
  }

export const _getMetadataJsonFromZip =
  ({ extract }: { extract: (archive: File, fileName: string) => Promise<Entry> }) =>
  async (asset: File) =>
    extract(asset, 'metadata.json').then(readContentFromJsonFile)

export const getMetadataJsonFromZip = _getMetadataJsonFromZip({ extract })

export const _getDataJsonLdFromZip =
  ({ extract }: { extract: (archive: File, fileName: string) => Promise<Entry> }) =>
  async (asset: File) =>
    extract(asset, 'data.jsonld').then(readContentFromJsonLdFile)

export const getDataJsonLdFromZip = _getDataJsonLdFromZip({ extract })

export const _readContentFromJsonFile =
  ({ read }: { read: (file: Entry) => Promise<string> }) =>
  async (file: Entry) =>
    read(file).then(JSON.parse)

export const readContentFromJsonFile = _readContentFromJsonFile({ read })

export const _readContentFromJsonLdFile =
  ({ read }: { read: (file: Entry) => Promise<ReadableStream<any>> }) =>
  async (file: Entry) =>
    read(file).then(_loadJsonLdDataset)

export const readContentFromJsonLdFile = _readContentFromJsonLdFile({ read: readStream })

export const validateAssetFile = _validateAssetFile(getMetadataJsonFromZip)

export const validateAssetShaclFile = _validateAssetShaclFile(getDataJsonLdFromZip)
