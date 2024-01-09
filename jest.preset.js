const nxPreset = require('@nx/jest/preset').default

module.exports = {
  ...nxPreset,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
