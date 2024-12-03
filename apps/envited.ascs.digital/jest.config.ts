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
  'multiformats',
].join('|')

export default {
  displayName: 'envited.ascs.digital',
  preset: '../../jest.preset.js',
  transform: {
    [`(${esModules}).+\\.js$`]: ['babel-jest', { presets: ['@babel/preset-env'] }],
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  transformIgnorePatterns: [`/node_modules/(?!(${esModules})/.*)`],
  moduleNameMapper: {
    '^multiformats/(.*)$': '<rootDir>/../../node_modules/multiformats/dist/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/envited.ascs.digital',
}
