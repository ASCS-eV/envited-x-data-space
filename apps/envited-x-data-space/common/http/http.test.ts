import * as SUT from './http'

describe('common/http', () => {
  describe('_httpGet', () => {
    it('should be called with the URL and GET method', async () => {
      const httpRequestStub = jest.fn().mockImplementation()

      await SUT._httpGet({ httpRequest: httpRequestStub as any })('URL', {})

      expect(httpRequestStub).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: 'URL',
      })
    })
  })

  describe('_httpPost', () => {
    it('should be requested with the FILE, URL and POST method', async () => {
      const httpRequestStub = jest.fn().mockImplementation()
      await SUT._httpPost({ httpRequest: httpRequestStub as any })('URL', 'FILE', {})

      expect(httpRequestStub).toHaveBeenCalledWith({
        headers: {},
        data: 'FILE',
        method: 'POST',
        url: 'URL',
      })
    })
  })

  describe('_httpPut', () => {
    it('should requested with the FILE, URL and PUT method', async () => {
      const httpRequestStub = jest.fn().mockImplementation()
      await SUT._httpPut({ httpRequest: httpRequestStub as any })('URL', 'FILE', {})

      expect(httpRequestStub).toHaveBeenCalledWith({
        data: 'FILE',
        headers: {},
        method: 'PUT',
        url: 'URL',
      })
    })
  })

  describe('_httpPutWithProgress', () => {
    it('should return a progress and successfully upload', async () => {
      // when ... we want to upload a file with progress
      // then ... we should upload a file with a progress as expected
      const httpRequestStub = jest.fn().mockImplementation(params => {
        params?.onUploadProgress?.({
          loaded: 250,
          total: 500,
        } as ProgressEvent)

        return Promise.resolve(undefined)
      })

      const file = 'FILE' as any
      const url = 'UPLOAD_URL'
      const contentType = 'CONTENT_TYPE'
      const onProgress = jest.fn()

      const result = await SUT._httpPutWithProgress({ httpRequest: httpRequestStub as any })({
        file,
        url,
        contentType,
        onProgress,
      })

      expect(onProgress).toHaveBeenCalledWith(50)
      expect(result).toBe(true)
    })
  })
})
