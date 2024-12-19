import { fileTypeFromBuffer } from 'file-type'

import * as SUT from './listener'

jest.mock('file-type')

describe('createLocalCopy', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it.only('should download a file from IPFS and upload it to S3', async () => {
    // Setup your mock as needed for specific tests
    ;(fileTypeFromBuffer as jest.Mock).mockResolvedValue({
      ext: 'png',
      mime: 'image/png',
    })

    const cid = 'CID'
    const data = 'DATA'
    const contentType = 'CONTENT_TYPE'

    const downloadFileMock = jest.fn().mockResolvedValue({ data, contentType })
    const s3ClientStub = {
      send: jest.fn().mockResolvedValue({} as any),
    } as any

    await SUT.createLocalCopy({ s3Client: s3ClientStub, downloadFile: downloadFileMock })(cid)

    expect(downloadFileMock).toHaveBeenCalledTimes(1)
    expect(downloadFileMock).toHaveBeenCalledWith(cid)

    expect(s3ClientStub.send).toHaveBeenCalledTimes(1)
    expect(s3ClientStub.send).toHaveBeenCalledWith(
      expect.objectContaining({
        Bucket: process.env.ASSET_BUCKET_NAME,
        Key: cid,
        Body: data,
        ContentType: contentType,
        ContentDisposition: 'inline',
      }),
    )
  })

  it('should throw an error if the file is not found on IPFS', async () => {
    const cid = 'CID'

    const downloadFileMock = jest.fn().mockResolvedValue(null)
    const s3ClientStub = {
      send: jest.fn().mockResolvedValue({} as any),
    } as any

    await expect(SUT.createLocalCopy({ s3Client: s3ClientStub, downloadFile: downloadFileMock })(cid)).rejects.toThrow(
      'No data',
    )
  })

  it('should throw an error if the file is not downloaded correctly', async () => {
    const cid = 'CID'

    const downloadFileMock = jest.fn().mockRejectedValue(new Error('Error'))
    const s3ClientStub = {
      send: jest.fn().mockResolvedValue({} as any),
    } as any

    await expect(SUT.createLocalCopy({ s3Client: s3ClientStub, downloadFile: downloadFileMock })(cid)).rejects.toThrow(
      'Error',
    )
  })
})
