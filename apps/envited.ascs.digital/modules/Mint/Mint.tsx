'use client'

import React, { FC } from 'react'

import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { mintToken, tezos } from '../../common/web3'
import { updateStatus, getAssetMintParams, uploadAssetTokenMetadata } from '../UploadedAssets/UploadedAssets.actions'
import { ShowSpecificBeaconWallets } from './Mint.utils'

interface MintProps {
  assetId: string
}

export const Mint: FC<MintProps> = ({ assetId }) => {
  const { t } = useTranslation('Mint')
  const { error, success } = useNotification()

  const mintAsset = async (id: string) => {
    const { Tezos, wallet } = await tezos()
    await wallet?.client.requestPermissions({ network: { type: 'ghostnet' as any } })
    const account = await wallet?.client.getActiveAccount()

    if (account) {
      const fileLocation = await uploadAssetTokenMetadata(id)
      const mintParams = await getAssetMintParams(id)
      const operation = await mintToken({ Tezos, wallet })({ ...mintParams, tokenInfo: fileLocation })
      await operation?.confirmation(3)
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
    <button
      type="button"
      className="inline-flex items-center rounded-md bg-blue-900 hover:bg-blue-800 px-2.5 py-1.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-gray-300"
      onClick={() => mintAsset(assetId)}
    >
      {t('[Button] mint')}
    </button>
  )
}
