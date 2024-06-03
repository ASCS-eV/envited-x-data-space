import { DatasetCore, Quad } from '@rdfjs/types'
import { Entry } from '@zip.js/zip.js'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromZipFile, read } from '../../archive'
import { ERRORS } from '../../constants'
import { ContentTypes, Schemas } from './shacl.types'
import { fetchShaclSchema, loadDataset, validateShacl } from './shacl.utils'

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

export const getShaclDataFromZip = _getShaclDataFromZip({ extract: extractFromZipFile, read })

export const validateShaclFile = _validateShaclFile({
  getShaclDataFromZip,
  fetchShaclSchema,
  loadDataset,
  validateShacl,
})
