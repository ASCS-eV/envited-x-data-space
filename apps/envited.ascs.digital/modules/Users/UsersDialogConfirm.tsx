'use client'

import { Dialog } from '@envited-marketplace/design-system'
import { TrashIcon } from '@heroicons/react/24/outline'
import { FC, useState } from 'react'

import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { deleteUser } from './Users.actions'

interface DialogConfirmProps {
  id: string
}

export const UserDialogConfirm: FC<DialogConfirmProps> = ({ id }) => {
  const { t } = useTranslation('Users')
  const { error, success } = useNotification()
  const [showDialog, setShowDialog] = useState(true)

  const deleteUserWithId = (id: string) => async () => {
    try {
      await deleteUser(id)
      success(t('[Notification] success'))
      setShowDialog(false)
    } catch (e) {
      error(t('[Notification] error'))
    }
  }

  return (
    <>
      <button className="text-white bg-red-500 hover:bg-red-600 p-1.5 rounded-lg" onClick={() => setShowDialog(true)}>
        <span className="sr-only">{t('[Button] deactivate')}</span>
        <TrashIcon className="w-3" />
      </button>
      <Dialog
        heading={t('[Heading] deactivate account')}
        description={t('[Description] deactivate account')}
        isOpen={showDialog}
        setShow={setShowDialog}
        action={
          <form action={deleteUserWithId(id)}>
            <button className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
              {t('[Button] deactivate')}
            </button>
          </form>
        }
      />
    </>
  )
}
