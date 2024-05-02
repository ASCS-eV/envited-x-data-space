'use server'

import { DatasetCore, Quad } from '@rdfjs/types'
import fs from 'fs'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { internalServerErrorError } from '../utils'
import { loadDataset, validateShacl } from './turtleValidator.utils'

export const _validate =
  ({
    loadDataset,
    validateShacl,
  }: {
    loadDataset: (filePath: fs.PathLike, contentType: string) => Promise<DatasetCore<Quad, Quad>>
    validateShacl: (shapes: DatasetCore<Quad, Quad>) => (data: DatasetCore<Quad, Quad>) => Promise<ValidationReport>
  }) =>
  async (shapesFile: fs.PathLike, dataFile: fs.PathLike) => {
    try {
      const shapesGraph = await loadDataset(shapesFile, 'text/turtle')
      const dataGraph = await loadDataset(dataFile, 'application/ld+json')
      const report = await validateShacl(shapesGraph)(dataGraph)

      return report
    } catch (e) {
      throw internalServerErrorError()
    }
  }

export const validate = _validate({ loadDataset, validateShacl })
