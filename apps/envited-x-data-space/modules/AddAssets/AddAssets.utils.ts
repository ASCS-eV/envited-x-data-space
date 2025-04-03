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

export const uploadFile = (
  filesArray: File[],
  { signedUrl, cid, fileType, file }: UploadAssetFile,
  onProgress?: (percent: number) => void,
): Promise<{ success: boolean; file: string; message?: string }> => {
  return new Promise(async (resolve, reject) => {
    if (!signedUrl) {
      return resolve({ success: false, file, message: ERRORS.SIGNED_URL_MISSING })
    }

    if (!cid) {
      return resolve({ success: false, file, message: ERRORS.CID_MISSING })
    }

    if (!fileType) {
      return resolve({ success: false, file, message: ERRORS.FILE_TYPE_MISSING })
    }

    const fileObj = filesArray.find(propEq(file, 'name'))
    if (!fileObj) {
      return resolve({ success: false, file, message: ERRORS.FILE_NOT_FOUND })
    }

    const xhr = new XMLHttpRequest()

    xhr.upload.onprogress = event => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100)
        onProgress(percent)
      }
    }

    xhr.onload = async () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          await insertAssetAfterUpload(cid, file)
          resolve({ success: true, file })
        } catch (err) {
          resolve({ success: false, file, message: ERRORS.POST_UPLOAD_FAILED })
        }
      } else {
        resolve({ success: false, file, message: ERRORS.FAILED_UPLOAD })
      }
    }

    xhr.onerror = () => {
      resolve({ success: false, file, message: ERRORS.NETWORK_ERROR })
    }

    xhr.open('PUT', signedUrl)
    xhr.setRequestHeader('Content-Type', fileType)
    xhr.send(fileObj)
  })
}
