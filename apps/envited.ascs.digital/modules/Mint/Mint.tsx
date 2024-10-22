'use client'

import { useTranslation } from '../../common/i18n'
import React, { FC } from 'react'
import { getMintParams, uploadTokenMetadata } from '../UploadedAssets/UploadedAssets.actions'
import { mintToken } from 'apps/envited.ascs.digital/common/web3'
import { tezos } from 'apps/envited.ascs.digital/common/web3'

interface MintProps {
  assetId: string
}

export const Mint:FC<MintProps> = ({ assetId }) => {
  const { t } = useTranslation('UploadedAssets')

  const mintAsset = async (id: string) => {
    const { Tezos, wallet } = await tezos()
    await wallet?.client.requestPermissions({ network: { type: 'ghostnet' as any } })
    const account = await wallet?.client.getActiveAccount()
    
    if (account) {
        const fileLocation = await uploadTokenMetadata(id)
        const mintParams = await getMintParams(id)
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
    </button>)
}
