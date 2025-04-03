import { IdentifierMethod } from "../types";

export const SUPPORTED_PATTERNS = {
  [IdentifierMethod.didPkh]: ['method', 'namespace', 'chainId', 'nss'],
  [IdentifierMethod.urnUuid]: ['method', 'nss'],
}
