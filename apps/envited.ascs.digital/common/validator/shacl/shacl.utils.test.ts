import { ContentTypes } from './shacl.types'
import * as SUT from './shacl.utils'

describe('common/validator/shacl/shacl.utils', () => {
  describe('_parseStreamToDataset', () => {
    it('Should return a SHACL dataset', async () => {
      // when ... we want to parse a ttl file to rdf quads
      const stream = 'STREAM'
      const contentType = ContentTypes.jsonLd
      const parseStub = jest.fn().mockReturnValue('QUADS')
      const parserStub = {
        parse: parseStub,
      }
      const importStub = jest.fn()
      const rdfStub = {
        dataset: jest.fn().mockImplementation(() => ({
          import: importStub,
        })),
      }

      await SUT._parseStreamToDataset({ parser: parserStub as any, environment: rdfStub as any })(
        stream as any,
        contentType,
      )

      // then ... it should return a QUADS dataset
      expect(parseStub).toHaveBeenCalledWith('STREAM', { contentType: 'application/ld+json' })
      expect(importStub).toHaveBeenCalledWith('QUADS')
    })
  })

  describe('_loadDataset', () => {
    it('', async () => {
      // when ... we want to parse a file to rdf quads
      const data = 'DATA'
      const contentType = ContentTypes.jsonLd
      const parseStreamToDatasetStub = jest.fn().mockReturnValue('QUADS')
      const createReadableStreamStub = jest.fn().mockReturnValue('READABLE_STREAM')

      const result = await SUT._loadDataset({
        createReadableStream: createReadableStreamStub as any,
        parseStreamToDataset: parseStreamToDatasetStub as any,
      })(data, contentType)

      // then ... it should return a dataset
      expect(createReadableStreamStub).toHaveBeenCalledWith('DATA')
      expect(parseStreamToDatasetStub).toHaveBeenCalledWith('READABLE_STREAM', 'application/ld+json')
      expect(result).toEqual('QUADS')
    })
  })

  describe('createReadableStream', () => {
    it('Should return a readable stream', () => {
      const data = 'DATA_STRING'
      const expected = 16384
      const result = SUT.createReadableStream(data)

      expect(result._readableState.highWaterMark).toEqual(expected)
    })
  })
})
