import { concat, equals, map, times } from 'ramda'

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
