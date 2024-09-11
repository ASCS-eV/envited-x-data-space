import fs from 'fs'
import { all, equals, keys, omit, pipe, prop } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromByteArray, read } from '../archive'
import { AssetMetadata } from '../types'
import { validateShaclDataWithSchema } from '../validator'
import { CONTEXT_DROP_SCHEMAS, SCHEMA_MAP } from '../validator/shacl/shacl.constants'
import { ValidationSchema } from '../validator/shacl/shacl.types'
import { DOMAIN_METADATA_FILE, MANIFEST_FILE } from './constants'
import { createFilename } from './validateAndCreateMetadata.utils'

export const getFileFromByteArray = async (byteArray: Uint8Array, filename: string) =>
  extractFromByteArray(byteArray, filename).then(read)

export const createMetadata = ({ name }: { name: string }) => {
  return {
    name,
    symbol: 'ENVITED',
    decimals: 2,
    shouldPreferSymbol: true,
    thumbnailUri: 'THUMBNAIL_URI',
    attributes: [],
    assets: [],
  }
}

export const _getShaclSchemaAndValidate =
  ({
    validateManifest,
    validateDomainMetadata,
  }: {
    validateManifest: (
      byteArray: Uint8Array,
    ) => Promise<{ conforms: boolean; report: ValidationReport<any> | { conforms: boolean }; data: any }>
    validateDomainMetadata: (
      byteArray: Uint8Array,
    ) => Promise<{ conforms: boolean; reports: (ValidationReport<any> | { conforms: boolean })[]; data: any }>
  }) =>
  async (byteArray: Uint8Array) => {
    try {
      const manifestPromise = validateManifest(byteArray)
      const domainMetadataPromise = validateDomainMetadata(byteArray)

      const manifestResult = await manifestPromise
      console.log('manifestPromise', manifestResult)
      const { conforms: manifestConforms, report: manifestReport, data: manifest } = manifestResult

      // const { conforms: manifestConforms, report: manifestReport, data: manifest } = await manifestPromise

      const domainMetadataResult = await domainMetadataPromise
      console.log('domainMetadataResult', domainMetadataResult)
      const {
        conforms: domainMetadataConforms,
        reports: domainMetadataReports,
        data: domainMetadata,
      } = domainMetadataResult
      // const {
      //   conforms: domainMetadataConforms,
      //   reports: domainMetadataReports,
      //   data: domainMetadata,
      // } = await domainMetadataPromise

      if (!manifestConforms) {
        return { conforms: manifestConforms, reports: [manifestReport], data: {} }
      }

      if (!domainMetadataConforms) {
        return { conforms: domainMetadataConforms, reports: domainMetadataReports, data: {} }
      }

      return {
        conforms: domainMetadataConforms,
        data: { manifest, domainMetadata },
        reports: [...domainMetadataReports, manifestReport],
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const _validateManifest =
  ({
    getFileFromByteArray,
    validateShaclDataWithSchema,
    fs,
  }: {
    getFileFromByteArray: (byteArray: Uint8Array, filename: string) => any
    validateShaclDataWithSchema: (
      data: string,
      stream: NodeJS.ReadableStream,
    ) => Promise<
      | ValidationReport<any>
      | {
          conforms: boolean
        }
    >
    fs: any
  }) =>
  async (byteArray: Uint8Array) => {
    try {
      const data = await getFileFromByteArray(byteArray, MANIFEST_FILE)
      console.log('validateManifest - data', data)

      const schema = fs.createReadStream(`${__dirname}/schemas/${SCHEMA_MAP.manifest}`)
      console.log('validateManifest - data', schema)
      const validation = await validateShaclDataWithSchema(data, schema)
      console.log('validateManifest - validation', validation)

      return {
        conforms: validation.conforms,
        report: validation,
        data: JSON.parse(data),
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const validateManifest = _validateManifest({
  getFileFromByteArray,
  validateShaclDataWithSchema,
  fs,
})

export const _validateDomainMetadata =
  ({
    getFileFromByteArray,
    validateShaclDataWithSchema,
    fs,
  }: {
    getFileFromByteArray: (byteArray: Uint8Array, filename: string) => any
    validateShaclDataWithSchema: (
      data: string,
      stream: NodeJS.ReadableStream,
    ) => Promise<
      | ValidationReport<any>
      | {
          conforms: boolean
        }
    >
    fs: any
  }) =>
  async (byteArray: Uint8Array) => {
    try {
      console.log('validateDomainMetadata - DomainMetadataFile ', DOMAIN_METADATA_FILE)
      const data = await getFileFromByteArray(byteArray, DOMAIN_METADATA_FILE)
      const parsedData = JSON.parse(data)
      console.log('validateDomainMetadata - data', parsedData)
      const schemaTypes = pipe(omit(CONTEXT_DROP_SCHEMAS), keys)(parsedData['@context']) as ValidationSchema[]
      console.log('validateDomainMetadata - schemaTypes', schemaTypes)

      const validationPromises = schemaTypes.map((type: ValidationSchema) => {
        const schema = fs.createReadStream(`${__dirname}/schemas/${SCHEMA_MAP[type]}`)
        console.log('validationPromises - schema', schema)
        return validateShaclDataWithSchema(data, schema)
      })
      const validationResults = await Promise.all(validationPromises)

      return {
        conforms: all(x => equals(true)(prop('conforms')(x)), validationResults),
        reports: validationResults,
        data: parsedData,
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const validateDomainMetadata = _validateDomainMetadata({
  getFileFromByteArray,
  validateShaclDataWithSchema,
  fs,
})

export const getShaclSchemaAndValidate = _getShaclSchemaAndValidate({
  validateManifest,
  validateDomainMetadata,
})

export const _validateAndCreateMetadata =
  ({
    getShaclSchemaAndValidate,
    createMetadata,
    createFilename,
  }: {
    getShaclSchemaAndValidate: (byteArray: Uint8Array) => Promise<
      | {
          conforms: boolean
          reports: (ValidationReport<any> | { conforms: boolean })[]
          data: { manifest?: undefined; domainMetadata?: undefined }
        }
      | { conforms: boolean; data: { manifest: any; domainMetadata: any }; reports: { conforms: boolean }[] }
    >
    createMetadata: ({ name }: { name: string }) => AssetMetadata
    createFilename: (byteArray: Uint8Array) => Promise<string>
  }) =>
  async (byteArray: Uint8Array) => {
    try {
      const result = await getShaclSchemaAndValidate(byteArray)
      console.log('validateAndCreateMetadata getShaclSchemaAndValidate', result)
      const { conforms, reports, data } = result
      const metadata = createMetadata({ name: data as string })

      const assetCID = await createFilename(byteArray)
      const metadataCID = await createFilename(metadata as any)

      return {
        conforms,
        reports,
        metadata,
        assetCID,
        metadataCID,
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const validateAndCreateMetadata = _validateAndCreateMetadata({
  getShaclSchemaAndValidate,
  createMetadata,
  createFilename,
})
