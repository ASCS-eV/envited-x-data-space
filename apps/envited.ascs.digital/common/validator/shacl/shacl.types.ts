export enum ContentTypes {
  ttl = 'text/turtle',
  jsonLd = 'application/ld+json',
}

export enum Schemas {
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
  | Schemas.environmentModel
  | Schemas.general
  | Schemas.georeference
  | Schemas.gx
  | Schemas.hdmap
  | Schemas.manifest
  | Schemas.ositrace
  | Schemas.scenario
