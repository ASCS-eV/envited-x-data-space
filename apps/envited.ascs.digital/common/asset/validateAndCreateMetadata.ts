import fs from 'fs'
import { all, equals, keys, omit, pipe, prop } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromByteArray, read } from '../archive'
import { db } from '../database/queries'
import { Database } from '../database/types'
import { Asset } from '../types'
import { extractAddressFromDid } from '../utils'
import { validateShaclDataWithSchema } from '../validator'
import { CONTEXT_DROP_SCHEMAS, SCHEMA_MAP } from '../validator/shacl/shacl.constants'
import { ValidationSchema } from '../validator/shacl/shacl.types'
import { DOMAIN_METADATA_FILE, MANIFEST_FILE } from './constants'
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
      licenseCID,
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
      licenseCID: string
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
    getFileFromByteArray: (byteArray: Uint8Array, filename: string) => any
    db: Database
  }) =>
  async (byteArray: Uint8Array, asset: Asset) => {
    try {
      const { conforms, reports, data } = await getShaclSchemaAndValidate(byteArray)

      const assetCID = await createFilename(byteArray)
      const domainMetadataCID = await createFilename(data.domainMetadata)

      const modifiedManifest = createModifiedManifest({
        assetCID,
        domainMetadataCID,
      })(data.manifest)

      // const modifiedManifestCID = await createFilename(modifiedManifest)

      // const license = await getFileFromByteArray(byteArray, LICENSE_FILE)
      // const licenseCID = await createFilename(license as any)

      // const firstMediaElement = find(propEq('visualization', 'manifest:type'))(
      //   data.manifest['manifest:data']['manifest:contentData'],
      // ) as any
      // const displayUriPath = firstMediaElement['manifest:relativePath']['@value']
      // const displayUri = await getFileFromByteArray(byteArray, replace('./', '')(displayUriPath))
      // const displayUriCID = await createFilename(displayUri as any)

      const connection = await db()
      const user = await connection.getUserById(asset.userId)
      console.log(user)
      if (!user) {
        throw new Error('User not found')
      }

      const [issuer] = await connection.getUserWithProfileById(user.issuerId)
      console.log(issuer)
      if (!issuer) {
        throw new Error('Issuer not found')
      }

      // metadata temporarily hardcoded
      const tokenMetadata = createTokenMetadata({
        assetCID: 'QmSWVmNaFQEDaf36oqjEvzSV7EfFbkAFMoopsSQV6gSCSS',
        manifestCID: 'QmRteS2bP2jCcA8MVL4kdLGV5yzNPS85uNazWxWEY9Goff',
        domainMetadataCID: 'QmU7TvL9afnY87ceyfX9vVPcKM4mNS1bpNN1CUQNjxZjvB',
        licenseCID: 'QmPt3UiJj4br8Zv6Jkb6kzdie36jtJM6wBvpFF1nA2ZU4L',
        displayUriCID: 'QmPg2xq9HAH45tF9EhLfGpYvtjhRL1LnB2jrHx7WUxKDzg',
        displayUri: 'https://assets/TestfeldNiedersachsen_ALKS_ODR_sample_01.png',
        minter: extractAddressFromDid(issuer.user.id),
        creator: issuer.profile.name,
        manifest: data.manifest,
        domainMetadata: data.domainMetadata,
      })

      const tokenMetadataCID = await createFilename(tokenMetadata)

      return {
        conforms,
        reports,
        metadata: tokenMetadata,
        manifest: modifiedManifest,
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
  db,
})
