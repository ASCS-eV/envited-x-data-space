import React, { FC } from 'react'

import { ButtonStyle, ButtonType, Colour, Size } from '../../../types'
import { LoadingIndicator } from '../LoadingIndicator'

interface Props {
  onClick: () => void
  children: React.ReactNode
  style?: ButtonStyle
  type?: ButtonType
  size?: Size
  isDisabled?: boolean
  isWorking?: boolean
  extraClasses?: string
}

const Button: FC<Props> = ({
  children,
  onClick,
  type = ButtonType.primary,
  style = ButtonStyle.solid,
  size = Size.medium,
  isDisabled = false,
  isWorking = false,
  extraClasses = '',
}) => {
  const styleClassMap = {
    [ButtonType.primary]: {
      [ButtonStyle.solid]: 'bg-blue-900 hover:bg-blue-800 text-white',
      [ButtonStyle.ghost]: 'text-blue hover:text-white border-blue hover:bg-blue border-solid border-2',
    },
    [ButtonType.secondary]: {
      [ButtonStyle.solid]: 'bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-50',
      [ButtonStyle.ghost]:
        'text-gray-400 hover:text-gray-700 border-gray-400 hover:border-gray-700 border-solid border-2',
    },
  }

  const sizeClassMap = {
    [Size.small]: 'py-2 px-4 text-xs sm:text-sm',
    [Size.medium]: 'px-8 py-3 text-sm sm:text-base',
    [Size.large]: 'px-8 py-3 text-base sm:text-2xl',
  }

  const indicatorColour = {
    [ButtonType.primary]: {
      [ButtonStyle.solid]: Colour.white,
      [ButtonStyle.ghost]: Colour.main,
    },
    [ButtonType.secondary]: {
      [ButtonStyle.solid]: Colour.black,
      [ButtonStyle.ghost]: Colour.black,
    },
  }

  // 'flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'

  const buttonView = isWorking ? <LoadingIndicator size={size} colour={indicatorColour[type][style]} /> : children

  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={`${styleClassMap[type][style]} ${sizeClassMap[size]} ${extraClasses} disabled:opacity-50 font-bold leading-none transition duration-300 ease-in-out rounded-md`}
      disabled={isDisabled || isWorking}
    >
      {buttonView}
    </button>
  )
}

export default Button
