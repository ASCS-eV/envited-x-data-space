import { BlobReader, Entry, ZipReader } from '@zip.js/zip.js'
import { find, isNil, propEq } from 'ramda'

import { ASSETS_VALIDATION_MAP, Asset, MetadataSchema } from './assetValidator.schema'

export const _validateAssetFile = (getMetadataJsonFromZip: (file: File) => void) => async (file: File) => {
  try {
    const metadata = await getMetadataJsonFromZip(file)
    const metadataResult = MetadataSchema.safeParse(metadata)

    if (!metadataResult.success) {
      return { isValid: false, data: {} }
    }

    const { type } = MetadataSchema.parse(metadata)
    const resultAssetTypeValidation = ASSETS_VALIDATION_MAP[type as Asset].safeParse(metadata)

    if (!resultAssetTypeValidation.success) {
      return { isValid: false, data: {} }
    }

    return { isValid: true, data: metadata }
  } catch (e) {
    console.log(e)
  }
}

export const getMetadataJsonFromZip = async (asset: File) => {
  try {
    const file = await getFileFromZip(asset, 'metadata.json')

    if (isNil(file)) {
      return {}
    }

    return readContentFromJsonFile(file as Entry)
  } catch (e) {
    console.log(e)
  }
}

export const getFileFromZip = async (file: File, filename: string) => {
  try {
    const zipReader = new ZipReader(new BlobReader(file))
    const zipEntries = await zipReader.getEntries()
    const fileEntry = find(propEq(filename, 'filename'))(zipEntries)
    await zipReader.close()

    return fileEntry
  } catch (e) {
    return e
  }
}

export const readContentFromJsonFile = async (file: any) => {
  try {
    const stream = new TransformStream()
    const response = new Response(stream.readable).text()
    await file.getData(stream.writable)
    const fileContent = await response

    return JSON.parse(fileContent)
  } catch (e) {
    return e
  }
}

export const validateAssetFile = _validateAssetFile(getMetadataJsonFromZip)
