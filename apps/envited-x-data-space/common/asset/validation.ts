import { Entry } from '@zip.js/zip.js'
import { equals, has, isEmpty, isNil } from 'ramda'

import { ERRORS } from '../constants'
import { Manifest } from './types'
import { formatFilesErrorMessage, getAllManifestLinksAndFormatPaths } from './utils'

export const validateAsset =
  ({
    extractManifest,
    extractDomainMetadata,
    checkIfAllResourcessInManifestExist,
    countAmountOfFilesInZip,
    extractReadme,
    fileToUint8Array,
  }: {
    extractManifest: (assetArchive: Uint8Array) => Promise<{ conforms: boolean; data: Manifest }>
    extractDomainMetadata: (
      assetArchive: Uint8Array,
      manifest: Manifest,
    ) => Promise<{ conforms: boolean; data: Record<string, unknown>; cid: string }>
    extractReadme: (assetArchive: Uint8Array) => Promise<string | null>
    checkIfAllResourcessInManifestExist: (
      assetArchive: Uint8Array,
      manifest: Manifest,
    ) => Promise<{ errors: { error: string }[]; amount: number }>
    countAmountOfFilesInZip: (assetArchive: Uint8Array) => Promise<number>
    fileToUint8Array: (file: File) => Promise<Uint8Array>
  }) =>
  async (file: File) => {
    try {
      const uploadedAsset = await fileToUint8Array(file)

      const readme = await extractReadme(uploadedAsset)
      if (isNil(readme)) {
        return {
          isValid: false,
          data: {},
          error: ERRORS.README_FILE_NOT_FOUND,
        }
      }

      const { conforms: manifestConforms, data: manifest } = await extractManifest(uploadedAsset)
      const manifestFiles = await checkIfAllResourcessInManifestExist(uploadedAsset, manifest)

      if (!isEmpty(manifestFiles.errors)) {
        return {
          isValid: false,
          data: {},
          error: formatFilesErrorMessage(manifestFiles.errors),
        }
      }

      const amountOfFilesInZip = await countAmountOfFilesInZip(uploadedAsset)

      if (!equals(amountOfFilesInZip)(manifestFiles.amount)) {
        return {
          isValid: false,
          data: {},
          error: `${amountOfFilesInZip} files found, should be ${manifestFiles.amount} files`,
        }
      }

      const { conforms: domainMetadataConforms, data: domainMetadata } = await extractDomainMetadata(
        uploadedAsset,
        manifest,
      )

      if (!manifestConforms) {
        return { isValid: false, data: {}, error: ERRORS.MANIFEST_INVALID }
      }

      if (!domainMetadataConforms) {
        return { isValid: false, data: {}, error: ERRORS.DOMAIN_METADATA_INVALID }
      }

      return { isValid: true, data: { manifest, domainMetadata } }
    } catch (error) {
      return { isValid: false, data: {}, error: error instanceof Error ? error.message : String(error) }
    }
  }

export const checkIfAllResourcessInManifestExist =
  ({
    extract,
    read,
  }: {
    extract: (archive: Uint8Array, fileName: string) => Promise<Entry>
    read: (entry: Entry) => Promise<string>
  }) =>
  async (archive: Uint8Array, manifest: Manifest) => {
    try {
      const links = getAllManifestLinksAndFormatPaths(manifest)
      const validationPromises = links.map((fileName: string) => ({
        fileName,
        promise: extract(archive, fileName)?.then(read),
      }))

      const wrappedPromises = validationPromises.map(({ fileName, promise }) =>
        promise?.catch(() => ({ error: fileName })),
      )

      const errors = await Promise.all(wrappedPromises).then(
        (results: (string | { error: string })[]) =>
          results.filter((result: string | { error: string }) => has('error')(result) && result.error) as {
            error: string
          }[],
      )

      return {
        errors,
        amount: links.length,
      }
    } catch (error) {
      console.log(error)
      return {
        errors: [],
        amount: 0,
      }
    }
  }
