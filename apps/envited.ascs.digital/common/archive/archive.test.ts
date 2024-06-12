import * as SUT from './archive'

describe('common/archive', () => {
  describe('extract', () => {
    it('Should return a valid result', async () => {
      // when ... we want to read a file from a zip archive
      // then ... it should return the entries from the zip archive

      const getEntriesStub = jest.fn().mockResolvedValue([{ filename: 'FILENAME.EXT' }])
      const closeStub = jest.fn()
      const zipReaderStub = jest.fn().mockImplementation(() => ({
        getEntries: getEntriesStub,
        close: closeStub,
      }))

      const result = await SUT._extract({ ZipReader: zipReaderStub })('' as any, 'FILENAME.EXT')
      expect(result).toEqual({ filename: 'FILENAME.EXT' })
      expect(closeStub).toHaveBeenCalledWith()
      expect(getEntriesStub).toHaveBeenCalledWith()
      expect(zipReaderStub).toHaveBeenCalledWith('')
    })

    it('Should return undefined when file does not exist', async () => {
      // when ... we want to read a missing file from a zip archive
      // then ... it should return undefined

      const getEntriesStub = jest.fn().mockResolvedValue([{ filename: 'FILENAME.EXT' }])
      const closeStub = jest.fn()
      const zipReaderStub = jest.fn().mockImplementation(() => ({
        getEntries: getEntriesStub,
        close: closeStub,
      }))

      const result = await SUT._extract({ ZipReader: zipReaderStub })('' as any, 'NON_EXISTING_FILENAME.EXT')
      expect(result).toEqual(undefined)
    })

    it('Should return undefined when archive cannot be read', async () => {
      // when ... we want to read a bad archive
      // then ... it should return undefined

      const getEntriesStub = jest.fn().mockRejectedValue('ERROR')
      const closeStub = jest.fn()
      const zipReaderStub = jest.fn().mockImplementation(() => ({
        getEntries: getEntriesStub,
        close: closeStub,
      }))

      const result = await SUT._extract({ ZipReader: zipReaderStub })('' as any, 'FILENAME.EXT')
      expect(result).toEqual(undefined)
    })
  })
})
