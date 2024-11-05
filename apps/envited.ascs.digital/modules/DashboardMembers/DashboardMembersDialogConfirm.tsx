'use client'

import { Dialog, Switch } from '@envited-x-data-space/design-system'
import { FC, useState } from 'react'

import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { activateMember, deactivateMember } from './DashboardMembers.actions'

interface DialogConfirmProps {
  id: string
  status: boolean
}

export const DashboardMembersDialogConfirm: FC<DialogConfirmProps> = ({ id, status }) => {
  const { t } = useTranslation('DashboardMembers')
  const { error, success } = useNotification()
  const [showDialog, setShowDialog] = useState(false)
  const [activate, setActivate] = useState(status)

  const deactivateMemberWithId = (id: string) => async () => {
    try {
      await deactivateMember(id)
      success(t('[Notification] deactivated success'))
      setShowDialog(false)
    } catch (e) {
      error(t('[Notification] error'))
    }
  }

  const activateMemberWithId = (id: string) => async () => {
    try {
      await activateMember(id)
      success(t('[Notification] activated success'))
      setShowDialog(false)
    } catch (e) {
      error(t('[Notification] error'))
    }
  }

  return (
    <>
      <Switch
        status={status}
        onClick={activationStatus => {
          setActivate(activationStatus)
          setShowDialog(true)
        }}
      />
      <Dialog
        heading={activate ? t('[Heading] activate account') : t('[Heading] deactivate account')}
        description={activate ? t('[Description] activate account') : t('[Description] deactivate account')}
        isOpen={showDialog}
        setShow={setShowDialog}
        action={
          <form action={activate ? activateMemberWithId(id) : deactivateMemberWithId(id)}>
            <button
              className={`${
                activate ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'
              } inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
            >
              {activate ? t('[Button] activate') : t('[Button] deactivate')}
            </button>
          </form>
        }
      />
    </>
  )
}
