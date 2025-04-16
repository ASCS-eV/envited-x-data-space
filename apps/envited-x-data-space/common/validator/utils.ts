import { filter, groupBy, isEmpty, isNotNil, path, pathEq, pipe, prop, propOr } from 'ramda'

import { fetchAssetDataByCID, fetchGlobalIdentifierByScopedIdentifier } from '../api'
import { MANIFEST_LINK_MIME_TYPE } from '../asset/constants'
import { Manifest, ManifestMetadataLink } from '../asset/types'
import { createFilename } from '../asset/utils'
import { ERRORS } from '../constants'
import { FEATURE_FLAGS } from '../featureFlags'
import { parseGlobalIdentifier } from '../globalIdentifiers'
import { Environment } from '../types'
import { validateShaclFile } from './shacl'

export const getReferencedAssets = (manifest: Manifest) =>
  pipe(
    propOr([], 'manifest:hasReferencedArtifacts'),
    filter((x: any) => path(['manifest:iri', '@id'], x) && pathEq('application/zip', MANIFEST_LINK_MIME_TYPE, x)),
  )(manifest)

export const _validateAsset =
  ({
    createFilename,
    fetchAssetDataByCID,
    fetchGlobalIdentifierByScopedIdentifier,
    validateShaclFile,
  }: {
    createFilename: (byteArray: Uint8Array) => Promise<any>
    fetchAssetDataByCID: (cid: string) => Promise<any>
    fetchGlobalIdentifierByScopedIdentifier: (scopedIdentifier: string) => Promise<any>
    validateShaclFile: (file: File) => Promise<
      | {
          isValid: boolean
          data: {
            manifest?: undefined
            domainMetadata?: undefined
          }
          error: string
        }
      | {
          isValid: boolean
          data: {
            manifest: any
            domainMetadata: any
          }
          error?: undefined
        }
    >
  }) =>
  async (file: File) => {
    try {
      if (FEATURE_FLAGS[(process.env.ENV as Environment) || 'development'].uniqueAsset) {
        const arrayBuffer = Buffer.from(await file.arrayBuffer())
        const cid = await createFilename(arrayBuffer)
        const asset = await fetchAssetDataByCID(cid)

        if (!isEmpty(asset)) {
          return {
            isValid: false,
            data: {},
            error: ERRORS.ASSET_EXISTS,
          }
        }
      }

      const validation = await validateShaclFile(file)

      if (!validation.isValid) {
        return validation
      }

      if (FEATURE_FLAGS[(process.env.ENV as Environment) || 'development'].uniqueGlobalIdentifier) {
        const { scopedIdentifier } = parseGlobalIdentifier(validation.data.domainMetadata['@id'])
        const globalIdentifier = await fetchGlobalIdentifierByScopedIdentifier(scopedIdentifier)

        if (isNotNil(globalIdentifier)) {
          return {
            isValid: false,
            data: {},
            error: ERRORS.ASSET_ID_EXISTS,
          }
        }
      }

      const referencedAssets = getReferencedAssets(validation.data.manifest)
      const results = await Promise.all(
        referencedAssets.map(async (manifestLink: ManifestMetadataLink) => {
          const { scopedIdentifier } = parseGlobalIdentifier(manifestLink['manifest:iri']['@id'])
          const checkIfReferencedArtifactsExists = await fetchGlobalIdentifierByScopedIdentifier(scopedIdentifier)

          return {
            id: manifestLink['manifest:iri']['@id'],
            exists: isNotNil(checkIfReferencedArtifactsExists),
          }
        }),
      )

      return {
        ...validation,
        data: {
          ...validation.data,
          referencedAssets: groupBy(asset => String(asset.exists), results),
        },
      }
    } catch (error) {
      console.log(error)
      return { isValid: false, data: {}, error: ERRORS.ASSET_FILE_NOT_FOUND }
    }
  }

export const validateAsset = _validateAsset({
  createFilename,
  fetchAssetDataByCID,
  fetchGlobalIdentifierByScopedIdentifier,
  validateShaclFile,
})
