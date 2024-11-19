import fs from 'fs'
import { all, equals, filter, find, keys, omit, pipe, prop, propEq } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { db } from '../database/queries'
import { Database } from '../database/types'
import { Asset } from '../types'
import { extractAddressFromDid } from '../utils'
import { validateShaclDataWithSchema } from '../validator'
import { CONTEXT_DROP_SCHEMAS, SCHEMA_MAP } from '../validator/shacl/shacl.constants'
import { ValidationSchema } from '../validator/shacl/shacl.types'
import { MANIFEST_FILE } from './constants'
import { createModifiedManifest } from './createModifiedManifest'
import { createTokenMetadata } from './createTokenMetadata'
import { ExtractedFile, Manifest, ManifestExtractedFiles } from './types'
import {
  createFilename,
  getAllFilenamesFromFiles,
  getDomainMetadataPath,
  getFileFromByteArray,
  getFilesAsPathAndByteArrayFromManifest,
} from './validateAndCreateMetadata.utils'

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
      manifest: Manifest,
    ) => Promise<{ conforms: boolean; reports: (ValidationReport<any> | { conforms: boolean })[]; data: any }>
  }) =>
  async (byteArray: Uint8Array) => {
    try {
      const { conforms: manifestConforms, report: manifestReport, data: manifest } = await validateManifest(byteArray)
      const domainMetadataPromise = validateDomainMetadata(byteArray, manifest)

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
  async (byteArray: Uint8Array, manifest: Manifest) => {
    try {
      const data = await getFileFromByteArray(byteArray, getDomainMetadataPath(manifest))
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
    getFilesAsPathAndByteArrayFromManifest,
    getAllFilenamesFromFiles,
    db,
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
      displayUriCID,
      displayUri,
      minter,
      creator,
      manifest,
      domainMetadata,
    }: {
      assetCID: string
      manifestCID: string
      domainMetadataCID: string
      displayUriCID: string
      displayUri: string
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
    getFileFromByteArray: (byteArray: Uint8Array, filename: string) => Promise<string>
    getFilesAsPathAndByteArrayFromManifest: (
      byteArray: Uint8Array,
      manifest: Manifest,
    ) => Promise<ManifestExtractedFiles>
    getAllFilenamesFromFiles: (
      extractedFiles: { path: string; type: string; buffer: string }[],
    ) => Promise<ExtractedFile[]>
    db: Database
  }) =>
  async (byteArray: Uint8Array, asset: Asset) => {
    try {
      const { conforms, reports, data } = await getShaclSchemaAndValidate(byteArray)

      const assetCID = await createFilename(byteArray)
      const domainMetadataCID = await createFilename(data.domainMetadata)

      // const license = await getFileFromByteArray(byteArray, LICENSE_FILE)
      // const licenseCID = await createFilename(license as any)

      const connection = await db()
      const user = await connection.getUserById(asset.userId)
      if (!user) {
        throw new Error('User not found')
      }

      const [issuer] = await connection.getUserWithProfileById(user.issuerId)

      if (!issuer) {
        throw new Error('Issuer not found')
      }

      const files = await getFilesAsPathAndByteArrayFromManifest(byteArray, data.manifest)
      const displayUri = find(propEq('visualization', 'type'))(files.publicUser) as ExtractedFile
      const displayUriCID = await createFilename(displayUri?.buffer as any)

      const visualization = filter(propEq('visualization', 'type'))(files.publicUser) as ExtractedFile[]
      console.log('visualizationFiles - before')
      const visualizationFiles = await getAllFilenamesFromFiles(visualization)
      console.log('visualizationFiles', visualizationFiles)

      const modifiedManifest = createModifiedManifest({
        assetCID,
        domainMetadataCID,
      })(data.manifest)

      const modifiedManifestCID = await createFilename(modifiedManifest)

      // metadata temporarily hardcoded
      const tokenMetadata = createTokenMetadata({
        assetCID,
        manifestCID: modifiedManifestCID,
        domainMetadataCID,
        displayUriCID: displayUriCID,
        displayUri: 'https://assets/TestfeldNiedersachsen_ALKS_ODR_sample_01.png',
        minter: extractAddressFromDid(issuer.user.id),
        creator: issuer.profile.name,
        manifest: data.manifest,
        domainMetadata: data.domainMetadata,
      })

      return {
        conforms,
        reports,
        metadata: tokenMetadata,
        modifiedManifest: modifiedManifest,
        assetCID,
        files,
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
  getFilesAsPathAndByteArrayFromManifest,
  getAllFilenamesFromFiles,
  db,
})
