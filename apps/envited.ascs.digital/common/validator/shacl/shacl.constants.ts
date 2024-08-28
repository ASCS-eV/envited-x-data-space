import { Schemas } from './shacl.types'

export const SCHEMA_MAP = {
  [Schemas.default]: '/shaclSchema.ttl',
  [Schemas.environmentModel]: '/schemas/environment_shacl.ttl',
  [Schemas.general]: '/schemas/general_shacl.ttl',
  [Schemas.georeference]: '/schemas/georeference_shacl.ttl',
  [Schemas.gx]: '/schemas/gx_shacl.ttl',
  [Schemas.hdmap]: '/schemas/hdmap_shacl.ttl',
  [Schemas.manifest]: '/schemas/manifest_shacl.ttl',
  [Schemas.ositrace]: '/schemas/ositrace_shacl.ttl',
  [Schemas.scenario]: '/schemas/scenario_shacl.ttl',
  [Schemas.surfaceModel]: '/schemas/surface-model_shacl.ttl',
}

export const CONTEXT_DROP_SCHEMAS = ['sh', 'skos', 'xsd']
