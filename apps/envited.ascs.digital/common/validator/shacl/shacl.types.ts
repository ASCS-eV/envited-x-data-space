export enum ContentTypes {
  ttl = 'text/turtle',
  jsonLd = 'application/ld+json',
}

export enum Schema {
  default = 'default',
  environmentModel = 'environment-model',
  general = 'general',
  georeference = 'georeference',
  gx = 'gx',
  hdmap = 'hdmap',
  manifest = 'manifest',
  ositrace = 'ositrace',
  scenario = 'scenario',
  surfaceModel = 'surface-model',
  sh = 'sh',
  skos = 'skos',
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
