import { Role } from '../../types'
import * as SUT from './getUsersByIssuerId'

describe('common/server/users/getUsersByIssuerId', () => {
  it('should return a array of user as expected', async () => {
    // when ... we request a user by id
    // then ... it returns a user as expected

    const getServerSessionStub = jest.fn().mockImplementation(() =>
      Promise.resolve({
        user: {
          pkh: 'USER_ISSUER_ID',
          role: Role.federator
        },
      }),
    )
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
    }
    const dbStub = jest.fn().mockImplementation(() =>
      Promise.resolve({
        getUsersByIssuerId: () => Promise.resolve([user]),
      }),
    )

    const result = await SUT._getUsersByIssuerId({ db: dbStub, getServerSession: getServerSessionStub })('USER_ISSUER_ID')
    expect(result).toEqual([user])
  })

  it('should throw because of missing session', async () => {
    // when ... we request a user by id without a session
    // then ... it throws as expected
    const getServerSessionStub = jest.fn().mockImplementation(() => Promise.resolve(null))
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
    }
    const dbStub = jest.fn().mockImplementation(() =>
      Promise.resolve({
        getUsersByIssuerId: () => Promise.resolve([user]),
      }),
    )

    await expect(SUT._getUsersByIssuerId({ db: dbStub, getServerSession: getServerSessionStub })()).rejects.toThrow(
      'Something went wrong',
    )
  })

  it('should throw because requester is not allowed to get this resource', async () => {
    // when ... we request a user by id, but the requested user is not issued by the requester OR is not their own user
    // then ... it throws as expected
    const getServerSessionStub = jest.fn().mockImplementation(() =>
      Promise.resolve({
        user: {
          pkh: 'ISSUER_PKH',
        },
      }),
    )
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
    }
    const dbStub = jest.fn().mockImplementation(() =>
      Promise.resolve({
        getUsersByIssuerId: () => Promise.resolve([user]),
      }),
    )

    await expect(SUT._getUsersByIssuerId({ db: dbStub, getServerSession: getServerSessionStub })()).rejects.toThrow(
      'Something went wrong',
    )
  })
})
