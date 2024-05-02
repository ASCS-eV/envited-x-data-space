import { _loadDataset, loadDataset, validateShacl } from './turtleValidator.utils'

describe('common/turtleValidator.utils', () => {
  describe('_loadDataset', () => {
    it('Should return a SHACL dataset', async () => {
      // when ... we want to parse a ttl file to rdf quads
      // then ... it should return a QUADS dataset
      const file = 'FILE'
      const fileType = 'FILE_TYPE'

      const fsStub = {
        createReadStream: jest.fn().mockReturnValue('FILE_CONTENT'),
      }
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

      await _loadDataset({ fileSystem: fsStub as any, parser: parserStub as any, environment: rdfStub as any })(
        file,
        fileType,
      )

      expect(parseStub).toHaveBeenCalledWith('FILE_CONTENT', { contentType: 'FILE_TYPE' })
      expect(importStub).toHaveBeenCalledWith('QUADS')
    })
  })

  describe('validateShacl', () => {
    it('Should return a valid report', async () => {
      const shapes = `${process.cwd()}/apps/envited.ascs.digital/common/fixtures/shaclSchema.ttl`
      const data = `${process.cwd()}/apps/envited.ascs.digital/common/fixtures/shaclData.jsonld`

      const shapesGraph = await loadDataset(shapes, 'text/turtle')
      const dataGraph = await loadDataset(data, 'application/ld+json')

      const report = await validateShacl(shapesGraph)(dataGraph)

      expect(report.conforms).toBe(true)
    })
  })
})
