import { ERRORS } from '../../constants'
import { Role } from '../../types'
import * as SUT from './getTotalUsersByIssuerId'

describe('common/serverAction/users/getTotalUsersByIssuerId', () => {
  it('should return a total of users as expected', async () => {
    // when ... we request a user by id
    // then ... it returns a user as expected

    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        pkh: 'USER_ISSUER_ID',
      },
    })

    const user = {
      id: 'USER_PKH',
      name: 'USER_NAME',
      email: 'USER_EMAIL',
      vatId: 'USER_VAT_ID',
      issuerId: 'USER_ISSUER_ID',
      privacyPolicyAccepted: 'USER_PRIVACY_POLICY_ACCEPTED',
      articlesOfAssociationAccepted: 'USER_ARTICLES_OF_ASSOCIATION_ACCEPTED',
      contributionRulesAccepted: 'USER_CONTRIBUTION_RULES_ACCEPTED',
      isAscsMember: true,
      isEnvitedMember: true,
      usersToCredentialTypes: [{ credentialType: { name: 'AscsMemberCredential' } }],
    }

    const getUserByIdStub = jest.fn().mockResolvedValue(user)

    const users = 2
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: getUserByIdStub,
      getTotalUsersByIssuerId: jest.fn().mockResolvedValue(users),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    const result = await SUT._getTotalUsersByIssuerId({
      db: dbStub,
      getServerSession: getServerSessionStub,
      log: logStub,
    })()
    expect(result).toEqual(2)
    expect(getUserByIdStub).toHaveBeenCalledTimes(1)
  })

  it('should not return the amount of users if it is a unknonw user as expected', async () => {
    // when ... we request a user by id
    // then ... it returns a user as expected

    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        pkh: 'UNKNOWN_USER_ID',
      },
    })

    const user = undefined

    const getUserByIdStub = jest.fn().mockResolvedValue(user)

    const users = 0
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: getUserByIdStub,
      getTotalUsersByIssuerId: jest.fn().mockResolvedValue(users),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    const result = await SUT._getTotalUsersByIssuerId({
      db: dbStub,
      getServerSession: getServerSessionStub,
      log: logStub,
    })()
    expect(result).toEqual(0)
    expect(getUserByIdStub).toHaveBeenCalledTimes(1)
  })

  it('should return a total of users by the issuer id as expected', async () => {
    // when ... we request a user by id
    // then ... it returns a user as expected

    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        pkh: 'USER_PKH',
      },
    })

    const user = {
      id: 'USER_PKH',
      name: 'USER_NAME',
      email: 'USER_EMAIL',
      vatId: 'USER_VAT_ID',
      issuerId: 'USER_ISSUER_ID',
      privacyPolicyAccepted: 'USER_PRIVACY_POLICY_ACCEPTED',
      articlesOfAssociationAccepted: 'USER_ARTICLES_OF_ASSOCIATION_ACCEPTED',
      contributionRulesAccepted: 'USER_CONTRIBUTION_RULES_ACCEPTED',
      isAscsMember: true,
      isEnvitedMember: true,
      usersToCredentialTypes: [{ credentialType: { name: 'AscsUserCredential' } }],
    }

    const issuerUser = {
      id: 'ISSUER_PKH',
      name: 'USER_NAME',
      email: 'USER_EMAIL',
      vatId: 'USER_VAT_ID',
      issuerId: 'USER_ISSUER_ID',
      privacyPolicyAccepted: 'USER_PRIVACY_POLICY_ACCEPTED',
      articlesOfAssociationAccepted: 'USER_ARTICLES_OF_ASSOCIATION_ACCEPTED',
      contributionRulesAccepted: 'USER_CONTRIBUTION_RULES_ACCEPTED',
      isAscsMember: true,
      isEnvitedMember: true,
      usersToCredentialTypes: [{ credentialType: { name: 'AscsUserCredential' } }],
    }

    const getUserByIdStub = jest.fn().mockResolvedValueOnce(user).mockResolvedValueOnce(issuerUser)

    const users = 2
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: getUserByIdStub,
      getTotalUsersByIssuerId: jest.fn().mockResolvedValue(users),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    const result = await SUT._getTotalUsersByIssuerId({
      db: dbStub,
      getServerSession: getServerSessionStub,
      log: logStub,
    })()
    expect(result).toEqual(2)
    expect(getUserByIdStub).toHaveBeenCalledTimes(2)
  })

  it('should throw because of missing session', async () => {
    // when ... we request a user by id without a session
    // then ... it throws as expected
    const getServerSessionStub = jest.fn().mockResolvedValue(null)

    const user = {
      id: 'USER_PKH',
      issuerId: 'FEDERATOR_PKH',
      name: 'USER_NAME',
      email: 'USER_EMAIL',
      vatId: 'USER_VAT_ID',
      privacyPolicyAccepted: 'USER_PRIVACY_POLICY_ACCEPTED',
      articlesOfAssociationAccepted: 'USER_ARTICLES_OF_ASSOCIATION_ACCEPTED',
      contributionRulesAccepted: 'USER_CONTRIBUTION_RULES_ACCEPTED',
      isAscsMember: true,
      isEnvitedMember: true,
      usersToCredentialTypes: [{ credentialType: { name: 'AscsUserCredential' } }],
    }

    const users = 0
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: jest.fn().mockResolvedValue(user),
      getTotalUsersByIssuerId: jest.fn().mockResolvedValue(users),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    await expect(
      SUT._getTotalUsersByIssuerId({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(),
    ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    expect(logStub.error).toHaveBeenCalledWith({ message: 'Unauthorized', name: 'UnauthorizedError' })
  })
})
