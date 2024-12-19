'use client'

import { IconButtonWithTooltip } from '@envited-x-data-space/design-system'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'

import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { formatIpfsUri } from '../../common/utils'
import { mintToken, tezos } from '../../common/web3'
import { getAssetMintParams, updateStatus, uploadAssetTokenMetadata } from '../UploadedAssets/UploadedAssets.actions'
import { ShowSpecificBeaconWallets } from './Mint.utils'

interface MintProps {
  assetId: string
  disabled: boolean
}

export const Mint: FC<MintProps> = ({ assetId, disabled }) => {
  const { t } = useTranslation('Mint')
  const { error, success } = useNotification()

  const mintAsset = async (id: string) => {
    const { Tezos, wallet } = await tezos()
    await wallet?.client.requestPermissions({ network: { type: 'ghostnet' as any } })
    const account = await wallet?.client.getActiveAccount()

    if (account) {
      const cid = await uploadAssetTokenMetadata(id)
      console.log('uploadAssetTokenMetadata', cid)
      const mintParams = await getAssetMintParams(id)
      const operation = await mintToken({ Tezos, wallet })({ ...mintParams, tokenInfo: formatIpfsUri(cid) })
      await operation
        ?.confirmation(3)
        .then(async () => {
          await updateStatus(id, operation.opHash)
          success(t('[Status] token is minted'))
        })
        .catch(() => {
          error(t('[Status] token minting failed'))
        })
    } else {
      await wallet?.client.requestPermissions({ network: { type: 'ghostnet' as any } })
      ShowSpecificBeaconWallets()
    }
  }
  return (
    <IconButtonWithTooltip
      disabled={disabled}
      icon={<RocketLaunchIcon className="h-4 w-4" aria-hidden="true" />}
      onClick={() => mintAsset(assetId)}
    >
      {t('[Button] mint')}
    </IconButtonWithTooltip>
  )
}
