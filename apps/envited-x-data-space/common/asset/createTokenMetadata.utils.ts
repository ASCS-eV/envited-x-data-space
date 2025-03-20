import { applySpec, path } from 'ramda'

export const extractGeneralInformationFromMetadata = (type: string) =>
  applySpec({
    name: path([`${type}:hasDataResource`, 'gx:name', '@value']),
    description: path([`${type}:hasDataResource`, 'gx:description', '@value']),
    formatType: path([`${type}:hasDataResourceExtension`, `${type}:hasFormat`, `${type}:formatType`]),
    version: path([`${type}:hasDataResourceExtension`, `${type}:hasFormat`, `${type}:version`, '@value']),
  })
