import { ERRORS } from '../../constants'
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

    const users = [user, user]
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: getUserByIdStub,
      getUsersByIssuerId: jest.fn().mockResolvedValue(users),
      getIssuerByGlobalIdentifier: jest.fn().mockResolvedValue({
        id: 'ISSUER_ID',
        type: 'TYPE',
        name: 'NAME',
        url: 'URL',
      }),
    })
    const logStub = {
      error: console.error,
    } as any

    const result = await SUT._getTotalUsersByIssuerId({
      db: dbStub,
      getServerSession: getServerSessionStub,
      log: logStub,
    })()
    expect(result).toEqual(2)
    expect(getUserByIdStub).toHaveBeenCalledTimes(1)
  })

  it('should throw an error when it is a unknown user as expected', async () => {
    // when ... we request a user by id
    // then ... it returns a user as expected

    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        id: 'UNKNOWN_USER_ID',
      },
    })

    const user = undefined

    const getUserByIdStub = jest.fn().mockResolvedValue(user)

    const users: any[] = []
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: getUserByIdStub,
      getUsersByIssuerId: jest.fn().mockResolvedValue(users),
      getIssuerByGlobalIdentifier: jest.fn().mockResolvedValue({
        id: 'ISSUER_ID',
        type: 'TYPE',
        name: 'NAME',
        url: 'URL',
      }),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    try {
      await SUT._getTotalUsersByIssuerId({
        db: dbStub,
        getServerSession: getServerSessionStub,
        log: logStub,
      })()
      fail('Expected an error to be thrown')
    } catch (error) {
      expect((error as any).message).toEqual(ERRORS.INTERNAL_SERVER_ERROR)
    }
    expect(getUserByIdStub).toHaveBeenCalledTimes(1)
  })

  it('should return a total of users by the issuer id as expected', async () => {
    // when ... we request a user by id
    // then ... it returns a user as expected

    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        id: 'USER_ID',
      },
    })

    const user = {
      id: 'USER_ID',
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
      id: 'ISSUER_ID',
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

    const getUserByIdStub = jest.fn().mockResolvedValueOnce(user)

    const users = [issuerUser, user]
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: getUserByIdStub,
      getUsersByIssuerId: jest.fn().mockResolvedValue(users),
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
