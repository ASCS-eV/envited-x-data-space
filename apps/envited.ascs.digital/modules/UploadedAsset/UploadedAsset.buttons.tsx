'use client'

import { IconButtonWithTooltip } from '@envited-x-data-space/design-system'
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { includes } from 'ramda'
import { FC } from 'react'

import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { AssetAction, AssetStatus } from '../../common/types'
import { Mint } from '../Mint'
import { enabledActionsMap } from './UploadAsset.constants'
import { deleteAsset } from './UploadedAsset.actions'

interface UploadedAssetProps {
  id: string
  status: AssetStatus
}

export const View: FC<{ id: string; disabled: boolean }> = ({ id, disabled }) => {
  const { t } = useTranslation('UploadedAsset')
  const router = useRouter()

  return (
    <IconButtonWithTooltip
      disabled={disabled}
      icon={<EyeIcon className="h-4 w-4" aria-hidden="true" />}
      onClick={() => router.push(`/assets/${id}`)}
    >
      {t('[Button] view')}
    </IconButtonWithTooltip>
  )
}

export const Delete: FC<{ id: string; disabled: boolean }> = ({ id, disabled }) => {
  const { t } = useTranslation('UploadedAsset')
  const { error, success } = useNotification()

  const cancel = async (id: string) => {
    try {
      await deleteAsset(id)
      success(t('[Notification] asset deleted'))
    } catch (e) {
      error(t('[Notification] error deleting asset'))
    }
  }

  return (
    <IconButtonWithTooltip
      disabled={disabled}
      icon={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
      onClick={() => cancel(id)}
    >
      {t('[Button] delete')}
    </IconButtonWithTooltip>
  )
}

export const UploadedAssetButtons: FC<UploadedAssetProps> = ({ id, status }) => {
  return (
    <span className="flex shrink-0 items-center space-x-4 justify-end">
      <Mint assetId={id} disabled={!includes(AssetAction.mint)(enabledActionsMap[status])} />
      <View id={id} disabled={!includes(AssetAction.view)(enabledActionsMap[status])} />
      <span className="text-gray-300 border-r border-gray-300 block h-[1rem] w-[1px]" aria-hidden="true">
        {''}
      </span>
      <Delete id={id} disabled={!includes(AssetAction.delete)(enabledActionsMap[status])} />
    </span>
  )
}
