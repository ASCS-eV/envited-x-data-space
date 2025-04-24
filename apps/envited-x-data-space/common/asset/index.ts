import { countAmountOfFilesInZip, extractFromByteArray, read } from '../archive'
import { fileToUint8Array } from '../utils'
import { extractDomainMetadata, extractManifest, extractReadme } from './resources'
import { checkIfAllResourcessInManifestExist, validateAsset as validate } from './validation'

export { getAsset, getMinter, updateAsset } from './asset'
export { insertAssetResource, extractResources, getCoverImage, extractDomainMetadata, extractManifest, extractReadme } from './resources'
export const validateAsset = validate({
  extractManifest,
  extractDomainMetadata,
  extractReadme,
  checkIfAllResourcessInManifestExist: checkIfAllResourcessInManifestExist({ extract: extractFromByteArray, read }),
  countAmountOfFilesInZip,
  fileToUint8Array,
})
