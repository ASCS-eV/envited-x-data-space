import { keys, mergeAll, omit, pipe } from 'ramda'

import { CONTEXT_DROP_SCHEMAS, SCHEMA_MAP } from '../../validator/shacl/shacl.constants'
import { Schema, ValidationSchema } from '../../validator/shacl/shacl.types'
import { fetchShaclSchema } from '../../validator/shacl/shacl.utils'

interface ShaclProperty {
  name: string
  description: string
  type?: string | null
  value?: any
}

interface ShaclSection {
  name: string
  properties: Record<string, ShaclProperty>
  rawContent?: string
}

type ShaclMetadata = Record<string, ShaclSection>

export const extractShaclMetadata = (ttlContent: string): ShaclMetadata => {
  const sections = {}

  // console.log("🔍 SHACL Raw Content:\n", ttlContent.slice(0, 500)); // Show first 500 chars for debugging

  // Match `sh:NodeShape` sections and extract `sh:targetClass`
  const sectionRegex = /(\w+:\w+)\s+a\s+sh:NodeShape\s*;\s*([\s\S]+?)\s*sh:targetClass\s+(\w+:\w+)\s*[\.;]/gm
  let sectionMatch

  while ((sectionMatch = sectionRegex.exec(ttlContent)) !== null) {
    const sectionKey = sectionMatch[1] // e.g., hdmap:ContentShape
    const sectionName = sectionMatch[3] // e.g., hdmap:Content
    const sectionBlock = sectionMatch[2] // Full content inside the section

    //console.log(`✅ Found Section: ${sectionName} (Key: ${sectionKey})`);
    sections[sectionName] = { name: sectionName, properties: {}, rawContent: sectionBlock }
  }

  // Match all `sh:property` blocks, including multiple ones
  const propertyRegex = /sh:property\s+(\[(?:[^\[\]]+|\[[^\[\]]*\])*\])(?:\s*,\s*(\[(?:[^\[\]]+|\[[^\[\]]*\])*\]))*/gms
  let propertyMatch

  while ((propertyMatch = propertyRegex.exec(ttlContent)) !== null) {
    const propertyBlocks = propertyMatch[0].match(/\[(?:[^\[\]]|"[^"]*")*\]/gms) || []

    propertyBlocks.forEach(propertyBlock => {
      // Extract `sh:path`, `sh:name`, and `sh:description`
      const pathMatch = propertyBlock.match(/sh:path\s+([\w:]+)/)
      const nameMatch = propertyBlock.match(/sh:name\s*"([^"]+)"@en/)
      const descriptionMatch = propertyBlock.match(/sh:description\s*"([^"]+)"@en/)

      if (pathMatch && nameMatch && descriptionMatch) {
        const path = pathMatch[1] // e.g., hdmap:roadTypes
        const name = nameMatch[1] // e.g., "road types"
        const description = descriptionMatch[1] // e.g., "Lists the road types used in the HD map asset."

        let foundSection = null
        for (const sectionKey in sections) {
          if (sections[sectionKey].rawContent.includes(path)) {
            foundSection = sectionKey
            break
          }
        }

        if (foundSection) {
          // console.log(`🛠 Assigning Property: ${path} → ${name} (Section: ${foundSection})`);
          sections[foundSection].properties[path] = { name, description }
        } else {
          // console.warn(`⚠️ Property ${path} not assigned to any section`);
        }
      }
    })
  }

  // console.log(`🧐 Section Content for hdmap:Content:\n${sections["hdmap:Content"]?.rawContent || "❌ Not Found"}\n`);

  // Remove rawContent to keep the output clean
  for (const sectionKey in sections) {
    delete sections[sectionKey].rawContent
  }

  //console.log("📦 Extracted Sections and Properties:", JSON.stringify(sections, null, 2)); // Debugging
  return sections
}

export const extractValue = (property: any) =>
  property && typeof property === 'object' && '@value' in property ? property['@value'] : property

export const extractType = (property: any) =>
  property && typeof property === 'object' && '@type' in property ? property['@type'] : null

export const processSection = (
  sectionData: Record<string, any>,
  sectionType: string,
  shaclMetadata: ShaclMetadata,
  organizedSections: Record<string, ShaclSection>,
) => {
  if (!shaclMetadata[sectionType]) {
    // console.warn(`⚠️ No SHACL metadata found for section type: ${sectionType}`)
    return
  }

  const sectionMetadata = shaclMetadata[sectionType]

  // Initialize the section without a "type" field
  if (!organizedSections[sectionType]) {
    organizedSections[sectionType] = {
      name: sectionMetadata.name || sectionType,
      properties: {},
    }
  }

  // Process each property in the SHACL metadata
  Object.keys(sectionData).forEach(propertyKey => {
    if (propertyKey === '@type') return

    // console.log(`🛠 Processing property: ${propertyKey} in section: ${sectionType}`)

    const propertyValue = sectionData[propertyKey]
    const propertyType = extractType(propertyValue)

    // If the property has a type and matches a SHACL definition, process it recursively
    if (propertyType && shaclMetadata[propertyType]) {
      processSection(propertyValue, propertyType, shaclMetadata, organizedSections)
    }

    // Attach the property with "type" only inside properties
    organizedSections[sectionType].properties[propertyKey] = {
      value: extractValue(propertyValue),
      type: propertyType || sectionMetadata.properties[propertyKey]?.type || null,
      name: sectionMetadata.properties[propertyKey]?.name || propertyKey,
      description: sectionMetadata.properties[propertyKey]?.description || '',
    }
  })
}

export const organizeDataIntoSections = (data: Record<string, any>, shaclMetadata: ShaclMetadata) => {
  const organizedSections = {}

  Object.keys(data).forEach(sectionKey => {
    if (sectionKey === '@context' || sectionKey === '@id') {
      return
    }

    let sectionData = data[sectionKey]
    const sectionType = sectionData['@type'] || sectionKey

    processSection(sectionData, sectionType, shaclMetadata, organizedSections)
  })

  return organizedSections
}

export const extractAllShaclMetadata = (data: any) => {
  const shaclTemplates = pipe(omit([...CONTEXT_DROP_SCHEMAS]), keys)(data['@context']) as Schema[]

  return shaclTemplates
}

export const getMetadataInSections = async (jsonData: any) => {
  const schemas = extractAllShaclMetadata(jsonData) as ValidationSchema[]
  const allSchemas = await Promise.all(schemas.map((schema: ValidationSchema) => fetchShaclSchema(schema)))
  const allSections = allSchemas.map(extractShaclMetadata)
  const addDataToSections = allSections.map(section => organizeDataIntoSections(jsonData, section))

  return mergeAll(addDataToSections)
}
