import * as SUT from './ipfs'

describe('common/ipfs/ipfs', () => {
  it('should upload the asset token metadata to IPFS as expected with a group', async () => {
    // when ... we want to upload the asset token metadata to IPFS
    // then ... it should upload and return the asset token metadata as expected
    const addMetadataStub = jest.fn().mockReturnThis() // Return the same object for chaining
    const groupStub = jest.fn().mockResolvedValue({ IpfsHash: 'IPFS HASH' }) // Mock the group() method

    const jsonStub = jest.fn().mockReturnValue({
      addMetadata: addMetadataStub,
    })

    addMetadataStub.mockReturnValue({
      group: groupStub,
    })

    const convertStub = jest.fn().mockResolvedValue('IPFS URL')
    const pinataStub = {
      upload: {
        json: jsonStub,
      },
      gateways: {
        convert: convertStub,
      },
    } as any

    const result = await SUT.uploadJson(pinataStub)({
      data: { name: 'asset' },
      filename: 'FILENAME',
      group: 'GROUP_ID',
    })

    expect(result).toEqual('IPFS URL')
    expect(jsonStub).toHaveBeenCalledWith({ name: 'asset' })
    expect(addMetadataStub).toHaveBeenCalledWith({ name: 'FILENAME' })
    expect(groupStub).toHaveBeenCalledWith('GROUP_ID')
    expect(convertStub).toHaveBeenCalledWith('IPFS HASH')
  })
  it('should upload the asset token metadata to IPFS as expected without a group', async () => {
    // when ... we want to upload the asset token metadata to IPFS
    // then ... it should upload and return the asset token metadata as expected
    const addMetadataStub = jest.fn().mockResolvedValue({ IpfsHash: 'IPFS HASH' })
    const groupStub = jest.fn()

    const jsonStub = jest.fn().mockReturnValue({
      addMetadata: addMetadataStub,
    })

    const convertStub = jest.fn().mockResolvedValue('IPFS URL')
    const pinataStub = {
      upload: {
        json: jsonStub,
      },
      gateways: {
        convert: convertStub,
      },
    } as any

    const result = await SUT.uploadJson(pinataStub)({ data: { name: 'asset' }, filename: 'FILENAME' })

    expect(result).toEqual('IPFS URL')
    expect(jsonStub).toHaveBeenCalledWith({ name: 'asset' })
    expect(addMetadataStub).toHaveBeenCalledWith({ name: 'FILENAME' })
    expect(groupStub).not.toHaveBeenCalled()
    expect(convertStub).toHaveBeenCalledWith('IPFS HASH')
  })
  it('should create a group as expected', async () => {
    // when ... we want to create a group
    // then ... it should create and return the group as expected
    const createStub = jest.fn().mockResolvedValue({ id: 'GROUP_ID' })
    const pinataStub = {
      groups: {
        create: createStub,
      },
    } as any

    const result = await SUT.createGroup(pinataStub)('GROUP_NAME')

    expect(result).toEqual('GROUP_ID')
    expect(createStub).toHaveBeenCalledWith({ name: 'GROUP_NAME' })
  })
})
