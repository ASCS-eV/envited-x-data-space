import { includes } from 'ramda'

import { getServerSession } from '../../common/auth'
import { getTokensForLoggedInUser, getTotalUsersByIssuerId } from '../../common/serverActions'
import { Role } from '../../common/types'
import {
  AssetsWidget,
  ManageUsersWidget,
  UploadAssetsWidget,
  UsersWidget,
  ViewAssetsWidget,
} from '../../modules/Widgets'

export default async function Index() {
  const session = await getServerSession()
  console.log("SESSION", session)
  const users = await getTotalUsersByIssuerId()
  console.log("USERS", users)
  const tokens = await getTokensForLoggedInUser()
  console.log("TOKENS", tokens)

  return (
    <div className="grid grid-cols-2 gap-5 mb-12">
      <div className="grid content-start items-start gap-5">
        <UsersWidget users={users} />
        {includes(session?.user.role)([Role.federator, Role.principal]) && <ManageUsersWidget />}
      </div>
      <div className="grid content-start items-start gap-5">
        <AssetsWidget tokens={tokens} />
        {includes(session?.user.role)([Role.federator, Role.principal]) && <ViewAssetsWidget />}
        {includes(session?.user.role)([Role.federator, Role.principal, Role.provider, Role.user]) && (
          <UploadAssetsWidget />
        )}
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
