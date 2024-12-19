import { createFilename } from './utils'

describe('common/asset/utils', () => {
  describe('createFilename', () => {
    it('should create a valid CID from a byte array', async () => {
      // Create a sample byte array
      const testData = new TextEncoder().encode('Hello, World!')

      // Generate CID
      const cid = await createFilename(testData)

      // Verify the result is a valid CID string
      expect(cid).toBeDefined()
      expect(typeof cid).toBe('string')
      expect(cid).toMatch(/^bafkr/) // CID v1 with raw codec starts with 'bafkr'
    })

    it('should create consistent CIDs for identical content', async () => {
      const data1 = new TextEncoder().encode('Same content')
      const data2 = new TextEncoder().encode('Same content')

      const cid1 = await createFilename(data1)
      const cid2 = await createFilename(data2)

      expect(cid1).toBe(cid2)
    })

    it('should create different CIDs for different content', async () => {
      const data1 = new TextEncoder().encode('Content 1')
      const data2 = new TextEncoder().encode('Content 2')

      const cid1 = await createFilename(data1)
      const cid2 = await createFilename(data2)

      expect(cid1).not.toBe(cid2)
    })

    it('should handle empty byte array', async () => {
      const emptyData = new Uint8Array(0)

      const cid = await createFilename(emptyData)

      expect(cid).toBeDefined()
      expect(typeof cid).toBe('string')
    })

    it('should handle large byte arrays', async () => {
      // Create a larger byte array (100KB)
      const largeData = new Uint8Array(102400).fill(1)

      const cid = await createFilename(largeData)

      expect(cid).toBeDefined()
      expect(typeof cid).toBe('string')
    })

    it('should create the same CID as pinata', async () => {
      // Create a sample byte array
      const testData = new TextEncoder().encode(
        JSON.stringify({
          name: 'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8',
          symbol: 'ENVITED',
          decimals: 2,
          shouldPreferSymbol: true,
          thumbnailUri: 'THUMBNAIL_UR',
          attributes: [],
          assets: [],
        }),
      )

      // Generate CID
      const cid = await createFilename(testData)

      // Verify the result is a valid CID string
      expect(cid).toBeDefined()
      expect(typeof cid).toBe('string')
      expect(cid).toMatch('bafkreigdlsyni2wjmihwrotlmhficmbnspltfiuwbo476e7x45eojntzha') // CID v1 with raw codec starts with 'bafkr'
    })
  })
})
