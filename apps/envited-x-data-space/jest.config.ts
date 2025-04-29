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
  '@zazuko/env-node',
  'duplex-to',
  'stream-chunks',
  'nodeify-fetch',
  'node-fetch',
  'data-uri-to-buffer',
  'fetch-blob',
  'formdata-polyfill',
].join('|')

export default {
  displayName: 'envited-x-data-space',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
    '^.+\\.ttl$': '<rootDir>/../../jest-transform-raw-ttl.js',
  },

  transformIgnorePatterns: [`/node_modules/(?!(${esModules})/.*)`],
  testPathIgnorePatterns: ['/node_modules/', '\\.integration\\.test\\.ts$'],
}
