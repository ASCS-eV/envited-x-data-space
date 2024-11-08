import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { Hasher } from 'multiformats/dist/src/hashes/hasher'
import { sha256 } from 'multiformats/hashes/sha2'

export const _createFilename =
  ({ json, sha256, CID }: { json: any; sha256: Hasher<'sha2-256', 18>; CID: any }) =>
  async (byteArray: any) => {
    try {
      const jsonBytes = json.encode(byteArray)
      const hash = await sha256.digest(jsonBytes)
      const cid = CID.create(1, json.code, hash)

      return cid.toString()
    } catch (error: unknown) {
      console.log(error)
    }
  }

export const createFilename = _createFilename({
  json,
  sha256,
  CID,
})
