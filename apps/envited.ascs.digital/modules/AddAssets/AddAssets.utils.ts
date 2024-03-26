import { BlobReader, ZipReader } from '@zip.js/zip.js'
import { equals, find, propEq, times } from 'ramda'

import { ASSETS_VALIDATION_MAP, Asset, MetadataSchema } from './AddAssets.schema'

export const removeFileHandler = (files: FileList, idx: number) => {
  const dataTransfer = new DataTransfer()
  times(index => !equals(idx)(index) && dataTransfer.items.add(files[index]), files.length)

  return dataTransfer.files
}

export const validateAssetFile = async (file: File) => {
  try {
    const content = await new ZipReader(new BlobReader(file)).getEntries()
    const metadataStream = new TransformStream()
    const metadataStreamPromise = new Response(metadataStream.readable).text()
    const metadataEntry = find(propEq('metadata.json', 'filename'))(content) as any

    await metadataEntry.getData(metadataStream.writable)

    const metadata = await metadataStreamPromise
    const parsedMetadata = JSON.parse(metadata)

    const metadataResult = MetadataSchema.safeParse(parsedMetadata)

    if (!metadataResult.success) {
      return { isValidating: false, isValid: false, data: {} }
    }

    const { type } = MetadataSchema.parse(parsedMetadata)
    const resultAssetTypeValidation = ASSETS_VALIDATION_MAP[type as Asset].safeParse(parsedMetadata)

    if (!resultAssetTypeValidation.success) {
      return { isValidating: false, isValid: false, data: {} }
    }

    return { isValidating: false, isValid: true, data: parsedMetadata }
  } catch (e) {
    console.log(e)
  }
}
