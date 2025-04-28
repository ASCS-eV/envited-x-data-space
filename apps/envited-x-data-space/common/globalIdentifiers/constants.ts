import { IdentifierMethod } from '../types'

export const SUPPORTED_PATTERNS = {
  [IdentifierMethod.didPkh]: ['method', 'namespace', 'chainId', 'scopedIdentifier'],
  [IdentifierMethod.didWeb]: ['method', 'fqdn', 'scopedIdentifier'],
  [IdentifierMethod.urnUuid]: ['method', 'scopedIdentifier'],
  [IdentifierMethod.urnContract]: ['method', 'namespace', 'chainId', 'scopedIdentifier'],
  [IdentifierMethod.urnOperation]: ['method', 'namespace', 'chainId', 'scopedIdentifier'],
}
