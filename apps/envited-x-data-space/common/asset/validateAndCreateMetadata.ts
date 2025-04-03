import fs from 'fs'
import {
  all,
  and,
  compose,
  equals,
  filter,
  find,
  includes,
  keys,
  omit,
  path,
  pathOr,
  pipe,
  prop,
  propEq,
  propOr,
} from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { db } from '../database/queries'
import { Database } from '../database/types'
import { Asset } from '../types'
import { extractAddressFromDid, formatAssetUri } from '../utils'
import { validateShaclDataWithSchema } from '../validator'
import { CONTEXT_DROP_SCHEMAS, SCHEMA_MAP } from '../validator/shacl/shacl.constants'
import { ValidationSchema } from '../validator/shacl/shacl.types'
import { MANIFEST_FILE, MANIFEST_LICENSE, MANIFEST_LICENSE_PATH } from './constants'
import { createModifiedManifest } from './createModifiedManifest'
import { createTokenMetadata } from './createTokenMetadata'
import { ExtractedFileWithCID, Manifest, ManifestCategoryId, ManifestExtractedFiles } from './types'
import {
  createFilename,
  getAllFilenamesFromFiles,
  getDomainMetadataPath,
  getFileFromByteArray,
  getFilesAsPathAndByteArrayFromManifest,
  jsonToUint8Array,
} from './utils'

export const _getShaclSchemaAndValidate =
  ({
    validateManifest,
    validateDomainMetadata,
  }: {
    validateManifest: (
      byteArray: Uint8Array,
    ) => Promise<{ conforms: boolean; report: ValidationReport | { conforms: boolean }; data: any }>
    validateDomainMetadata: (
      byteArray: Uint8Array,
      manifest: Manifest,
    ) => Promise<{ conforms: boolean; reports: (ValidationReport | { conforms: boolean })[]; data: any }>
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
      | ValidationReport
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
      | ValidationReport
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
    getFilesAsPathAndByteArrayFromManifest,
    getAllFilenamesFromFiles,
    db,
  }: {
    getShaclSchemaAndValidate: (byteArray: Uint8Array) => Promise<
      | {
          conforms: boolean
          reports: (ValidationReport | { conforms: boolean })[]
          data: { manifest?: undefined; domainMetadata?: undefined }
        }
      | { conforms: boolean; data: { manifest: any; domainMetadata: any }; reports: { conforms: boolean }[] }
    >
    createTokenMetadata: ({
      asset,
      creator,
      display,
      domainMetadata,
      manifest,
      minter,
      rights,
    }: {
      asset: {
        cid: string
        fileSize: number
      }
      creator: string
      display: {
        cid: string
        fileSize: number
        uri: string
      }
      domainMetadata: {
        cid: string
        data: any
      }
      manifest: {
        cid: string
        data: Manifest
        fileSize: number
        modifiedData: Manifest
      }
      minter: string
      rights: { identifier: string; path: string }
    }) => any
    createModifiedManifest: ({
      assetCID,
      domainMetadataCID,
      visualizationFiles,
    }: {
      assetCID: string
      domainMetadataCID: string
      visualizationFiles: ExtractedFileWithCID[]
    }) => (manifest: any) => any
    createFilename: (byteArray: Uint8Array, type?: string, filename?: string) => Promise<string>
    getFilesAsPathAndByteArrayFromManifest: (
      byteArray: Uint8Array,
      manifest: Manifest,
    ) => Promise<ManifestExtractedFiles>
    getAllFilenamesFromFiles: (
      extractedFiles: { path: string; category: ManifestCategoryId; arrayBuffer: ArrayBuffer }[],
    ) => Promise<ExtractedFileWithCID[]>
    db: Database
  }) =>
  async (byteArray: Uint8Array, asset: Asset) => {
    try {
      const { conforms, reports, data } = await getShaclSchemaAndValidate(byteArray)
      const assetCID = await createFilename(byteArray)
      const domainMetadataCID = await createFilename(jsonToUint8Array(data.domainMetadata))
      const connection = await db()
      const user = await connection.getUserById(asset.userId)

      if (!user) {
        throw new Error('User not found')
      }

      const issuer = await connection.getUserByIssuerId(user.issuerId)

      if (!issuer) {
        throw new Error('Issuer not found')
      }

      const files = await getFilesAsPathAndByteArrayFromManifest(byteArray, data.manifest)
      const visualization = filter(propEq('envited-x:isMedia', 'category'))(files.publicUser)
      const visualizationFiles = await getAllFilenamesFromFiles(visualization)

      const modifiedManifest = createModifiedManifest({
        assetCID,
        domainMetadataCID,
        visualizationFiles,
      })(data.manifest)
      const modifiedManifestBuffer = Buffer.from(JSON.stringify(modifiedManifest))
      const modifiedManifestCID = await createFilename(jsonToUint8Array(modifiedManifest))

      const assetObject = {
        cid: assetCID,
        fileSize: byteArray.length,
      }

      const displayUri = find(
        and(propEq(ManifestCategoryId.envitedXIsMedia, 'category'), compose(includes('image'), propOr('', 'mimeType'))),
      )(visualizationFiles) as ExtractedFileWithCID
      const displayObject = {
        cid: displayUri.cid,
        fileSize: displayUri.arrayBuffer.byteLength,
        uri: `${formatAssetUri(assetCID)}/${displayUri.path}`,
        // add image dimensions
      }

      const manifestObject = {
        cid: modifiedManifestCID,
        fileSize: modifiedManifestBuffer.length,
        data: data.manifest,
        modifiedData: modifiedManifest,
      }

      const domainMetadataObject = {
        cid: domainMetadataCID,
        data: data.domainMetadata,
      }

      const rightsObject = {
        identifier: pathOr('', MANIFEST_LICENSE)(data.manifest),
        path: pathOr('', MANIFEST_LICENSE_PATH)(data.manifest),
      }

      const minterGuid = await connection.getGlobalIdentifierById(issuer.addressGlobalIdentifierId)

      if (!minterGuid) {
        throw new Error('Minter not found')
      }

      const tokenMetadata = createTokenMetadata({
        asset: assetObject,
        creator: issuer.name,
        display: displayObject,
        domainMetadata: domainMetadataObject,
        manifest: manifestObject,
        minter: minterGuid.nss,
        rights: rightsObject,
      })

      return {
        conforms,
        reports,
        metadata: tokenMetadata,
        modifiedManifest: modifiedManifest,
        assetCID,
        files,
        visualizationFiles,
        domainMetadata: data.domainMetadata,
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
  getFilesAsPathAndByteArrayFromManifest,
  getAllFilenamesFromFiles,
  db,
})
