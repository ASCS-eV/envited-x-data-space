import { countAmountOfFilesInZip, extractFromByteArray, read } from '../archive'
import { fileToUint8Array } from '../utils'
import { extractDomainMetadata, extractManifest, extractReadme } from './resources'
import { checkIfAllResourcesInManifestExist, validateAsset as validate } from './validation'

export { getAsset, getMinter, updateAsset } from './asset'
export const validateAsset = validate({
  extractManifest,
  extractDomainMetadata,
  extractReadme,
  checkIfAllResourcesInManifestExist: checkIfAllResourcesInManifestExist({ extract: extractFromByteArray, read }),
  countAmountOfFilesInZip,
  fileToUint8Array,
})
