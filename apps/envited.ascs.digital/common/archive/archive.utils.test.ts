import * as SUT from './archive.utils'
import { BlobTypes } from './types'

describe('common/archive.utils', () => {
  describe('_transformByteArrayToBlob', () => {
    it('Should return a Blob', () => {
      // when ... we want to transfrom a ByteArray to a Blob
      // then ... it should return a Blob
      const blobStub = jest.fn()

      SUT._transformByteArrayToBlob(blobStub)('BYTE_ARRAY' as any, BlobTypes.zip)
      expect(blobStub).toHaveBeenCalledWith(['BYTE_ARRAY'], { type: BlobTypes.zip })
    })
  })

  describe('_transformByteArrayToReadable', () => {
    it('Should return a readable', () => {
      // when ... we want to transfrom a ByteArray to a readableStream
      // then ... it should return a readableStream
      const blobReaderStub = jest.fn()
      const transformByteArrayToBlobStub = jest.fn().mockReturnValue('BLOB')

      SUT._transformByteArrayToReadable({
        BlobReader: blobReaderStub,
        transformByteArrayToBlob: transformByteArrayToBlobStub,
      })('BYTE_ARRAY' as any, BlobTypes.zip)
      expect(blobReaderStub).toHaveBeenCalledWith('BLOB')
    })
  })
})
