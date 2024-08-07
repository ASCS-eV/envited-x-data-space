import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { FC, ReactNode } from 'react'

import { AlertType } from '../../../types'

interface AlertProps {
  type: AlertType
  children: ReactNode
}

const Alert: FC<AlertProps> = ({ type, children }) => {
  const typeIconMap = {
    [AlertType.succes]: <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />,
    [AlertType.info]: <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />,
    [AlertType.warning]: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />,
    [AlertType.error]: <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />,
  }

  const typeStyleMap = {
    [AlertType.succes]: 'bg-green-50',
    [AlertType.info]: 'bg-blue-50',
    [AlertType.warning]: 'bg-yellow-50',
    [AlertType.error]: 'bg-red-50 ',
  }

  return (
    <div className={`rounded-md p-4 ${typeStyleMap[type]}`}>
      <div className="flex">
        <div className="flex-shrink-0">{typeIconMap[type]}</div>
        <div className="ml-3 w-full">{children}</div>
      </div>
    </div>
  )
}

export default Alert
