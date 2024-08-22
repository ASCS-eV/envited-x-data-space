import { getChallenge } from './challenge'
import { getClientMetadata } from './clientMetadata'
import { getConsent } from './consent'
import { getPresentCredential, postPresentCredential } from './presentCredential'
import { postVerifyUser } from './verifyUser'

export const handlers = {
  getClientMetadata,
  getChallenge,
  getConsent,
  getPresentCredential,
  postPresentCredential,
  postVerifyUser,
}
