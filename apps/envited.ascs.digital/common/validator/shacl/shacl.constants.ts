import { Schema } from './shacl.types'

export const SCHEMA_MAP = {
  [Schema.default]: '/shaclSchema.ttl',
  [Schema.environmentModel]: '/schemas/environment_shacl.ttl',
  [Schema.general]: '/schemas/general_shacl.ttl',
  [Schema.georeference]: '/schemas/georeference_shacl.ttl',
  [Schema.gx]: '/schemas/gx_shacl.ttl',
  [Schema.hdmap]: '/schemas/hdmap_shacl.ttl',
  [Schema.manifest]: '/schemas/manifest_shacl.ttl',
  [Schema.ositrace]: '/schemas/ositrace_shacl.ttl',
  [Schema.scenario]: '/schemas/scenario_shacl.ttl',
  [Schema.surfaceModel]: '/schemas/surface-model_shacl.ttl',
}

export const CONTEXT_DROP_SCHEMAS = [Schema.sh, Schema.skos, Schema.xsd]
