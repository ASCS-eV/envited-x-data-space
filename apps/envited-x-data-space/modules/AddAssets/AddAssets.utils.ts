import { concat, equals, map, propEq, times } from 'ramda'

import { createFilename } from '../../common/asset/utils'
import { ERRORS } from '../../common/constants'
import { UploadAssetFile, insertAssetAfterUpload } from './AddAssets.actions'

export const _removeFile = (dataTransfer: DataTransfer) => (files: FileList, idx: number) => {
  times(index => !equals(idx)(index) && dataTransfer.items.add(files[index]), files.length)

  return dataTransfer.files
}

export const removeFile = (files: FileList, idx: number) => _removeFile(new DataTransfer())(files, idx)

export const _addFiles = (dataTransfer: DataTransfer) => (files: FileList, newFiles: FileList) => {
  const fileArray = concat(Array.from(files))(Array.from(newFiles))
  map((file: File) => dataTransfer.items.add(file))(fileArray)

  return dataTransfer.files
}

export const addFiles = (files: FileList, newFiles: FileList) => _addFiles(new DataTransfer())(files, newFiles)

export const processFile = async (file: File): Promise<{ name: string; type: string; cid: string }> => {
  const arrayBuffer = Buffer.from(await file.arrayBuffer())
  const cid = await createFilename(arrayBuffer)

  return { name: file.name, type: file.type, cid }
}

export const uploadFile = async (filesArray: File[], { signedUrl, cid, fileType, file }: UploadAssetFile) => {
  console.log('uploadFile', { signedUrl, cid, fileType, file })
  if (!signedUrl) {
    return { success: false, file, message: ERRORS.SIGNED_URL_MISSING }
  }

  if (!cid) {
    return { success: false, file, message: ERRORS.CID_MISSING }
  }

  if (!fileType) {
    return { success: false, file, message: ERRORS.FILE_TYPE_MISSING }
  }

  const fileObj = filesArray.find(propEq(file, 'name'))
  if (!fileObj) return { success: false, file, message: ERRORS.FILE_NOT_FOUND }

  const arrayBuffer = Buffer.from(await fileObj.arrayBuffer())

  const uploadResponse = await fetch(signedUrl, {
    method: 'PUT',
    body: arrayBuffer,
    headers: { 'Content-Type': fileType },
  })

  if (!uploadResponse.ok) return { success: false, file, message: ERRORS.FAILED_UPLOAD }

  await insertAssetAfterUpload(cid, file)

  return { success: true, file }
}
