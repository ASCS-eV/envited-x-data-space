import { head, keys, pipe, prop } from 'ramda'

export const confirmMemberRole = async (memberRegistry: any, pkh: string) => {
  try {
    // If role is member, check if member is approved
    const record = await memberRegistry.get(pkh)
    const status = pipe(prop('status'), keys, head)(record)

    return status === 'active'
  } catch (error) {
    return error
  }
}

export const confirmUserRole = async (memberRegistry: any, userRegistry: any, userId: string, memberPkh: string) => {
  try {
    // If role is user, check if user and parent member are approved
    const userRecord = await userRegistry.get(userId)
    const userStatus = pipe(prop('status'), keys, head)(userRecord)
    const memberRecord = await memberRegistry.get(memberPkh)
    const memberStatus = pipe(prop('status'), keys, head)(memberRecord)

    return userStatus === 'active' && memberStatus === 'active'
  } catch (error) {
    return error
  }
}
