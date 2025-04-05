import * as SUT from './http'

describe('common/http', () => {
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
