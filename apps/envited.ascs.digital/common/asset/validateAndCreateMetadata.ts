import fs from 'fs'
import { all, equals, keys, omit, pipe, prop } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromByteArray, read } from '../archive'
import { AssetMetadata } from '../types'
import { validateShaclDataWithSchema } from '../validator'
import { CONTEXT_DROP_SCHEMAS, SCHEMA_MAP } from '../validator/shacl/shacl.constants'
import { ValidationSchemas } from '../validator/shacl/shacl.types'
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

      const { conforms: manifestConforms, report: manifestReport, data: manifest } = await manifestPromise
      const {
        conforms: domainMetadataConforms,
        reports: domainMetadataReports,
        data: domainMetadata,
      } = await domainMetadataPromise

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
      const schema = fs.createReadStream(`${__dirname}/schemas/${SCHEMA_MAP.manifest}`)
      const validation = await validateShaclDataWithSchema(data, schema)

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
      const data = await getFileFromByteArray(byteArray, DOMAIN_METADATA_FILE)
      const parsedData = JSON.parse(data)
      const schemaTypes = pipe(omit(CONTEXT_DROP_SCHEMAS), keys)(parsedData['@context']) as ValidationSchemas[]

      const validationPromises = schemaTypes.map((type: ValidationSchemas) => {
        const schema = fs.createReadStream(`${__dirname}/schemas/${SCHEMA_MAP[type]}`)
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
      const { conforms, reports, data } = await getShaclSchemaAndValidate(byteArray)
      const metadata = createMetadata({ name: data?.domainMetadata['@type'] as string })

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
