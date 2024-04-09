import { equals, times } from 'ramda'

export const removeFileHandler = (files: FileList, idx: number) => {
  const dataTransfer = new DataTransfer()
  times(index => !equals(idx)(index) && dataTransfer.items.add(files[index]), files.length)

  return dataTransfer.files
}
