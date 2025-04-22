import rdf from '@zazuko/env-node'
import SHACLValidator from 'rdf-validate-shacl'

import { validateShacl as _validateShacl } from './shacl'

export const validateShacl = _validateShacl({ rdf, SHACLValidator })
