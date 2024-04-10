import { equals, times } from 'ramda'

export const removeFileHandler = (files: FileList, idx: number) => {
  const dataTransfer = new DataTransfer()
  times(index => !equals(idx)(index) && dataTransfer.items.add(files[index]), files.length)

  return dataTransfer.files
}

export const addFileHandler = (files: FileList) => (newFiles: FileList) => {
  const dataTransfer = new DataTransfer()

  times(index => dataTransfer.items.add(files[index]), files.length)
  times(index => dataTransfer.items.add(newFiles[index]), newFiles.length)

  return dataTransfer.files
}
