import React, { FC, ReactNode } from 'react'

import { Size } from '../../../types'

interface Props {
  size?: Size
  children: ReactNode
}

const Pill: FC<Props> = ({ size = Size.small, children }) => {
  const sizeClassMap = {
    [Size.small]: 'py-1 px-3 text-xs',
    [Size.medium]: 'py-2 px-4 text-sm',
    [Size.large]: 'py-3 px-6 text-base',
  }

  return (
    <div
      className={`${sizeClassMap[size]} bg-gray-300 dark:bg-gray-600 text-black dark:text-white inline-block font-medium leading-none rounded-full hover:bg-orange hover:text-white transition`}
    >
      {children}
    </div>
  )
}

export default Pill
