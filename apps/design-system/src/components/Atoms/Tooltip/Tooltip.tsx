import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import React, { FC, ReactNode, useState } from 'react'

import { Size, TooltipType } from '../../../types'

interface Props {
  size?: Size
  type?: TooltipType
  children: ReactNode
}

const Tooltip: FC<Props> = ({ size = Size.small, children, type = TooltipType.info }) => {
  const [hover, setHover] = useState(false)

  const handleMouseIn = () => {
    setHover(true)
  }

  const handleMouseOut = () => {
    setHover(false)
  }

  const sizeClassMap = {
    [Size.small]: 'w-4 h-4',
    [Size.medium]: 'w-5 h-5',
    [Size.large]: 'w-6 h-6',
  }

  const iconStyleClassMap = {
    [TooltipType.info]: 'text-black dark:text-white opacity-50',
    [TooltipType.warning]: 'text-red-600 opacity-75',
  }

  const iconMap = {
    [TooltipType.info]: <InformationCircleIcon />,
    [TooltipType.warning]: <ExclamationTriangleIcon />,
  }

  const styles = hover ? 'opacity-100 visible duration-100' : 'delay-300 opacity-0 invisible'

  return (
    <div className="relative">
      <button
        onMouseOver={handleMouseIn}
        onMouseOut={handleMouseOut}
        onFocus={handleMouseIn}
        onBlur={handleMouseOut}
        type="button"
        className={`${sizeClassMap[size]} ${iconStyleClassMap[type]} block font-medium text-sm text-center`}
      >
        {iconMap[type]}
      </button>
      <div
        role="tooltip"
        className={`${styles} block absolute z-30 -right-3.5 bottom-full py-2 px-3 text-xs w-48 min-w-48 max-w-56 font-medium rounded-lg shadow-lg text-black tracking-wide bg-gray-100 dark:text-white dark:bg-gray-700 transition mb-3 border border-gray-200 dark:border-gray-600`}
      >
        {children}
        <div className="block w-3 h-3 bg-gray-100 dark:bg-gray-700 absolute -bottom-1.5 right-4 transform rotate-45 z-0 border-r border-b border-gray-200 dark:border-gray-600" />
      </div>
    </div>
  )
}

export default Tooltip
