'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const NotificationContainer: FC = () => (
  <ToastContainer
    toastClassName="dark:bg-gray-900 dark:text-gray-300"
    closeButton={({ closeToast }) => (
      <button onClick={closeToast}>
        <XMarkIcon className="w-4 text-gray-500 dark:text-gray-300" />
      </button>
    )}
  />
)
