import { Readable } from 'stream'

export const validateShacl =
  ({ rdf, SHACLValidator }: { rdf: any; SHACLValidator: typeof import('rdf-validate-shacl') }) =>
  (shape: Readable) =>
  async (dataStream: Readable) => {
    const dataset = await rdf.dataset().import(dataStream)
    const shapes = await rdf.dataset().import(shape)
    const validator = new SHACLValidator(shapes, { factory: rdf })
    const validation = validator.validate(dataset)

    return { conforms: validation.conforms, report: validation.results }
  }
