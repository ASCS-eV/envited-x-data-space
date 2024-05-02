import { DatasetCore, Quad } from '@rdfjs/types'
import rdf from '@zazuko/env'
import fs from 'fs'
import rdfParser, { RdfParser } from 'rdf-parse'
import SHACLValidator from 'rdf-validate-shacl'

import { internalServerErrorError } from '../../utils'

export const _loadDataset =
  ({ fileSystem, parser, environment }: { fileSystem: any; parser: RdfParser<Quad>; environment: any }) =>
  async (filePath: fs.PathLike, contentType: string): Promise<DatasetCore<Quad, Quad>> => {
    try {
      const stream = fileSystem.createReadStream(filePath)
      const quads = parser.parse(stream, { contentType })

      return environment.dataset().import(quads)
    } catch (e) {
      throw internalServerErrorError()
    }
  }

export const loadDataset = _loadDataset({ fileSystem: fs, parser: rdfParser, environment: rdf })

export const validateShacl = (shapes: DatasetCore<Quad, Quad>) => async (data: DatasetCore<Quad, Quad>) => {
  try {
    const validator = new SHACLValidator(shapes, { factory: rdf })

    return validator.validate(data)
  } catch (e) {
    throw internalServerErrorError()
  }
}
