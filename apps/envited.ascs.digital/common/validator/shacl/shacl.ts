import { DatasetCore, Quad } from '@rdfjs/types'
import { Dataset } from '@zazuko/env/lib/Dataset'
import { Entry } from '@zip.js/zip.js'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromFile, read } from '../../archive'
import { ERRORS } from '../../constants'
import { ContentTypes, Schemas } from './shacl.types'
import { fetchShaclSchema, loadDataset, parseStreamToDataset, validateShacl } from './shacl.utils'

export const _validateShaclFile =
  ({
    getShaclDataFromZip,
    fetchShaclSchema,
    loadDataset,
    validateShacl,
  }: {
    getShaclDataFromZip: (file: File) => Promise<string>
    fetchShaclSchema: (schema: Schemas) => Promise<string>
    loadDataset: (data: string, contentType: ContentTypes) => Promise<DatasetCore<Quad, Quad>>
    validateShacl: (shapes: DatasetCore<Quad, Quad>) => (data: DatasetCore<Quad, Quad>) => Promise<ValidationReport>
  }) =>
  async (file: File) => {
    try {
      const shaclDataPromise = getShaclDataFromZip(file)
      const shaclSchemaPromise = fetchShaclSchema(Schemas.default)

      const shaclData = await shaclDataPromise
      const shaclSchema = await shaclSchemaPromise

      const schemaPromise = loadDataset(shaclSchema, ContentTypes.ttl)
      const dataPromise = loadDataset(shaclData, ContentTypes.jsonLd)

      const schema = await schemaPromise
      const data = await dataPromise

      const report = await validateShacl(schema)(data)

      if (!report.conforms) {
        return { isValid: false, data: {}, error: ERRORS.ASSET_INVALID }
      }

      return { isValid: report.conforms, data: report.dataset }
    } catch {
      return { isValid: false, data: {}, error: ERRORS.ASSET_FILE_NOT_FOUND }
    }
  }

export const _getShaclDataFromZip =
  ({
    extract,
    read,
  }: {
    extract: (archive: File, fileName: string) => Promise<Entry>
    read: (file: Entry) => Promise<string>
  }) =>
  async (asset: File) =>
    extract(asset, 'data.jsonld').then(read)

export const getShaclDataFromZip = _getShaclDataFromZip({ extract: extractFromFile, read })

export const validateShaclFile = _validateShaclFile({
  getShaclDataFromZip,
  fetchShaclSchema,
  loadDataset,
  validateShacl,
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
