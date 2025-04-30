import fs from 'fs'
import path from 'path'

import { extractDomainMetadata, extractManifest } from './resources'

const readFixtureAsUint8Array = (filename: string): Uint8Array => {
  const fixturePath = path.resolve(__dirname, '../fixtures', filename)
  console.log(`Reading fixture from: ${fixturePath}`)
  const buffer = fs.readFileSync(fixturePath)
  console.log(`Fixture size: ${buffer.length} bytes`)
  return new Uint8Array(buffer)
}

async function main() {
  try {
    console.log('Starting extraction test')

    // Load the asset archive
    const assetArchive = readFixtureAsUint8Array('example_asset.zip')
    console.log('Asset archive loaded')

    // Extract the manifest
    console.log('Extracting manifest...')
    const manifest = await extractManifest(assetArchive)
    console.log('Manifest extraction complete')

    // Output results
    console.log('Result:', {
      conforms: manifest.conforms,
      hasReport: !!manifest.report,
      reportCount: manifest.report ? manifest.report.length : 0,
      hasData: !!manifest.data,
    })

    if (manifest.data) {
      console.log('Data:', manifest.data)
    }

    if (!manifest.conforms && manifest.report) {
      console.log('Validation errors:', manifest.report)
    }

    const domainMetadata = await extractDomainMetadata(assetArchive, manifest.data)
    console.log('Domain metadata extraction complete')

    console.log('Result:', {
      conforms: domainMetadata.conforms,
      hasReport: !!domainMetadata.report,
      reportCount: domainMetadata.report ? domainMetadata.report.length : 0,
      hasData: !!domainMetadata.data,
    })

    if (domainMetadata.data) {
      console.log('Domain meta Data:', domainMetadata.data)
    }

    if (!domainMetadata.conforms && domainMetadata.report) {
      console.log('Validation errors:', domainMetadata.report)
    }

    console.log('Script completed successfully')
    // process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    // process.exit(1)
  }
}

// Run the main function
main()
