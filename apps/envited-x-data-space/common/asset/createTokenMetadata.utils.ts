import { append, equals, path } from 'ramda'

import { TOKEN_TAGS } from '../constants/tokenTags'
import { extractFilenameFromPath, formatAssetUri, formatIpfsUri } from '../utils'
import { Manifest } from './types'
import { formatManifestLinkPath, hasManifestThirdPartyLinks } from './utils'

enum MetadataType {
  environmentModel = 'environment-model:EnvironmentModel',
  envitedX = 'envited-x:SimulationAsset',
  hdmap = 'hdmap:HdMap',
  ositrace = 'ositrace:OSITrace',
  scenario = 'scenario:Scenario',
  surfaceModel = 'surface-model:SurfaceModel',
}

const GENEREAL_TYPE_DATASOURCE = {
  [MetadataType.environmentModel]: 'environment-model:hasDataResource',
  [MetadataType.envitedX]: 'envited-x:hasDataResource',
  [MetadataType.hdmap]: 'hdmap:hasDataResource',
  [MetadataType.ositrace]: 'ositrace:hasDataResource',
  [MetadataType.scenario]: 'scenario:hasDataResource',
  [MetadataType.surfaceModel]: 'surface-model:hasDataResource',
}

const ASSET_FORMAT_TYPE = {
  [MetadataType.environmentModel]: [
    'environment-model:hasDataResourceExtension',
    'environment-model:hasFormat',
    'environment-model:formatType',
  ],
  [MetadataType.envitedX]: ['envited-x:hasDataResourceExtension', 'envited-x:hasFormat', 'envited-x:formatType'],
  [MetadataType.hdmap]: ['hdmap:hasDataResourceExtension', 'hdmap:hasFormat', 'hdmap:formatType'],
  [MetadataType.ositrace]: ['ositrace:hasDataResourceExtension', 'ositrace:hasFormat', 'ositrace:formatType'],
  [MetadataType.scenario]: ['scenario:hasDataResourceExtension', 'scenario:hasFormat', 'scenario:formatType'],
  [MetadataType.surfaceModel]: [
    'surface-model:hasDataResourceExtension',
    'surface-model:hasFormat',
    'surface-model:formatType',
  ],
}

const ASSET_VERSION = {
  [MetadataType.environmentModel]: [
    'environment-model:hasDataResourceExtension',
    'environment-model:hasFormat',
    'environment-model:version',
    '@value',
  ],
  [MetadataType.envitedX]: ['envited-x:hasDataResourceExtension', 'envited-x:hasFormat', 'envited-x:version', '@value'],
  [MetadataType.hdmap]: ['hdmap:hasDataResourceExtension', 'hdmap:hasFormat', 'hdmap:version', '@value'],
  [MetadataType.ositrace]: ['ositrace:hasDataResourceExtension', 'ositrace:hasFormat', 'ositrace:version', '@value'],
  [MetadataType.scenario]: ['scenario:hasDataResourceExtension', 'scenario:hasFormat', 'scenario:version', '@value'],
  [MetadataType.surfaceModel]: [
    'surface-model:hasDataResourceExtension',
    'surface-model:hasFormat',
    'surface-model:version',
    '@value',
  ],
}

export const getNameAndDescriptionFromMetadata = (metadata: any) => {
  const type = metadata['@type'] as MetadataType
  const name = metadata[GENEREAL_TYPE_DATASOURCE[type]]['gx:name']['@value']
  const description = metadata[GENEREAL_TYPE_DATASOURCE[type]]['gx:description']['@value']
  const formatType = path(ASSET_FORMAT_TYPE[type])(metadata)
  const version = path(ASSET_VERSION[type])(metadata)

  return { name, description, formatType, version }
}
