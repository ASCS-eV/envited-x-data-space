import * as SUT from './turtleValidator'

describe('common/serviceActions/turtleValidator', () => {
  describe('readShaclFile', () => {
    it('Should return a valid result', async () => {
      // when ... we want to validate a valid shacl file
      const shapeFile = `${process.cwd()}/apps/envited.ascs.digital/common/fixtures/shaclSchema.ttl`
      const dataFile = `${process.cwd()}/apps/envited.ascs.digital/common/fixtures/shaclData.jsonld`

      // then ... it should return a valid result
      const result = await SUT.validate(shapeFile, dataFile)

      expect(result.conforms).toEqual(true)
    })
  })
})
