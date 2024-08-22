import { Log, log } from '../../common/logger'
import { formatError } from '../../common/utils'
import { confirmMemberRole, confirmUserRole } from '../../contract'
import { getContractStorage } from '../../tezos'

const _postVerifyUser =
  ({
    log,
    checkRevocationRegistry,
  }: {
    log: Log
    checkRevocationRegistry: (id: string, pkh: string, issuer: string, type: string) => Promise<boolean>
  }) =>
  async (id: string, pkh: string, issuer: string, type: string) => {
    try {
      return checkRevocationRegistry(id, pkh, issuer, type)
    } catch (error) {
      log.error(formatError(error))
      return error.message
    }
  }

export const _checkRevocationRegistry =
  ({
    getContractStorage,
    confirmMemberRole,
    confirmUserRole,
  }: {
    getContractStorage: (contractAddress: string) => Promise<unknown>
    confirmMemberRole: (memberRegistry: any, pkh: string) => Promise<boolean>
    confirmUserRole: (memberRegistry: any, userRegistry: any, userId: string, memberPkh: string) => Promise<boolean>
  }) =>
  async (id: string, pkh: string, issuer: string, type: string) => {
    const { member_registry, user_registry } = (await getContractStorage(
      process.env.SMART_CONTRACT_ADDRESS as string,
    )) as { member_registry: any; user_registry: any }
    if (type === 'AscsMember') {
      return confirmMemberRole(member_registry, pkh)
    }

    return confirmUserRole(member_registry, user_registry, id, issuer)
  }

export const checkRevocationRegistry = _checkRevocationRegistry({
  getContractStorage,
  confirmMemberRole,
  confirmUserRole,
})

export const postVerifyUser = _postVerifyUser({ log, checkRevocationRegistry })
