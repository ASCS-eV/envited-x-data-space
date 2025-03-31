export enum ContentType {
  ttl = 'text/turtle',
  jsonLd = 'application/ld+json',
}

export enum Schema {
  automotiveSimulator = 'automotive-simulater',
  environmentModel = 'environment-model',
  envitedX = 'envited-x',
  general = 'general',
  georeference = 'georeference',
  gx = 'gx',
  hdmap = 'hdmap',
  leakageTest = 'leakage-test',
  manifest = 'manifest',
  openlabel = 'openlabel',
  ositrace = 'ositrace',
  rdf = 'rdf',
  scenario = 'scenario',
  service = 'service',
  sh = 'sh',
  simulatedSensor = 'simulated-sensor',
  simulationModel = 'simulation-model',
  skos = 'skos',
  surfaceModel = 'surface-model',
  survey = 'survey',
  vvReport = 'vv-report',
  xsd = 'xsd',
}

export type ValidationSchema =
  | Schema.environmentModel
  | Schema.envitedX
  | Schema.general
  | Schema.georeference
  | Schema.gx
  | Schema.hdmap
  | Schema.manifest
  | Schema.ositrace
  | Schema.scenario
  | Schema.automotiveSimulator
  | Schema.leakageTest
  | Schema.service
  | Schema.simulationModel
  | Schema.simulatedSensor
  | Schema.surfaceModel
  | Schema.survey
  | Schema.vvReport
