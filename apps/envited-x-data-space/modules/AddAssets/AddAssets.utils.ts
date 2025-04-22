import { all, any, concat, equals, forEach, map, propEq, times } from 'ramda'

import { predetermineCID } from '../../common/asset/utils'
import { ERRORS } from '../../common/constants'
import { httpPutWithProgress } from '../../common/http'
import { FilesWithId, UploadStatus } from '../../common/types'
import { UploadAssetFile, insertAssetAfterUpload } from './AddAssets.actions'

export const _removeFile = (dataTransfer: DataTransfer) => (files: FileList, idx: number) => {
  times(index => !equals(idx)(index) && dataTransfer.items.add(files[index]), files.length)

  return dataTransfer.files
}

export const removeFile = (files: FileList, idx: number) => _removeFile(new DataTransfer())(files, idx)

export const addFiles = (currentFiles: FileList | undefined, newFiles: FileList): File[] =>
  concat(currentFiles ? Array.from(currentFiles) : [])(Array.from(newFiles))

export const addIdToFileList = map(
  (file: File): FilesWithId => ({
    id: crypto.randomUUID(),
    file,
  }),
)

export const _createDataTransferFromFileList = (dataTransfer: DataTransfer) => (files: File[]) =>
  forEach((file: File) => dataTransfer.items.add(file))(files)

export const createDataTransferFromFileList = (files: File[]) =>
  _createDataTransferFromFileList(new DataTransfer())(files)

export const allStatus = (status: UploadStatus) => all(propEq(status, 'status'))

export const anyStatus = (status: UploadStatus) => any(propEq(status, 'status'))

export const processFile = async (file: File): Promise<{ name: string; type: string; cid: string }> => {
  const arrayBuffer = Buffer.from(await file.arrayBuffer())
  const cid = await predetermineCID(arrayBuffer)

  return { name: file.name, type: file.type, cid }
}

export const uploadFileToIPFS = async (
  filesArray: File[],
  { signedUrl, cid, fileType, file }: UploadAssetFile,
  onProgress: (percent: number) => void,
): Promise<{ success: boolean; file: string; message?: string }> => {
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
  if (!fileObj) {
    return { success: false, file, message: ERRORS.FILE_NOT_FOUND }
  }

  const success = await httpPutWithProgress({
    file: fileObj,
    url: signedUrl,
    contentType: fileType,
    onProgress,
  })

  if (!success) {
    return { success: false, file, message: ERRORS.FAILED_UPLOAD }
  }

  try {
    await insertAssetAfterUpload(cid, file)
    return { success: true, file }
  } catch {
    return { success: false, file, message: ERRORS.ASSET_UPLOAD_FAILED }
  }
}
