import { DatasetCore, Quad } from '@rdfjs/types'
import rdf, { DefaultEnv } from '@zazuko/env'
import { Dataset } from '@zazuko/env/lib/Dataset'
import rdfParser, { RdfParser } from 'rdf-parse'
import SHACLValidator from 'rdf-validate-shacl'
import { Readable } from 'stream'

import { SCHEMA_MAP } from './shacl.constants'
import { ContentTypes, ValidationSchemas } from './shacl.types'

export const validateShacl = (shapes: DatasetCore<Quad, Quad>) => async (data: DatasetCore<Quad, Quad>) => {
  const validator = new SHACLValidator(shapes, { factory: rdf })

  return validator.validate(data)
}

export const _parseStreamToDataset =
  ({ parser, environment }: { parser: RdfParser<Quad>; environment: DefaultEnv }) =>
  (stream: NodeJS.ReadableStream, contentType: ContentTypes) => {
    const quads = parser.parse(stream, { contentType })

    return environment.dataset().import(quads)
  }

export const parseStreamToDataset = _parseStreamToDataset({ parser: rdfParser, environment: rdf })

export const fetchShaclSchema = async (type: ValidationSchemas) => {
  const { body } = await fetch(SCHEMA_MAP[type])

  return new Response(body).text()
}

export const createReadableStream = (data: string) => {
  const input = new Readable({
    read: () => {
      input.push(data)
      input.push(null)
    },
  })

  return input
}

export const _loadDataset =
  ({
    createReadableStream,
    parseStreamToDataset,
  }: {
    createReadableStream: (data: string) => any
    parseStreamToDataset: (stream: NodeJS.ReadableStream, contentType: ContentTypes) => Promise<Dataset>
  }) =>
  (data: string, contentType: ContentTypes) =>
    parseStreamToDataset(createReadableStream(data), contentType)

export const loadDataset = _loadDataset({
  createReadableStream,
  parseStreamToDataset,
})
