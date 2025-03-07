export enum ContentType {
  ttl = 'text/turtle',
  jsonLd = 'application/ld+json',
}

export enum Schema {
  automotiveSimulator = 'automotive-simulater',
  environmentModel = 'environment-model',
  general = 'general',
  georeference = 'georeference',
  gx = 'gx',
  hdmap = 'hdmap',
  leakageTest = 'leakage-test',
  manifest = 'manifest',
  marketplaceInfo = 'marketplaceInfo',
  ositrace = 'ositrace',
  scenario = 'scenario',
  surfaceModel = 'surface-model',
  service = 'service',
  sh = 'sh',
  simulatedModel = 'simulated-model',
  simulatedSensor = 'simulated-sensor',
  skos = 'skos',
  // survey = 'survey',
  // surveyResultDataOferring = 'survey-result-data-offering',
  // surveyServiceOferring = 'survey-service-offering',
  vvReport = 'vv-report',
  xsd = 'xsd',
}

export type ValidationSchema =
  | Schema.environmentModel
  | Schema.general
  | Schema.georeference
  | Schema.gx
  | Schema.hdmap
  | Schema.manifest
  | Schema.ositrace
  | Schema.scenario
  | Schema.marketplaceInfo
  | Schema.automotiveSimulator
  | Schema.leakageTest
  | Schema.service
  | Schema.simulatedModel
  | Schema.simulatedSensor
  // | Schema.surveyResultDataOferring
  // | Schema.surveyServiceOferring
  | Schema.vvReport
