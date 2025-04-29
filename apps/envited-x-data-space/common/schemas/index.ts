import { Schema } from './shacl.types'
import automotiveSimulator from './shacl/automotive-simulator_shacl.ttl'
import environmentModel from './shacl/environment-model_shacl.ttl'
import envitedX from './shacl/envited-x_shacl.ttl'
import general from './shacl/general_shacl.ttl'
import georeference from './shacl/georeference_shacl.ttl'
import gx from './shacl/gx_shacl.ttl'
import hdmap from './shacl/hdmap_shacl.ttl'
import leakageTest from './shacl/leakage-test_shacl.ttl'
import manifest from './shacl/manifest_shacl.ttl'
import ositrace from './shacl/ositrace_shacl.ttl'
import scenario from './shacl/scenario_shacl.ttl'
import service from './shacl/service_shacl.ttl'
import simulatedSensor from './shacl/simulated-sensor_shacl.ttl'
import simulationModel from './shacl/simulation-model_shacl.ttl'
import surfaceModel from './shacl/surface-model_shacl.ttl'
import survey from './shacl/survey_ontology.ttl'
import vvReport from './shacl/vv-report_shacl.ttl'

export const SCHEMA = {
  [Schema.automotiveSimulator]: automotiveSimulator,
  [Schema.environmentModel]: environmentModel,
  [Schema.envitedX]: envitedX,
  [Schema.general]: general,
  [Schema.georeference]: georeference,
  [Schema.gx]: gx,
  [Schema.hdmap]: hdmap,
  [Schema.leakageTest]: leakageTest,
  [Schema.manifest]: manifest,
  [Schema.ositrace]: ositrace,
  [Schema.scenario]: scenario,
  [Schema.service]: service,
  [Schema.simulatedSensor]: simulatedSensor,
  [Schema.simulationModel]: simulationModel,
  [Schema.surfaceModel]: surfaceModel,
  [Schema.survey]: survey,
  [Schema.vvReport]: vvReport,
}

export { IGNORED_SCHEMAS } from './schemas.constants'
