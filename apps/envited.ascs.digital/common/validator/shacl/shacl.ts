import { DatasetCore, Quad } from '@rdfjs/types'
import { Dataset } from '@zazuko/env/lib/Dataset'
import { Entry } from '@zip.js/zip.js'
import { all, equals, keys, omit, pipe } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromFile, read } from '../../archive'
import { ERRORS } from '../../constants'
import { ContentTypes, Schemas } from './shacl.types'
import { fetchShaclSchema, loadDataset, parseStreamToDataset, validateShacl } from './shacl.utils'

export const _validateShaclFile =
  ({
    getShaclDataFromZip,
    loadDataset,
    validateShaclSchema,
  }: {
    getShaclDataFromZip: (file: File) => Promise<string>
    loadDataset: (data: string, contentType: ContentTypes) => Promise<DatasetCore<Quad, Quad>>
    validateShaclSchema: (data: DatasetCore<Quad, Quad>) => (type: Schemas) => Promise<boolean>
  }) =>
  async (file: File) => {
    try {
      const shaclData = await getShaclDataFromZip(file)
      const json = JSON.parse(shaclData)
      const templates = pipe(omit(['sh', 'skos', 'xsd']), keys)(json['@context'])

      const data = await loadDataset(shaclData, ContentTypes.jsonLd)
      const validateShaclTemplate = validateShaclSchema(data)
      const validationPromises = templates.map(type => validateShaclTemplate(type as Schemas))

      const validationResults = await Promise.all(validationPromises)

      if (!all(equals(true), validationResults)) {
        return { isValid: false, data: {}, error: ERRORS.ASSET_INVALID }
      }

      return { isValid: true, data: json }
    } catch {
      return { isValid: false, data: {}, error: ERRORS.ASSET_FILE_NOT_FOUND }
    }
  }

export const _validateShaclSchema =
  ({
    fetchShaclSchema,
    loadDataset,
    validateShacl,
  }: {
    fetchShaclSchema: (schema: Schemas) => Promise<string>
    loadDataset: (data: string, contentType: ContentTypes) => Promise<DatasetCore<Quad, Quad>>
    validateShacl: (shapes: DatasetCore<Quad, Quad>) => (data: DatasetCore<Quad, Quad>) => Promise<ValidationReport>
  }) =>
  (data: DatasetCore<Quad, Quad>) =>
  async (type: Schemas) => {
    try {
      const shaclSchema = await fetchShaclSchema(type)
      const schema = await loadDataset(shaclSchema, ContentTypes.ttl)
      const report = await validateShacl(schema)(data)

      return report.conforms
    } catch {
      return false
    }
  }

export const validateShaclSchema = _validateShaclSchema({
  fetchShaclSchema,
  loadDataset,
  validateShacl,
})

export const _getShaclDataFromZip =
  ({
    extract,
    read,
  }: {
    extract: (archive: File, fileName: string) => Promise<Entry>
    read: (file: Entry) => Promise<string>
  }) =>
  async (asset: File) =>
    extract(asset, 'metadata/domainMetadata.json').then(read)

export const getShaclDataFromZip = _getShaclDataFromZip({ extract: extractFromFile, read })

export const validateShaclFile = _validateShaclFile({
  getShaclDataFromZip,
  loadDataset,
  validateShaclSchema,
})

export const _validateShaclDataWithSchema =
  ({
    parseStreamToDataset,
    loadDataset,
    validateShacl,
  }: {
    parseStreamToDataset: (stream: NodeJS.ReadableStream, type: ContentTypes) => Promise<Dataset>
    loadDataset: (data: string, contentType: ContentTypes) => Promise<DatasetCore<Quad, Quad>>
    validateShacl: (shapes: DatasetCore<Quad, Quad>) => (data: DatasetCore<Quad, Quad>) => Promise<ValidationReport>
  }) =>
  async (data: string, stream: NodeJS.ReadableStream) => {
    try {
      const shaclSchema = await parseStreamToDataset(stream, ContentTypes.ttl)
      const shaclData = await loadDataset(data, ContentTypes.jsonLd)

      return validateShacl(shaclSchema)(shaclData)
    } catch {
      return {
        conforms: false,
      }
    }
  }

export const validateShaclDataWithSchema = _validateShaclDataWithSchema({
  parseStreamToDataset,
  loadDataset,
  validateShacl,
})
