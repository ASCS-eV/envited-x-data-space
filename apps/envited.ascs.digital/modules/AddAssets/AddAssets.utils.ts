import { BlobReader, ZipReader } from '@zip.js/zip.js'
import { equals, find, isNil, propEq, times } from 'ramda'

import { ASSETS_VALIDATION_MAP, Asset, MetadataSchema } from './AddAssets.schema'

export const removeFileHandler = (files: FileList, idx: number) => {
  const dataTransfer = new DataTransfer()
  times(index => !equals(idx)(index) && dataTransfer.items.add(files[index]), files.length)

  return dataTransfer.files
}

export const validateAssetFile = async (file: File) => {
  try {
    const metadata = await getMetadataJsonFromZip(file)
    const metadataResult = MetadataSchema.safeParse(metadata)

    if (!metadataResult.success) {
      return { isValidating: false, isValid: false, data: {} }
    }

    const { type } = MetadataSchema.parse(metadata)
    const resultAssetTypeValidation = ASSETS_VALIDATION_MAP[type as Asset].safeParse(metadata)

    if (!resultAssetTypeValidation.success) {
      return { isValidating: false, isValid: false, data: {} }
    }

    return { isValidating: false, isValid: true, data: metadata }
  } catch (e) {
    console.log(e)
  }
}

export const getMetadataJsonFromZip = async (file: File) => {
  try {
    const zipReader = new ZipReader(new BlobReader(file))
    const zipEntries = await zipReader.getEntries()
    const metadataEntry = find(propEq('metadata.json', 'filename'))(zipEntries) as any

    if (isNil(metadataEntry)) {
      return {}
    }

    const metadataStream = new TransformStream()
    const metadataStreamPromise = new Response(metadataStream.readable).text()
    await metadataEntry.getData(metadataStream.writable)
    const metadata = await metadataStreamPromise
    await zipReader.close()

    return JSON.parse(metadata)
  } catch (e) {
    console.log(e)
  }
}
