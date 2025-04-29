import { BlobReader } from '@zip.js/zip.js'

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

  describe('_countAmountOfFilesInZip', () => {
    it('should count files in a zip archive correctly', async () => {
      // Setup mocks
      const mockEntries = [
        { filename: 'file1.txt' },
        { filename: 'folder/file2.txt' },
        { filename: 'folder/file3.json' },
      ]
      const mockGetEntries = jest.fn().mockResolvedValue(mockEntries)
      const mockZipReader = jest.fn().mockImplementation(() => ({
        getEntries: mockGetEntries,
        close: jest.fn().mockResolvedValue(undefined),
      }))
      // Use a mocked stream for the zip file
      const zipFile = { mocked: 'stream' }

      // Execute
      const result = await SUT._countAmountOfFilesInZip({ ZipReader: mockZipReader })(zipFile as any)

      // Verify
      expect(result).toBe(3)
      expect(mockZipReader).toHaveBeenCalledWith(new BlobReader(new Blob([zipFile as any])))
      expect(mockGetEntries).toHaveBeenCalledTimes(1)
    })

    it('should handle empty zip archives', async () => {
      // Setup mocks
      const mockGetEntries = jest.fn().mockResolvedValue([])
      const mockZipReader = jest.fn().mockImplementation(() => ({
        getEntries: mockGetEntries,
        close: jest.fn().mockResolvedValue(undefined),
      }))
      // Use a mocked stream for the zip file
      const zipFile = { mocked: 'stream' }

      // Execute
      const result = await SUT._countAmountOfFilesInZip({ ZipReader: mockZipReader })(zipFile as any)

      // Verify
      expect(result).toBe(0)
    })

    it('Should return the amount of files', async () => {
      // when ... we want to read a file from a zip archive
      // then ... it should return the entries from the zip archive

      const getEntriesStub = jest
        .fn()
        .mockResolvedValue([
          { filename: 'FILENAME.EXT', directory: true },
          { filename: 'FILENAME_1.EXT' },
          { filename: 'FILENAME_2.EXT' },
        ])
      const closeStub = jest.fn()
      const zipReaderStub = jest.fn().mockImplementation(() => ({
        getEntries: getEntriesStub,
        close: closeStub,
      }))

      const result = await SUT._countAmountOfFilesInZip({ ZipReader: zipReaderStub })('FILE' as any)
      expect(result).toEqual(2)
      expect(closeStub).toHaveBeenCalledWith()
      expect(getEntriesStub).toHaveBeenCalledWith()
      expect(zipReaderStub).toHaveBeenCalledWith(new BlobReader(new Blob(['FILE'])))
    })
  })
})
