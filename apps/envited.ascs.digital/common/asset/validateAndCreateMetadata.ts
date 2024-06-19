import fs from 'fs'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromByteArray, read } from '../archive'
import { validateShaclDataWithSchema } from '../validator'
import { SCHEMA_MAP } from '../validator/shacl/shacl.constants'
import { Schemas } from '../validator/shacl/shacl.types'

export const getFileFromByteArray = async (byteArray: Uint8Array, filename: string) =>
  extractFromByteArray(byteArray, filename).then(read)

export const createMetadata = ({ name }: { name: string }) => ({
  name,
  symbol: 'ENVITED',
  decimals: 2,
  shouldPreferSymbol: true,
  thumbnailUri: 'THUMBNAIL_URI',
})

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
      const shaclData = JSON.parse(data)
      const type = shaclData['@type'] as Schemas
      const schema = fs.createReadStream(`${__dirname}/schemas/${SCHEMA_MAP[type]}`)

      const report = await validateShaclDataWithSchema(data, schema)

      return {
        data: shaclData,
        report,
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
  }: {
    getShaclSchemaAndValidate: (byteArray: Uint8Array, filename: string) => Promise<any>
    createMetadata: ({ name }: { name: string }) => object
  }) =>
  async (byteArray: Uint8Array, filename: string) => {
    try {
      const { report, data } = await getShaclSchemaAndValidate(byteArray, filename)
      const metadata = createMetadata({ name: data.name[0] as string })

      return {
        report,
        metadata,
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const validateAndCreateMetadata = _validateAndCreateMetadata({
  getShaclSchemaAndValidate,
  createMetadata,
})
