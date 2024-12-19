import { AssetAction, AssetStatus } from '../../common/types'

export const enabledActionsMap = {
  [AssetStatus.processing]: [],
  [AssetStatus.rejected]: [AssetAction.delete],
  [AssetStatus.minted]: [AssetAction.view],
  [AssetStatus.completed]: [AssetAction.view],
  [AssetStatus.pending]: [AssetAction.mint, AssetAction.delete],
}
