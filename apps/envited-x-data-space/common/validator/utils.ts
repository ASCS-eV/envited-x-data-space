import { any, filter, groupBy, isEmpty, isNotNil, path, pathEq, pipe, propEq, propOr } from 'ramda'

import { fetchAssetDataByCID, fetchGlobalIdentifierByScopedIdentifier, fetchTokenByScopedIdentifier } from '../api'
import { validateAsset } from '../asset'
import { MANIFEST_LINK_MIME_TYPE } from '../asset/constants'
import { Manifest, ManifestMetadataLink } from '../asset/types'
import { predetermineCID } from '../asset/utils'
import { ERRORS } from '../constants'
import { FEATURE_FLAGS } from '../featureFlags'
import { parseGlobalIdentifier } from '../globalIdentifiers'
import { Environment } from '../types'

export const getReferencedAssets = (manifest: Manifest) =>
  pipe(
    propOr([], 'manifest:hasReferencedArtifacts'),
    filter((x: any) => path(['manifest:iri', '@id'], x) && pathEq('application/zip', MANIFEST_LINK_MIME_TYPE, x)),
  )(manifest)

export const _validateAsset =
  ({
    predetermineCID,
    fetchAssetDataByCID,
    validateAsset,
    fetchTokenByScopedIdentifier,
    fetchGlobalIdentifierByScopedIdentifier,
  }: {
    predetermineCID: (array: Uint8Array) => Promise<string>
    fetchAssetDataByCID: (cid: string) => Promise<any>
    validateAsset: (file: File) => Promise<{
      isValid: boolean
      data: {
        domainMetadata?: Record<string, unknown>
        manifest?: Manifest
      }
      error?: string
    }>
    fetchTokenByScopedIdentifier: (scopedIdentifier: string) => Promise<any>
    fetchGlobalIdentifierByScopedIdentifier: (scopedIdentifier: string) => Promise<any>
  }) =>
  async (file: File) => {
    try {
      if (FEATURE_FLAGS[(process.env.ENV as Environment) || 'development'].uniqueAsset) {
        const arrayBuffer = Buffer.from(await file.arrayBuffer())
        const cid = await predetermineCID(arrayBuffer)
        const asset = await fetchAssetDataByCID(cid)

        if (!isEmpty(asset)) {
          return {
            isValid: false,
            data: {},
            error: ERRORS.ASSET_EXISTS,
          }
        }
      }

      const validation = await validateAsset(file)

      if (!validation.isValid) {
        return validation
      }

      if (FEATURE_FLAGS[(process.env.ENV as Environment) || 'development'].uniqueGlobalIdentifier) {
        const { scopedIdentifier } = parseGlobalIdentifier(validation.data.domainMetadata?.['@id'] as string)
        const token = await fetchTokenByScopedIdentifier(scopedIdentifier)

        if (isNotNil(token)) {
          return {
            isValid: false,
            data: {},
            error: ERRORS.ASSET_ID_EXISTS,
          }
        }

        const parsedManifestGlobalIdentifier = parseGlobalIdentifier(validation.data.manifest?.['@id'] as string)
        const globalIdentifier = await fetchGlobalIdentifierByScopedIdentifier(
          parsedManifestGlobalIdentifier.scopedIdentifier,
        )
        if (isNotNil(globalIdentifier)) {
          return {
            isValid: false,
            data: {},
            error: ERRORS.ASSET_ID_EXISTS,
          }
        }
      }

      const referencedAssets = getReferencedAssets(validation.data.manifest as Manifest)
      const results = await Promise.all(
        referencedAssets.map(async (manifestLink: ManifestMetadataLink) => {
          const { scopedIdentifier } = parseGlobalIdentifier(manifestLink['manifest:iri']['@id'])
          const checkIfReferencedArtifactsExists = await fetchTokenByScopedIdentifier(scopedIdentifier)

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

export const validate = _validateAsset({
  predetermineCID,
  fetchAssetDataByCID,
  fetchTokenByScopedIdentifier,
  fetchGlobalIdentifierByScopedIdentifier,
  validateAsset,
})
