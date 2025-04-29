import { getAsset, getMinter, updateAsset } from '../../../asset'
<<<<<<< HEAD
import {
  extractDomainMetadata,
  extractManifest,
  extractResources,
  getCoverImage,
  insertAssetResource,
} from '../../../asset'
import { createModifiedManifest } from '../../../asset/manifest'
=======
import { createModifiedManifest } from '../../../asset/manifest'
import { extractDomainMetadata, extractManifest, extractResources, getCoverImage } from '../../../asset/resources'
>>>>>>> develop
import {
  addCIDs,
  extractFileFromArchive,
  extractGeneralInformationFromMetadata,
  getMediaFiles,
  hasRemoteLinks,
  jsonToUint8Array,
  predetermineCID,
} from '../../../asset/utils'
import { deleteFileFromObjectStorage, readFileFromObjectStorage, uploadToObjectStorage } from '../../../aws'
import { createGroup, uploadFileToIPFS, uploadJsonToIPFS } from '../../../ipfs'
import { streamToUint8Array } from '../../../utils'
import { processAssetUpload } from './processAssetUpload'

export const main = processAssetUpload({
  readFileFromObjectStorage,
  uploadToObjectStorage,
  deleteFileFromObjectStorage,
  getAsset,
  updateAsset,
  uploadFileToIPFS,
  uploadJsonToIPFS,
  createGroup,
  predetermineCID,
  getMinter,
  streamToUint8Array,
  extractDomainMetadata,
  extractResources,
  extractFileFromArchive,
  getCoverImage,
  addCIDs,
  createModifiedManifest,
  jsonToUint8Array,
  extractGeneralInformationFromMetadata,
  hasRemoteLinks,
  extractManifest,
  getMediaFiles,
  insertAssetResource,
})
