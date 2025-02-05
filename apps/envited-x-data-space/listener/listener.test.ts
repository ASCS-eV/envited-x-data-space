import { fileTypeFromBuffer } from 'file-type'

import * as SUT from './listener'

jest.mock('file-type')

describe.skip('createLocalCopy', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('should download a file from IPFS and upload it to S3', async () => {
    // Setup your mock as needed for specific tests
    (fileTypeFromBuffer as jest.Mock).mockResolvedValue({
      ext: 'png',
      mime: 'image/png',
    })

    const cid = 'CID'
    const data = 'DATA'
    const contentType = 'CONTENT_TYPE'

    const downloadFileStub = jest.fn().mockResolvedValue({ data, contentType })
    const uploadFileToS3Stub = jest.fn().mockResolvedValue({} as any)

    await SUT.createLocalCopy({ uploadFileToS3: uploadFileToS3Stub })(cid)

    expect(downloadFileStub).toHaveBeenCalledTimes(1)
    expect(downloadFileStub).toHaveBeenCalledWith(cid)

    expect(uploadFileToS3Stub).toHaveBeenCalledTimes(1)
    expect(uploadFileToS3Stub).toHaveBeenCalledWith(
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

    const uploadFileToS3Stub = jest.fn().mockResolvedValue({} as any)

    await expect(
      SUT.createLocalCopy({ uploadFileToS3: uploadFileToS3Stub })(cid),
    ).rejects.toThrow('No data')
  })

  it('should throw an error if the file is not downloaded correctly', async () => {
    const cid = 'CID'

    const uploadFileToS3Stub = jest.fn().mockResolvedValue({} as any)

    await expect(
      SUT.createLocalCopy({ uploadFileToS3: uploadFileToS3Stub })(cid),
    ).rejects.toThrow('Error')
  })
})
