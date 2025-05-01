import { DeleteObjectCommandOutput, GetObjectCommandOutput, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { S3Handler } from 'aws-lambda'
import { isNil, last, pathOr, pipe, propOr, split } from 'ramda'
import { Readable } from 'stream'

import { MANIFEST_LICENSE, MANIFEST_LICENSE_PATH } from '../../../asset/constants'
import {
  AccessLevel,
  AssetResource,
  ExtractedResource,
  ExtractedResourceWithCID,
  Manifest,
  MetadataType,
} from '../../../asset/types'
import { stringifyGlobalIdentifier } from '../../../globalIdentifiers'
import { Asset, AssetMetadata, AssetStatus, GlobalIdentifier, User } from '../../../types'
import { createTzip21Metadata } from '../../../tzip21/metadata'

export const processAssetUpload =
  ({
    readFileFromObjectStorage,
    uploadToObjectStorage,
    deleteFileFromObjectStorage,
    getAsset,
    updateAsset,
    uploadFileToIPFS,
    uploadJsonToIPFS,
    createGroup,
    predetermineCID,
    extractManifest,
    extractDomainMetadata,
    extractResources,
    getCoverImage,
    addCIDs,
    createModifiedManifest,
    extractFileFromArchive,
    getMediaFiles,
    jsonToUint8Array,
    getMinter,
    streamToUint8Array,
    insertAssetResource,
  }: {
    readFileFromObjectStorage: ({ Bucket, Key }: { Bucket: string; Key: string }) => Promise<GetObjectCommandOutput>
    uploadToObjectStorage: (params: PutObjectCommandInput) => Upload
    deleteFileFromObjectStorage: ({
      Bucket,
      Key,
    }: {
      Bucket: string
      Key: string
    }) => Promise<DeleteObjectCommandOutput | undefined>
    getAsset: (cid: string) => Promise<Asset>
    updateAsset: (
      newCid: string,
      oldCid: string,
      status: AssetStatus,
      metadata?: AssetMetadata | string,
      manifest?: Record<string, unknown>,
    ) => Promise<Asset>
    uploadFileToIPFS: ({
      arrayBuffer,
      filename,
      group,
    }: {
      arrayBuffer: ArrayBuffer
      filename: string
      group?: string
    }) => Promise<string>
    uploadJsonToIPFS: ({
      data,
      filename,
      group,
    }: {
      data: Record<string, unknown>
      filename: string
      group?: string
    }) => Promise<string>
    createGroup: (minter: string) => Promise<string>
    predetermineCID: (array: Uint8Array) => Promise<string>
    getMinter: (asset: Asset) => Promise<User>
    streamToUint8Array: (stream: Readable) => Promise<Uint8Array>
    extractManifest: (
      assetArchive: Uint8Array,
    ) => Promise<{ conforms: boolean; data: Manifest; cid: string; fileSize: number }>
    extractDomainMetadata: (
      assetArchive: Uint8Array,
      manifest: Manifest,
    ) => Promise<{ conforms: boolean; data: Record<string, unknown>; cid: string; fileSize: number }>
    extractResources: (manifest: Manifest) => Record<string, unknown>
    extractFileFromArchive: (array: Uint8Array, path: string) => Promise<Readable>
    getCoverImage: (
      assetArchive: Uint8Array,
      media: ExtractedResourceWithCID[],
    ) => Promise<{ cid: string; fileSize: number; uri: string }>
    addCIDs: (assetArchive: Uint8Array, resources: ExtractedResource[]) => Promise<ExtractedResourceWithCID[]>
    createModifiedManifest: ({
      assetCID,
      domainMetadataCID,
      media,
    }: {
      assetCID: string
      domainMetadataCID: string
      media: ExtractedResourceWithCID[]
    }) => (manifest: Manifest) => Record<string, unknown>
    jsonToUint8Array: (data: Record<string, unknown>) => Uint8Array
    extractGeneralInformationFromMetadata: (type: MetadataType) => (metadata: Record<string, unknown>) => {
      name: string
      description: string
      formatType: string
      version: string
    }
    hasRemoteLinks: (manifest: Manifest) => boolean
    getMediaFiles: (items: ExtractedResource[]) => ExtractedResource[]
    insertAssetResource: ({
      assetId,
      name,
      cid,
      mimeType,
      accessLevel,
    }: {
      assetId: string
      name: string
      cid: string
      mimeType: string
      accessLevel: AccessLevel
    }) => Promise<AssetResource>
  }): S3Handler =>
  async event => {
    try {
      // Read uploaded asset
      const s3Record = event.Records[0].s3

      const Key = s3Record.object.key
      const Bucket = s3Record.bucket.name

      const { Body } = await readFileFromObjectStorage({ Key, Bucket })

      if (isNil(Body)) {
        return
      }
      const uploadedFile = await Body.transformToByteArray()
      // Validate uploaded asset
      const asset = await getAsset(Key)
      const assetCID = await predetermineCID(uploadedFile)
      const {
        conforms: manifestConforms,
        data: manifest,
        cid: manifestCID,
        fileSize: manifestFileSize,
      } = await extractManifest(uploadedFile)

      if (!manifestConforms) {
        // Revert if validation fails
        await deleteFileFromObjectStorage({ Bucket, Key })
        await updateAsset(Key, Key, AssetStatus.rejected)

        return
      }
      // Get the domain metadata
      const {
        conforms: domainMetadataConforms,
        data: domainMetadata,
        cid: domainMetadataCID,
        fileSize: domainMetadataFileSize,
      } = await extractDomainMetadata(uploadedFile, manifest)
      // Validate domain metadata
      if (!domainMetadataConforms) {
        // Revert if validation fails
        await deleteFileFromObjectStorage({ Bucket, Key })
        await updateAsset(Key, Key, AssetStatus.rejected)

        return
      }

      // Get the resources from manifest
      const resources = extractResources(manifest)
      const isPublicMedia = pipe(propOr([], 'isPublic'), getMediaFiles)(resources) as ExtractedResource[]
      const isRegisteredMedia = pipe(propOr([], 'isRegistered'), getMediaFiles)(resources) as ExtractedResource[]
      const isOwnerMedia = pipe(propOr([], 'isOwner'), getMediaFiles)(resources) as ExtractedResource[]
      const minter = await getMinter(asset)

      // Upload the resources
      const group = await createGroup(minter?.addressGlobalIdentifier?.scopedIdentifier ?? '')
      if (isPublicMedia) {
        const uploadPublicMediaPromises = isPublicMedia.map(
          async ({ path, mimeType }: { path: string; mimeType: string }) => {
            const fileToUpload = await extractFileFromArchive(uploadedFile, path)
            const fileBuffer = await streamToUint8Array(fileToUpload)
            const cid = await predetermineCID(fileBuffer)
            const upload = uploadToObjectStorage({
              Bucket: process.env.NEXT_PUBLIC_PUBLIC_RESOURCES_BUCKET_NAME,
              Key: `${assetCID}/${cid}`,
              Body: fileBuffer,
              ContentEncoding: 'base64',
              ContentDisposition: 'inline',
            })

            await uploadFileToIPFS({ arrayBuffer: fileBuffer, filename: last(split('/', path)) as string, group })
            await insertAssetResource({
              assetId: asset.id,
              name: last(split('/', path)) as string,
              cid,
              mimeType,
              accessLevel: AccessLevel.public,
            })

            return upload.done()
          },
        )

        await Promise.all(uploadPublicMediaPromises)
      }

      if (isRegisteredMedia) {
        const uploadRegisteredUserMediaPromises = isRegisteredMedia.map(
          async ({ path, mimeType }: { path: string; mimeType: string }) => {
            const fileToUpload = await extractFileFromArchive(uploadedFile, path)
            const fileBuffer = await streamToUint8Array(fileToUpload)
            const cid = await predetermineCID(fileBuffer)
            const upload = uploadToObjectStorage({
              Bucket: process.env.NEXT_PUBLIC_PRIVATE_RESOURCES_BUCKET_NAME,
              Key: `${assetCID}/${cid}`,
              Body: fileBuffer,
              ContentEncoding: 'base64',
            })

            await insertAssetResource({
              assetId: asset.id,
              name: last(split('/', path)) as string,
              cid,
              mimeType,
              accessLevel: AccessLevel.authenticated,
            })

            return upload.done()
          },
        )

        await Promise.all(uploadRegisteredUserMediaPromises)
      }

      if (isOwnerMedia) {
        const uploadOwnerMediaPromises = isOwnerMedia.map(
          async ({ path, mimeType }: { path: string; mimeType: string }) => {
            const fileToUpload = await extractFileFromArchive(uploadedFile, path)
            const fileBuffer = await streamToUint8Array(fileToUpload)
            const cid = await predetermineCID(fileBuffer)
            const upload = uploadToObjectStorage({
              Bucket: process.env.NEXT_PUBLIC_PRIVATE_RESOURCES_BUCKET_NAME,
              Key: `${assetCID}/${cid}`,
              Body: fileBuffer,
              ContentEncoding: 'base64',
            })

            await insertAssetResource({
              assetId: asset.id,
              name: last(split('/', path)) as string,
              cid,
              mimeType,
              accessLevel: AccessLevel.owner,
            })

            return upload.done()
          },
        )

        await Promise.all(uploadOwnerMediaPromises)
      }

      const isPublicMediaWithCids = await addCIDs(uploadedFile, isPublicMedia)
      const modifiedManifest = createModifiedManifest({
        assetCID,
        domainMetadataCID,
        media: isPublicMediaWithCids,
      })(manifest)
      const modifiedManifestCID = await predetermineCID(jsonToUint8Array(modifiedManifest))
      const coverImage = await getCoverImage(uploadedFile, isPublicMediaWithCids)

      const tzip21Metadata = createTzip21Metadata({
        asset: {
          cid: assetCID,
          fileSize: uploadedFile.length,
        },
        creator: minter.name,
        display: coverImage,
        domainMetadata: {
          cid: domainMetadataCID,
          data: domainMetadata,
          fileSize: domainMetadataFileSize,
        },
        manifest: {
          cid: manifestCID,
          fileSize: manifestFileSize,
          data: manifest,
        },
        modifiedManifest: {
          cid: modifiedManifestCID,
          fileSize: modifiedManifest.fileSize as number,
          data: modifiedManifest,
        },
        minter: stringifyGlobalIdentifier(minter.addressGlobalIdentifier as GlobalIdentifier) ?? '',
        rights: {
          identifier: pathOr('', MANIFEST_LICENSE)(manifest),
          path: pathOr('', MANIFEST_LICENSE_PATH)(manifest),
        },
      })

      await uploadJsonToIPFS({
        data: domainMetadata,
        filename: `${assetCID}-domain-metadata.json`,
        group,
      })

      await uploadJsonToIPFS({
        data: modifiedManifest,
        filename: `${assetCID}-manifest.json`,
        group,
      })

      // Update stored asset in DB
      await updateAsset(assetCID, Key, AssetStatus.pending, tzip21Metadata, modifiedManifest)
    } catch (err) {
      console.log(err)
      throw err
    }
  }
