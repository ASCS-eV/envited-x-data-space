import fs from 'fs'
import { all, equals, find, keys, omit, pipe, prop, propEq, replace } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromByteArray, read } from '../archive'
import { validateShaclDataWithSchema } from '../validator'
import { CONTEXT_DROP_SCHEMAS, SCHEMA_MAP } from '../validator/shacl/shacl.constants'
import { ValidationSchema } from '../validator/shacl/shacl.types'
import { DOMAIN_METADATA_FILE, LICENSE_FILE, MANIFEST_FILE } from './constants'
import { createModifiedManifest } from './createModifiedManifest'
import { createTokenMetadata } from './createTokenMetadata'
import { Manifest } from './types'
import { createFilename } from './validateAndCreateMetadata.utils'

export const getFileFromByteArray = async (byteArray: Uint8Array, filename: string) =>
  extractFromByteArray(byteArray, filename).then(read)

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
      const schema = fs.createReadStream(`${__dirname}${SCHEMA_MAP.manifest}`)
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
      const schemaTypes = pipe(omit(CONTEXT_DROP_SCHEMAS), keys)(parsedData['@context']) as ValidationSchema[]

      const validationPromises = schemaTypes.map((type: ValidationSchema) => {
        const schema = fs.createReadStream(`${__dirname}${SCHEMA_MAP[type]}`)
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
    createTokenMetadata,
    createModifiedManifest,
    createFilename,
    getFileFromByteArray,
  }: {
    getShaclSchemaAndValidate: (byteArray: Uint8Array) => Promise<
      | {
          conforms: boolean
          reports: (ValidationReport<any> | { conforms: boolean })[]
          data: { manifest?: undefined; domainMetadata?: undefined }
        }
      | { conforms: boolean; data: { manifest: any; domainMetadata: any }; reports: { conforms: boolean }[] }
    >
    createTokenMetadata: ({
      assetCID,
      manifestCID,
      domainMetadataCID,
      licenseCID,
      minter,
      creator,
      manifest,
      domainMetadata,
    }: {
      assetCID: string
      manifestCID: string
      domainMetadataCID: string
      licenseCID: string
      minter: string
      creator: string
      manifest: Manifest
      domainMetadata: any
    }) => any
    createModifiedManifest: ({
      assetCID,
      domainMetadataCID,
    }: {
      assetCID: string
      domainMetadataCID: string
    }) => (manifest: Manifest) => any
    createFilename: (byteArray: Uint8Array) => Promise<string>
    getFileFromByteArray: (byteArray: Uint8Array, filename: string) => any
  }) =>
  async (byteArray: Uint8Array) => {
    try {
      const { conforms, reports, data } = await getShaclSchemaAndValidate(byteArray)

      const assetCID = await createFilename(byteArray)
      const domainMetadataCID = await createFilename(data.domainMetadata)

      console.log('manifest', data.manifest)
      console.log('domainMetadata', data.domainMetadata)

      const modifiedManifest = createModifiedManifest({
        assetCID,
        domainMetadataCID,
      })(data.manifest)

      const modifiedManifestCID = await createFilename(modifiedManifest)
      console.log('modifiedManifest', modifiedManifest)
      
      const license = await getFileFromByteArray(byteArray, LICENSE_FILE)
      const licenseCID = await createFilename(license as any)
      console.log('license', license)
      
      // const firstMediaElement = find(propEq('visualization', 'manifest:type'))(
      //   data.manifest['manifest:data']['manifest:contentData'],
      // ) as any
      // const displayUriPath = firstMediaElement['manifest:relativePath']['@value']
      // const displayUri = await getFileFromByteArray(byteArray, replace('./', '')(displayUriPath))
      // const displayUriCID = await createFilename(displayUri as any)
      
      const tokenMetadata = createTokenMetadata({
        assetCID,
        manifestCID: modifiedManifestCID,
        domainMetadataCID: domainMetadataCID,
        licenseCID: licenseCID,
        minter: 'MINTER',
        creator: 'CREATOR',
        manifest: data.manifest,
        domainMetadata: data.domainMetadata,
      })
      console.log('tokenMetadata', tokenMetadata)
        
      const tokenMetadataCID = await createFilename(tokenMetadata)

      return {
        conforms,
        reports,
        metadata: {
          tokenMetadata,
          modifiedManifest,
          displayUriCID,
        },
        assetCID,
        metadataCID: tokenMetadataCID,
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const validateAndCreateMetadata = _validateAndCreateMetadata({
  getShaclSchemaAndValidate,
  createTokenMetadata,
  createModifiedManifest,
  createFilename,
  getFileFromByteArray,
})
