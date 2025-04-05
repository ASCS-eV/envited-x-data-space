import axios, { AxiosRequestConfig } from 'axios'

type UploadOptions = {
  file: File
  url: string
  contentType: string
  onProgress: (percent: number) => void
}

type HttpMethod = 'GET' | 'POST' | 'PUT'

type RequestParams = {
  url: string
  method?: HttpMethod
  data?: any
  headers?: Record<string, string>
  responseType?: AxiosRequestConfig['responseType']
}

export const httpRequest = async <T = unknown>({
  url,
  method = 'GET',
  data,
  headers = {},
  responseType,
  onUploadProgress,
}: RequestParams & { onUploadProgress?: AxiosRequestConfig['onUploadProgress'] }): Promise<T> => {
  const config: AxiosRequestConfig = {
    url,
    method,
    data,
    headers,
    responseType,
    onUploadProgress,
  }

  const response = await axios(config)
  return response.data
}

export const httpGet = <T = unknown>(url: string, headers?: Record<string, string>) =>
  httpRequest<T>({ url, method: 'GET', headers })

export const httpPost = <T = unknown>(url: string, data: any, headers?: Record<string, string>) =>
  httpRequest<T>({ url, method: 'POST', data, headers })

export const httpPut = <T = unknown>(url: string, data: any, headers?: Record<string, string>) =>
  httpRequest<T>({ url, method: 'PUT', data, headers })

export const _httpPutWithProgress =
  ({
    httpRequest,
  }: {
    httpRequest: <T = unknown>({
      url,
      method,
      data,
      headers,
      responseType,
      onUploadProgress,
    }: RequestParams & {
      onUploadProgress?: AxiosRequestConfig['onUploadProgress']
    }) => Promise<T>
  }) =>
  async ({ file, url, contentType, onProgress }: UploadOptions): Promise<boolean> => {
    try {
      await httpRequest({
        url,
        method: 'PUT',
        data: file,
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

export const httpPutWithProgress = _httpPutWithProgress({ httpRequest })
