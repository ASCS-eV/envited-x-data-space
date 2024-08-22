import fs from 'fs'
import { all, equals, find, head, keys, omit, pipe, prop, propEq } from 'ramda'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromByteArray, read } from '../archive'
import { AssetMetadata } from '../types'
import { validateShaclDataWithSchema } from '../validator'
import { SCHEMA_MAP } from '../validator/shacl/shacl.constants'
import { Schemas } from '../validator/shacl/shacl.types'
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
  async (byteArray: Uint8Array, filename: string) => {
    try {
      const data = await getFileFromByteArray(byteArray, filename)
      const json = JSON.parse(data)
      const schemaTypes = pipe(omit(['sh', 'skos', 'xsd']), keys)(json['@context']) as Schemas[]

      const validationPromises = schemaTypes.map(type => {
        const schema = fs.createReadStream(`${__dirname}/schemas/${SCHEMA_MAP[type]}`)
        return validateShaclDataWithSchema(data, schema)
      })
      const validationResults = await Promise.all(validationPromises)

      if (!all(x => equals(true)(prop('conforms')(x)), validationResults)) {
        return {
          data: json,
          report: find(propEq(false, 'conforms'))(validationResults),
        }
      }

      return {
        data: json,
        report: head(validationResults),
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const getShaclSchemaAndValidate = _getShaclSchemaAndValidate({
  getFileFromByteArray,
  validateShaclDataWithSchema,
  fs,
})

export const _validateAndCreateMetadata =
  ({
    getShaclSchemaAndValidate,
    createMetadata,
    createFilename,
  }: {
    getShaclSchemaAndValidate: (byteArray: Uint8Array, filename: string) => Promise<any>
    createMetadata: ({ name }: { name: string }) => AssetMetadata
    createFilename: (byteArray: Uint8Array) => Promise<string>
  }) =>
  async (byteArray: Uint8Array, filename: string) => {
    try {
      const { report, data } = await getShaclSchemaAndValidate(byteArray, filename)
      const metadata = createMetadata({ name: data.name[0] as string })

      const assetCID = await createFilename(byteArray)
      const metadataCID = await createFilename(metadata as any)

      return {
        report,
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
