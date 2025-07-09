'use client'

import { IconButtonWithTooltip } from '@envited-x-data-space/design-system'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'

import { useWallet } from '../../common/context/WalletContext'
import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { formatIpfsUri } from '../../common/utils'
import { mintToken } from '../../common/web3'
import { getAssetMintParams, updateStatus, uploadAssetTokenMetadata } from '../UploadedAssets/UploadedAssets.actions'
import { ShowSpecificBeaconWallets } from './Mint.utils'

interface MintProps {
  assetId: string
  disabled: boolean
}

export const Mint: FC<MintProps> = ({ assetId, disabled }) => {
  const { t } = useTranslation('Mint')
  const { error, success } = useNotification()
  const { Tezos, wallet, account, connectWallet } = useWallet()

  const mintAsset = async (id: string) => {
    if (!account) {
      await connectWallet()
      ShowSpecificBeaconWallets()
    }
    console.log(id)
    if (account && Tezos && wallet) {
      // const cid = await uploadAssetTokenMetadata(id)
      const mintParams = await getAssetMintParams(id)
      const operation = await mintToken({ Tezos, wallet })({ ...mintParams, tokenInfo: formatIpfsUri(cid) })
      await operation
        ?.confirmation(3)
        .then(async () => {
          await updateStatus(id)
          success(t('[Status] token is minted'))
        })
        .catch(() => {
          error(t('[Status] token minting failed'))
        })
      console.log('minting')
    }
  }
  return (
    <IconButtonWithTooltip
      disabled={disabled}
      icon={<RocketLaunchIcon className="h-4 w-4" aria-hidden="true" />}
      onClick={() => mintAsset(assetId)}
    >
      {account ? t('[Button] mint') : t('[Button] connect and mint')}
    </IconButtonWithTooltip>
  )
}
