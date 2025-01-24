import { ERRORS } from '../../constants'
import { Role } from '../../types'
import * as SUT from './getUsersByIssuerId'

describe('common/serverAction/users/getUsersByIssuerId', () => {
  it('should return a array of user as expected', async () => {
    // when ... we request a user by id
    // then ... it returns a user as expected

    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        pkh: 'USER_ISSUER_ID',
        role: Role.federator,
      },
    })

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

    const users = [
      {
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
      },
    ]
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: jest.fn().mockResolvedValue(user),
      getUsersByIssuerId: jest.fn().mockResolvedValue(users),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    const result = await SUT._getUsersByIssuerId({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })()
    expect(result).toEqual(users)
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

    const users = [
      {
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
      },
    ]
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: jest.fn().mockResolvedValue(user),
      getUsersByIssuerId: jest.fn().mockResolvedValue(users),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    await expect(
      SUT._getUsersByIssuerId({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(),
    ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    expect(logStub.error).toHaveBeenCalledWith({ message: 'Unauthorized', name: 'UnauthorizedError' })
  })

  it('should throw because requester is not allowed to get this resource', async () => {
    // when ... we request a user by id, but the requested user is not issued by the requester OR is not their own user
    // then ... it throws as expected
    const getServerSessionStub = jest.fn().mockResolvedValue({
      user: {
        id: 'USER_ISSUER_ID',
        pkh: 'ISSUER_PKH',
      },
    })

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

    const users = [
      {
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
      },
    ]
    const dbStub = jest.fn().mockResolvedValue({
      getUserById: jest.fn().mockResolvedValue(user),
      getUsersByIssuerId: jest.fn().mockResolvedValue(users),
    })
    const logStub = {
      error: jest.fn(),
    } as any

    await expect(
      SUT._getUsersByIssuerId({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(),
    ).rejects.toThrow(ERRORS.INTERNAL_SERVER_ERROR)
    expect(logStub.error).toHaveBeenCalledWith({ message: 'Incorrect role', name: 'ForbiddenError' })
  })
})
