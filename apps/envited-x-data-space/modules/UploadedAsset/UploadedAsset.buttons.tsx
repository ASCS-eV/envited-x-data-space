'use client'

import { Dialog, IconButtonWithTooltip } from '@envited-x-data-space/design-system'
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { includes } from 'ramda'
import { FC, useState } from 'react'

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

export const DeleteDialogConfirm: FC<{ id: string; disabled: boolean }> = ({ id, disabled }) => {
  const { t } = useTranslation('UploadedAsset')
  const { error, success } = useNotification()
  const [showDialog, setShowDialog] = useState(false)

  const cancel = (id: string) => async () => {
    try {
      await deleteAsset(id)
      success(t('[Notification] asset deleted'))
    } catch (e) {
      error(t('[Notification] error deleting asset'))
    }
  }

  return (
    <>
      <IconButtonWithTooltip
        disabled={disabled}
        icon={<TrashIcon className="h-4 w-4" aria-hidden="true" />}
        onClick={() => setShowDialog(true)}
      >
        {t('[Button] delete')}
      </IconButtonWithTooltip>
      <Dialog
        heading={t('[Heading] delete asset')}
        description={t('[Description] delete asset')}
        isOpen={showDialog}
        setShow={setShowDialog}
        action={
          <form action={cancel(id)}>
            <button
              className={`bg-red-600 hover:bg-red-500 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
            >
              {t('[Button] delete')}
            </button>
          </form>
        }
      />
    </>
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
      <DeleteDialogConfirm id={id} disabled={!includes(AssetAction.delete)(enabledActionsMap[status])} />
    </span>
  )
}
