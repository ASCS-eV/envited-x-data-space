/* eslint-disable */
const esModules = [
  '@zazuko',
  '@sec-ant',
  'rdf-validate-shacl',
  '@rdfjs',
  '@tpluscode',
  'clownface',
  'get-stream',
  'readable-stream',
  'is-stream',
  '@vocabulary',
  'rdf-validate-datatype',
  'blockstore-core',
  'ipfs-unixfs-importer',
  'multiformats',
].join('|')

export default {
  displayName: 'envited-x-data-space',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  transformIgnorePatterns: [`/node_modules/(?!(${esModules})/.*)`],
  testPathIgnorePatterns: ['/node_modules/', '\\.integration\\.test\\.ts$'],
}
