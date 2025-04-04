import axios, { Axios } from 'axios'

export type UploadOptions = {
  file: File
  url: string
  contentType: string
  onProgress?: (percent: number) => void
}

export const _uploadFileWithOnProgress =
  ({ axios }: { axios: Axios }) =>
  async ({ file, url, contentType, onProgress }: UploadOptions): Promise<boolean> => {
    try {
      await axios.put(url, file, {
        headers: {
          'Content-Type': contentType,
        },
        onUploadProgress: event => {
          if (event.total && onProgress) {
            const percent = Math.round((event.loaded / event.total) * 100)
            onProgress(percent)
          }
        },
      })

      return true
    } catch {
      return false
    }
  }

export const uploadFileWithOnProgress = _uploadFileWithOnProgress({ axios })
