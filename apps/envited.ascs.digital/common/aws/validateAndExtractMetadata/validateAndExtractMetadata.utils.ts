import { Schemas } from '../../validator/shacl/shacl.types'

export const SCHEMA_MAP = {
  [Schemas.default]: './schemas/shaclSchema.ttl',
  [Schemas.person]: './schemas/shaclSchema.ttl',
}
