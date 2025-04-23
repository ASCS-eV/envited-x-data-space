import { DatasetCore, Quad } from '@rdfjs/types'
import { Readable } from 'stream'

import * as SUT from './shacl'

describe('common/shacl/shacl', () => {
  describe('validateShacl', () => {
    it('should validate data against shapes', async () => {
      // Given stubs for dependencies
      const mockDataset = {} as DatasetCore<Quad, Quad>
      const mockValidationReport = {
        conforms: true,
        results: [],
      }

      // Create a mock stream
      const mockStream = new Readable({
        read() {
          /* noop */
        },
      })

      const datasetStub = {
        import: jest.fn().mockResolvedValue(mockDataset),
      }

      const rdfStub = {
        dataset: jest.fn().mockReturnValue(datasetStub),
        fromFile: jest.fn().mockReturnValue('file-stream'),
      }

      const validatorStub = {
        validate: jest.fn().mockReturnValue(mockValidationReport),
      }

      const SHACLValidatorStub = jest.fn().mockImplementation(() => validatorStub)

      // When we create a validator with these stubs
      const validateShacl = SUT.validateShacl({
        rdf: rdfStub as any,
        SHACLValidator: SHACLValidatorStub as any,
      })

      // And validate data with it
      const result = await validateShacl(mockStream)(mockStream)

      // Then the correct functions should be called
      expect(datasetStub.import).toHaveBeenCalledWith(mockStream)
      expect(SHACLValidatorStub).toHaveBeenCalledWith(mockDataset, { factory: rdfStub })
      expect(validatorStub.validate).toHaveBeenCalledWith(mockDataset)

      // And the result should match the validation report structure
      expect(result).toEqual({
        conforms: true,
        report: [],
      })
    })

    it('should handle errors during shape loading', async () => {
      // Given stubs for dependencies
      const mockDataset = {} as DatasetCore<Quad, Quad>
      const importError = new Error('Failed to import')

      // Create a mock stream
      const mockStream = new Readable({
        read() {
          /* noop */
        },
      })

      const datasetStub = {
        import: jest
          .fn()
          .mockResolvedValueOnce(mockDataset) // First call for data stream succeeds
          .mockRejectedValueOnce(importError), // Second call for shapes fails
      }

      const rdfStub = {
        dataset: jest.fn().mockReturnValue(datasetStub),
        fromFile: jest.fn().mockReturnValue('file-stream'),
      }

      const validatorStub = {
        validate: jest.fn(),
      }

      const SHACLValidatorStub = jest.fn().mockImplementation(() => validatorStub)

      // When we create a validator with these dependencies
      const validateShacl = SUT.validateShacl({
        rdf: rdfStub as any,
        SHACLValidator: SHACLValidatorStub as any,
      })

      // Then it should throw the error
      await expect(validateShacl(mockStream)(mockStream)).rejects.toThrow(importError)

      // And the validator should not be created
      expect(SHACLValidatorStub).not.toHaveBeenCalled()
    })
  })
})
