/* eslint-disable */
const esModules = [
  '@zazuko',
  'rdf-validate-shacl',
  '@rdfjs',
  '@tpluscode',
  'clownface',
  'get-stream',
  '@vocabulary',
  'rdf-validate-datatype',
  'blockstore-core',
  'ipfs-unixfs-importer',
  'multiformats',
].join('|')

export default {
  displayName: 'envited-x-data-space',
  preset: '../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  transformIgnorePatterns: [`/node_modules/(?!(${esModules})/.*)`],
  moduleNameMapper: {
    '^multiformats/(.*)$': '<rootDir>/../node_modules/multiformats/dist/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../coverage/envited-x-data-space',
}
