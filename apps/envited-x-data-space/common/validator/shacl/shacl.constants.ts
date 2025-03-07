import { Schema } from './shacl.types'

export const SCHEMA_MAP = {
  [Schema.automotiveSimulator]: '/schemas/automotive-simulator_shacl.ttl',
  [Schema.environmentModel]: '/schemas/environment_shacl.ttl',
  [Schema.general]: '/schemas/general_shacl.ttl',
  [Schema.georeference]: '/schemas/georeference_shacl.ttl',
  [Schema.gx]: '/schemas/gx_shacl.ttl',
  [Schema.hdmap]: '/schemas/hdmap_shacl.ttl',
  [Schema.leakageTest]: '/schemas/leaking-test_shacl.ttl',
  [Schema.manifest]: '/schemas/manifest_shacl.ttl',
  [Schema.marketplaceInfo]: '/schemas/marketplace-info_shacl.ttl',
  [Schema.ositrace]: '/schemas/ositrace_shacl.ttl',
  [Schema.scenario]: '/schemas/scenario_shacl.ttl',
  [Schema.surfaceModel]: '/schemas/surface-model_shacl.ttl',
  [Schema.service]: '/schemas/service_shacl.ttl',
  [Schema.simulatedModel]: '/schemas/simulated-model_shacl.ttl',
  [Schema.simulatedSensor]: '/schemas/simulated-sensor_shacl.ttl',
  // [Schema.surveyResultDataOferring]: '/schemas/survey-result-data-offering_shacl.ttl',
  // [Schema.surveyServiceOferring]: '/schemas/survery-service-offering_shacl.ttl',
  [Schema.vvReport]: '/schemas/vv-report_shacl.ttl',
}

export const CONTEXT_DROP_SCHEMAS = [Schema.sh, Schema.skos, Schema.xsd]

export const AMOUNT_OF_UNDEFINED_FILES_IN_MANIFEST = 2
