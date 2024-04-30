import ParserJsonld from '@rdfjs/parser-jsonld'
import { DatasetCore, Quad } from '@rdfjs/types'
import rdf from '@zazuko/env'
import fs from 'fs'
import rdfParser, { RdfParser } from 'rdf-parse'
import SHACLValidator from 'rdf-validate-shacl'
import { Readable } from 'stream'

import { internalServerErrorError } from '../utils'

export const _loadDataset =
  ({ fileSystem, parser, environment }: { fileSystem: any; parser: RdfParser<Quad>; environment: any }) =>
  async (filePath: fs.PathLike, contentType: string): Promise<DatasetCore<Quad, Quad>> => {
    try {
      const stream = fileSystem.createReadStream(filePath)
      console.log('fs stream', stream)
      const quads = parser.parse(stream, { contentType })

      return environment.dataset().import(quads)
    } catch (e) {
      throw internalServerErrorError()
    }
  }

export const loadDataset = _loadDataset({ fileSystem: fs, parser: rdfParser, environment: rdf })

export const validateShacl = (shapes: DatasetCore<Quad, Quad>) => async (data: DatasetCore<Quad, Quad>) => {
  try {
    const validator = new SHACLValidator(shapes, { factory: rdf })
    const report = await validator.validate(data)

    return report
  } catch (e) {
    throw internalServerErrorError()
  }
}

export const _loadJsonLdDataset = async data => {
  // 'use server'

  try {
    console.log('transfromStream', data)
    // const parserJsonld = new ParserJsonld()
    console.log('x')
    const input = new Readable({
      read: () => {
        input.push(`${data}`)
        input.push(null)
      },
    })
    console.log('y')

    console.log(input)
    // console.log('parserJsonld', parserJsonld.import(input))

    // const quads = await rdfParser.parse(data, { contentType: 'application/ld+json' })
    // console.log('quads', quads)
    // const dataGraph = await rdf.dataset().import(quads)
    // console.log('dataGraph', dataGraph)
    // const data = `${process.cwd()}/apps/envited.ascs.digital/common/fixtures/shaclData.jsonld`
    // const shapes = `${process.cwd()}/common/fixtures/shaclSchema.ttl`
    // console.log(shapes)
    // const shapesGraph = await loadDataset(shapes, 'text/turtle')
    // console.log(shapesGraph)

    // const dataGraph = await loadDataset(data, 'application/ld+json')

    // const report = await validateShacl(shapesGraph)(dataGraph)
    // console.log(report)

    // return rdf.dataset().import(quads)
  } catch (e) {
    throw internalServerErrorError()
  }
}

export const test = () => {
  const parserJsonld = new ParserJsonld()

  const input = new Readable({
    read: () => {
      input.push(`{
        "@context": "http://schema.org/",
        "@type": "Person",
        "name": "Jane Doe",
        "jobTitle": "Professor",
        "telephone": "(425) 123-4567",
        "url": "http://www.janedoe.com"
      }`)
      input.push(null)
    },
  })

  const output = parserJsonld.import(input)
  console.log(output)

  return output
}
