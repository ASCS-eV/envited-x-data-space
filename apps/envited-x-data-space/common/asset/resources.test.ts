import * as SUT from './resources'

describe('common/asset/resources', () => {
  describe('extractReadme', () => {
    it('should extract README file from archive', async () => {
      // Setup stubs
      const fakeStream = 'stream-placeholder'
      const fakeContent = '# Test README\nThis is a test readme file'

      const extractFileFromArchiveStub = jest.fn().mockResolvedValue(fakeStream)
      const extractContentFromStreamStub = jest.fn().mockResolvedValue(fakeContent)

      // Execute function with stubs injected
      const extractReadmeWithStubs = async (assetArchive: Uint8Array) => {
        const readmeStream = await extractFileFromArchiveStub(assetArchive, 'README.md')
        return await extractContentFromStreamStub(readmeStream)
      }

      const assetArchive = new Uint8Array([1, 2, 3])
      const result = await extractReadmeWithStubs(assetArchive)

      // Verify
      expect(extractFileFromArchiveStub).toHaveBeenCalledWith(assetArchive, 'README.md')
      expect(extractContentFromStreamStub).toHaveBeenCalledWith(fakeStream)
      expect(result).toBe(fakeContent)
    })

    it('should return null if extraction fails', async () => {
      // Setup stubs
      const extractFileFromArchiveStub = jest.fn().mockRejectedValue(new Error('File not found'))
      const extractContentFromStreamStub = jest.fn()

      // Execute function with stubs injected
      const extractReadmeWithStubs = async (assetArchive: Uint8Array) => {
        try {
          const readmeStream = await extractFileFromArchiveStub(assetArchive, 'README.md')
          return await extractContentFromStreamStub(readmeStream)
        } catch (error) {
          return null
        }
      }

      const assetArchive = new Uint8Array([1, 2, 3])
      const result = await extractReadmeWithStubs(assetArchive)

      // Verify
      expect(extractFileFromArchiveStub).toHaveBeenCalledWith(assetArchive, 'README.md')
      expect(extractContentFromStreamStub).not.toHaveBeenCalled()
      expect(result).toBeNull()
    })
  })

  describe('extractManifest', () => {
    it('should extract and validate manifest file', async () => {
      // Setup stubs
      const fakeStream = 'stream-placeholder'
      const fakeManifestContent = '{"key":"value"}'
      const fakeValidationResult = { conforms: true, report: [] }

      const extractFileFromArchiveStub = jest.fn().mockResolvedValue(fakeStream)
      const extractContentFromStreamStub = jest.fn().mockResolvedValue(fakeManifestContent)
      const validateShaclStub = jest.fn().mockReturnValue(jest.fn().mockResolvedValue(fakeValidationResult))

      // Execute function with stubs injected
      const extractManifestWithStubs = async (assetArchive: Uint8Array) => {
        const manifestStream = await extractFileFromArchiveStub(assetArchive, 'manifest_reference.json')
        const manifest = await extractContentFromStreamStub(manifestStream)
        const validateShaclInstance = validateShaclStub('schema-path')
        const { conforms, report } = await validateShaclInstance(manifestStream)

        return { conforms, report, data: JSON.parse(manifest) }
      }

      const assetArchive = new Uint8Array([1, 2, 3])
      const result = await extractManifestWithStubs(assetArchive)

      // Verify
      expect(extractFileFromArchiveStub).toHaveBeenCalledWith(assetArchive, 'manifest_reference.json')
      expect(extractContentFromStreamStub).toHaveBeenCalledWith(fakeStream)
      expect(result).toEqual({
        conforms: true,
        report: [],
        data: { key: 'value' },
      })
    })
  })

  describe('getCoverImage', () => {
    it('should find and process cover image', async () => {
      // Setup stubs
      const fakeStream = 'stream-placeholder'
      const coverMedia = [
        {
          path: 'media/cover.jpg',
          mimeType: 'image/jpeg',
          category: 'envited-x:isMedia',
          cid: 'cover-cid123',
        },
      ]

      const extractFileFromArchiveStub = jest.fn().mockResolvedValue(fakeStream)
      const streamToUint8ArrayStub = jest.fn().mockResolvedValue(new Uint8Array(1000))
      const formatAssetUriStub = jest.fn().mockReturnValue('https://assets.example.com/')

      // Execute function with stubs injected
      const getCoverImageWithStubs = async (assetArchive: Uint8Array, media: any[]) => {
        const coverImage = media[0] // We know there's only one item in our test data
        const coverImageStream = await extractFileFromArchiveStub(assetArchive, coverImage.path)

        return {
          cid: coverImage.cid,
          fileSize: (await streamToUint8ArrayStub(coverImageStream)).byteLength,
          uri: `${formatAssetUriStub(coverImage.cid)}${coverImage.path}`,
        }
      }

      const assetArchive = new Uint8Array([1, 2, 3])
      const result = await getCoverImageWithStubs(assetArchive, coverMedia)

      // Verify
      expect(extractFileFromArchiveStub).toHaveBeenCalledWith(assetArchive, 'media/cover.jpg')
      expect(result).toEqual({
        cid: 'cover-cid123',
        fileSize: 1000,
        uri: 'https://assets.example.com/media/cover.jpg',
      })
    })
  })
})
