import { ERRORS } from '../constants'
import { Manifest } from './types'
import * as SUT from './validation'

describe('common/asset/validation', () => {
  describe('checkIfAllResourcessInManifestExist', () => {
    it('should return empty errors when all resources exist', async () => {
      // Setup stubs
      const extractStub = jest.fn().mockResolvedValue('file-content')
      
      // Create stub for getAllManifestLinksAndFormatPaths
      const getAllLinksStub = jest.fn().mockReturnValue(['file1.json', 'file2.txt', 'file3.md'])

      // Execute function with stubbed dependencies
      const result = await SUT.checkIfAllResourcessInManifestExist({
        extract: extractStub,
        getAllManifestLinksAndFormatPaths: getAllLinksStub
      })(
        new Uint8Array([1, 2, 3]),
        {} as Manifest,
      )

      // Verify
      expect(result).toEqual({
        errors: [],
        amount: 3,
      })
      expect(extractStub).toHaveBeenCalledTimes(3)
      expect(getAllLinksStub).toHaveBeenCalledWith({} as Manifest)
    })

    it('should report errors for missing resources', async () => {
      // Setup stubs
      const extractStub = jest.fn()
        .mockResolvedValueOnce('file1-content')
        .mockRejectedValueOnce(new Error('Not found'))
      
      // Create stub for getAllManifestLinksAndFormatPaths
      const getAllLinksStub = jest.fn().mockReturnValue(['file1.json', 'missing-file.txt'])

      // Execute function with stubbed dependencies
      const result = await SUT.checkIfAllResourcessInManifestExist({
        extract: extractStub,
        getAllManifestLinksAndFormatPaths: getAllLinksStub
      })(
        new Uint8Array([1, 2, 3]),
        {} as Manifest,
      )

      // Verify
      expect(result).toEqual({
        errors: [{ error: 'missing-file.txt' }],
        amount: 2,
      })
      expect(getAllLinksStub).toHaveBeenCalledWith({} as Manifest)
    })
  })

  describe('formatFilesErrorMessage', () => {
    it('should format error messages correctly', () => {
      const errors = [{ error: 'file1.json' }, { error: 'file2.txt' }]

      const result = SUT.formatFilesErrorMessage(errors)

      expect(result).toEqual(`${ERRORS.FILES_NOT_FOUND} - file1.json, file2.txt`)
    })
  })

  describe('validateAsset', () => {
    // Setup stubs for each test
    let extractManifestStub: jest.Mock
    let extractDomainMetadataStub: jest.Mock
    let checkIfAllResourcessInManifestExistStub: jest.Mock
    let countAmountOfFilesInZipStub: jest.Mock
    let extractReadmeStub: jest.Mock
    let fileToUint8ArrayStub: jest.Mock

    beforeEach(() => {
      // Create fresh stubs for each test
      extractManifestStub = jest.fn()
      extractDomainMetadataStub = jest.fn()
      checkIfAllResourcessInManifestExistStub = jest.fn()
      countAmountOfFilesInZipStub = jest.fn()
      extractReadmeStub = jest.fn()
      fileToUint8ArrayStub = jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3]))
    })

    it('should validate a complete and valid asset', async () => {
      // Setup stubs
      extractReadmeStub.mockResolvedValue('# Readme content')
      extractManifestStub.mockResolvedValue({
        conforms: true,
        data: { id: 'test-manifest' },
      })
      checkIfAllResourcessInManifestExistStub.mockResolvedValue({
        errors: [],
        amount: 5,
      })
      countAmountOfFilesInZipStub.mockResolvedValue(5)
      extractDomainMetadataStub.mockResolvedValue({
        conforms: true,
        data: { name: 'Test Asset' },
      })

      // Create function with stubs
      const validateAssetFn = SUT.validateAsset({
        extractManifest: extractManifestStub,
        extractDomainMetadata: extractDomainMetadataStub,
        checkIfAllResourcessInManifestExist: checkIfAllResourcessInManifestExistStub,
        countAmountOfFilesInZip: countAmountOfFilesInZipStub,
        extractReadme: extractReadmeStub,
        fileToUint8Array: fileToUint8ArrayStub,
      })

      // Execute
      const result = await validateAssetFn({} as File)

      // Verify
      expect(result).toEqual({
        isValid: true,
        data: {
          manifest: { id: 'test-manifest' },
          domainMetadata: { name: 'Test Asset' },
        },
      })
    })

    it('should fail validation when README is missing', async () => {
      // Setup stubs
      extractReadmeStub.mockResolvedValue(null)

      // Create function with stubs
      const validateAssetFn = SUT.validateAsset({
        extractManifest: extractManifestStub,
        extractDomainMetadata: extractDomainMetadataStub,
        checkIfAllResourcessInManifestExist: checkIfAllResourcessInManifestExistStub,
        countAmountOfFilesInZip: countAmountOfFilesInZipStub,
        extractReadme: extractReadmeStub,
        fileToUint8Array: fileToUint8ArrayStub,
      })

      // Execute
      const result = await validateAssetFn({} as File)

      // Verify
      expect(result).toEqual({
        isValid: false,
        data: {},
        error: ERRORS.README_FILE_NOT_FOUND,
      })
    })

    it('should fail validation when manifest files are missing', async () => {
      // Setup stubs
      extractReadmeStub.mockResolvedValue('# Readme content')
      extractManifestStub.mockResolvedValue({
        conforms: true,
        data: { id: 'test-manifest' },
      })
      checkIfAllResourcessInManifestExistStub.mockResolvedValue({
        errors: [{ error: 'missing.txt' }],
        amount: 5,
      })

      // Create function with stubs
      const validateAssetFn = SUT.validateAsset({
        extractManifest: extractManifestStub,
        extractDomainMetadata: extractDomainMetadataStub,
        checkIfAllResourcessInManifestExist: checkIfAllResourcessInManifestExistStub,
        countAmountOfFilesInZip: countAmountOfFilesInZipStub,
        extractReadme: extractReadmeStub,
        fileToUint8Array: fileToUint8ArrayStub,
      })

      // Execute
      const result = await validateAssetFn({} as File)

      // Verify
      expect(result.isValid).toBe(false)
      expect(result.error).toContain(ERRORS.FILES_NOT_FOUND)
    })

    it('should fail validation when file count mismatch', async () => {
      // Setup stubs
      extractReadmeStub.mockResolvedValue('# Readme content')
      extractManifestStub.mockResolvedValue({
        conforms: true,
        data: { id: 'test-manifest' },
      })
      checkIfAllResourcessInManifestExistStub.mockResolvedValue({
        errors: [],
        amount: 5,
      })
      countAmountOfFilesInZipStub.mockResolvedValue(6) // One extra file

      // Create function with stubs
      const validateAssetFn = SUT.validateAsset({
        extractManifest: extractManifestStub,
        extractDomainMetadata: extractDomainMetadataStub,
        checkIfAllResourcessInManifestExist: checkIfAllResourcessInManifestExistStub,
        countAmountOfFilesInZip: countAmountOfFilesInZipStub,
        extractReadme: extractReadmeStub,
        fileToUint8Array: fileToUint8ArrayStub,
      })

      // Execute
      const result = await validateAssetFn({} as File)

      // Verify
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('6 files found, should be 5 files')
    })

    it('should handle errors during validation', async () => {
      // Setup stubs
      extractReadmeStub.mockRejectedValue(new Error('Test error'))

      // Create function with stubs
      const validateAssetFn = SUT.validateAsset({
        extractManifest: extractManifestStub,
        extractDomainMetadata: extractDomainMetadataStub,
        checkIfAllResourcessInManifestExist: checkIfAllResourcessInManifestExistStub,
        countAmountOfFilesInZip: countAmountOfFilesInZipStub,
        extractReadme: extractReadmeStub,
        fileToUint8Array: fileToUint8ArrayStub,
      })

      // Execute
      const result = await validateAssetFn({} as File)

      // Verify
      expect(result).toEqual({
        isValid: false,
        data: {},
        error: 'Test error',
      })
    })
  })
})
