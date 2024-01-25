import { FC } from 'react'
import { User as IUser} from '../../common/types'

export const User: FC<IUser> = ({
  id,
  issuerId,
  // addressCountry,
  // addressLocality,
  // addressTypeId,
  // articlesOfAssociationAccepted,
  // contributionRulesAccepted,
  // createdAt,
  // email,
  // expirationDate,
  // isAscsMember,
  // isEnvitedMember,
  // issuanceDate,
  // name,
  // postalCode,
  // privacyPolicyAccepted,
  // streetAddress,
  // updatedAt,
  // vatId,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">User data:</h1>
      <dl className="mb-10">
        <dt className="font-bold">User</dt>
        <dd className="ml-5 italic">{id}</dd>
        <dt className="font-bold">Issued by</dt>
        <dd className="ml-5 italic">{issuerId}</dd>
      </dl>
    </div>
  )
}
