import { countAmountOfFilesInZip, extractFromByteArray, read} from '../archive'
import { fileToUint8Array } from '../utils'
import { extractManifest, extractDomainMetadata, extractReadme,  } from './resources'
import { validateAsset as validate, checkIfAllResourcessInManifestExist } from './validation'

export { getAsset, getMinter, updateAsset } from './asset'
export const validateAsset = validate({
  extractManifest,
  extractDomainMetadata,
  extractReadme,
  checkIfAllResourcessInManifestExist: checkIfAllResourcessInManifestExist({ extract: extractFromByteArray, read }),
  countAmountOfFilesInZip,
  fileToUint8Array,
})
