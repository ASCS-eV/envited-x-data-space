'use client'

import React, { FC } from 'react'

import { useTranslation } from '../../common/i18n'
import { mintToken } from '../../common/web3'
import { tezos } from '../../common/web3'
import { getAssetMintParams, uploadAssetTokenMetadata } from '../UploadedAssets/UploadedAssets.actions'

interface MintProps {
  assetId: string
}

export const Mint: FC<MintProps> = ({ assetId }) => {
  const { t } = useTranslation('Mint')

  const mintAsset = async (id: string) => {
    const { Tezos, wallet } = await tezos()
    await wallet?.client.requestPermissions({ network: { type: 'ghostnet' as any } })
    const account = await wallet?.client.getActiveAccount()

    if (account) {
      const fileLocation = await uploadAssetTokenMetadata(id)
      const mintParams = await getAssetMintParams(id)

      await mintToken({ Tezos, wallet })({ ...mintParams, tokenInfo: fileLocation })
    } else {
      await wallet?.client.requestPermissions({ network: { type: 'ghostnet' as any } })
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
