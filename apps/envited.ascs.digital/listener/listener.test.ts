import * as SUT from './listener'

describe('createLocalCopy', () => {
  it('should download a file from IPFS and upload it to S3', async () => {
    const cid = 'CID'
    const data = 'DATA'
    const contentType = 'CONTENT_TYPE'

    const downloadFileMock = jest.fn().mockResolvedValue({ data, contentType })
    const s3ClientStub = {
      send: jest.fn().mockResolvedValue({} as any),
    }

    await SUT.createLocalCopy(cid, downloadFileMock, s3ClientStub)

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

    await expect(SUT.createLocalCopy(cid, downloadFileMock)).rejects.toThrow('No data')
  })

  it('should throw an error if the file is not downloaded correctly', async () => {
    const cid = 'CID'

    const downloadFileMock = jest.fn().mockRejectedValue(new Error('Error'))

    await expect(SUT.createLocalCopy(cid, downloadFileMock)).rejects.toThrow('Error')
  })
})
