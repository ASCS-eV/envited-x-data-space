import * as SUT from './http'

describe('common/http', () => {
  describe('_uploadFileWithOnProgress', () => {
    it('should return a progress and successfully upload', async () => {
      // when ... we want to upload a file with progress
      // then ... we should upload a file with a progress as expected
      const axiosStub = {
        put: jest.fn().mockImplementation((_url, _file, config) => {
          config?.onUploadProgress?.({
            loaded: 250,
            total: 500,
          } as ProgressEvent)
          return Promise.resolve({ status: 200 })
        }),
      }

      const file = 'FILE' as any
      const url = 'UPLOAD_URL'
      const contentType = 'CONTENT_TYPE'
      const onProgress = jest.fn()

      const result = await SUT._uploadFileWithOnProgress({ axios: axiosStub as any })({
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
