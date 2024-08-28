import { DatasetCore, Quad } from '@rdfjs/types'
import { Dataset } from '@zazuko/env/lib/Dataset'
import { Entry } from '@zip.js/zip.js'
import { all, equals, keys, omit, pipe } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromFile, read } from '../../archive'
import { DOMAIN_METADATA_FILE, MANIFEST_FILE } from '../../asset/constants'
import { ERRORS } from '../../constants'
import { CONTEXT_DROP_SCHEMAS } from './shacl.constants'
import { ContentTypes, Schemas, ValidationSchema } from './shacl.types'
import { fetchShaclSchema, loadDataset, parseStreamToDataset, validateShacl } from './shacl.utils'

export const _validateShaclFile =
  ({
    validateManifest,
    validateDomainMetadata,
  }: {
    validateManifest: (file: File) => Promise<{ conforms: boolean; data: any }>
    validateDomainMetadata: (file: File) => Promise<{ conforms: boolean; data: any }>
  }) =>
  async (file: File) => {
    try {
      const { conforms: manifestConforms, data: manifest } = await validateManifest(file)
      const { conforms: domainMetadataConforms, data: domainMetadata } = await validateDomainMetadata(file)

      if (!manifestConforms) {
        return { isValid: false, data: {}, error: ERRORS.ASSET_INVALID }
      }

      if (!domainMetadataConforms) {
        return { isValid: false, data: {}, error: ERRORS.ASSET_INVALID }
      }

      return { isValid: true, data: { manifest, domainMetadata } }
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
    fetchShaclSchema: (schema: ValidationSchema) => Promise<string>
    loadDataset: (data: string, contentType: ContentTypes) => Promise<DatasetCore<Quad, Quad>>
    validateShacl: (shapes: DatasetCore<Quad, Quad>) => (data: DatasetCore<Quad, Quad>) => Promise<ValidationReport>
  }) =>
  (data: DatasetCore<Quad, Quad>) =>
  async (type: ValidationSchema) => {
    try {
      const shaclSchema = await fetchShaclSchema(type)
      const schema = await loadDataset(shaclSchema, ContentTypes.ttl)
      const { conforms } = await validateShacl(schema)(data)

      return conforms
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
  async (asset: File, fileName: string) =>
    extract(asset, fileName).then(read)

export const getShaclDataFromZip = _getShaclDataFromZip({ extract: extractFromFile, read })

export const _validateManifest =
  ({
    getShaclDataFromZip,
    loadDataset,
    validateShaclSchema,
  }: {
    getShaclDataFromZip: (file: File, fileName: string) => Promise<string>
    loadDataset: (data: string, contentType: ContentTypes) => Promise<DatasetCore<Quad, Quad>>
    validateShaclSchema: (data: DatasetCore<Quad, Quad>) => (type: ValidationSchema) => Promise<boolean>
  }) =>
  async (file: File) => {
    const data = await getShaclDataFromZip(file, MANIFEST_FILE)
    const dataset = await loadDataset(data, ContentTypes.jsonLd)
    const validation = await validateShaclSchema(dataset)(Schemas.manifest)

    return {
      conforms: validation,
      data: JSON.parse(data),
    }
  }

export const validateManifest = _validateManifest({
  getShaclDataFromZip,
  loadDataset,
  validateShaclSchema,
})

export const _validateDomainMetadata =
  ({
    getShaclDataFromZip,
    loadDataset,
    validateShaclSchema,
  }: {
    getShaclDataFromZip: (file: File, fileName: string) => Promise<string>
    loadDataset: (data: string, contentType: ContentTypes) => Promise<DatasetCore<Quad, Quad>>
    validateShaclSchema: (data: DatasetCore<Quad, Quad>) => (type: ValidationSchema) => Promise<boolean>
  }) =>
  async (file: File) => {
    try {
      const data = await getShaclDataFromZip(file, DOMAIN_METADATA_FILE)
      const json = JSON.parse(data)
      const templates = pipe(omit(CONTEXT_DROP_SCHEMAS), keys)(json['@context']) as ValidationSchema[]

      const dataset = await loadDataset(data, ContentTypes.jsonLd)
      const validateShaclTemplate = validateShaclSchema(dataset)
      const validationPromises = templates.map((type: ValidationSchema) => validateShaclTemplate(type))

      const validationResults = await Promise.all(validationPromises)

      if (!all(equals(true), validationResults)) {
        return {
          conforms: false,
          data: {},
        }
      }

      return {
        conforms: true,
        data: json,
      }
    } catch {
      return {
        conforms: false,
        data: {},
      }
    }
  }

export const validateDomainMetadata = _validateDomainMetadata({
  getShaclDataFromZip,
  loadDataset,
  validateShaclSchema,
})

export const validateShaclFile = _validateShaclFile({
  validateDomainMetadata,
  validateManifest,
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
