import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { sha256 } from 'multiformats/hashes/sha2'

export const hashFile = async (byteArray: Uint8Array) => {
  try {
    const hash = await sha256.digest(byteArray)
    console.log('************** HASH', hash)
    const cid = CID.create(1, json.code, hash)
    console.log('************** CID', cid)

    return cid.toString()
  } catch (error: unknown) {
    console.log(error)
  }
}
