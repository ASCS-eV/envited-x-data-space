import { filter, groupBy, isEmpty, isNotNil, path, pathEq, pipe, propOr } from 'ramda'

import { fetchAssetDataByCID, fetchGlobalIdentifierByFullResourceName, fetchTokenByFullResourceName } from '../api'
import { validateAsset } from '../asset'
import { MANIFEST_LINK_MIME_TYPE } from '../asset/constants'
import { Manifest, ManifestMetadataLink } from '../asset/types'
import { predetermineCID } from '../asset/utils'
import { ERRORS } from '../constants'
import { FEATURE_FLAGS } from '../featureFlags'
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
    fetchTokenByFullResourceName,
    fetchGlobalIdentifierByFullResourceName,
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
    fetchTokenByFullResourceName: (fullResourceName: string) => Promise<any>
    fetchGlobalIdentifierByFullResourceName: (fullResourceName: string) => Promise<any>
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
        const token = await fetchTokenByFullResourceName(validation.data.domainMetadata?.['@id'] as string)

        if (isNotNil(token)) {
          return {
            isValid: false,
            data: {},
            error: ERRORS.ASSET_ID_EXISTS,
          }
        }

        const globalIdentifier = await fetchGlobalIdentifierByFullResourceName(
          validation.data.manifest?.['@id'] as string,
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
          const checkIfReferencedArtifactsExists = await fetchGlobalIdentifierByFullResourceName(
            manifestLink['manifest:iri']['@id'],
          )

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
  fetchTokenByFullResourceName,
  fetchGlobalIdentifierByFullResourceName,
  validateAsset,
})
