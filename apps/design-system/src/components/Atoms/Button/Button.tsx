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
      [ButtonStyle.solid]: 'bg-orange hover:bg-orange-700 text-white',
      [ButtonStyle.ghost]: 'text-orange hover:text-white border-orange hover:bg-orange border-solid border-2',
    },
    [ButtonType.secondary]: {
      [ButtonStyle.solid]: 'bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-50',
      [ButtonStyle.ghost]:
        'text-gray-400 hover:text-gray-700 border-gray-400 hover:border-gray-700 border-solid border-2',
    },
  }

  const sizeClassMap = {
    [Size.small]: 'py-3 px-4 md:py-4 md:px-6 text-xs sm:text-sm',
    [Size.medium]: 'py-4 px-8 text-sm sm:text-base',
    [Size.large]: 'py-4 px-10 text-base sm:text-2xl',
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

  const buttonView = isWorking ? <LoadingIndicator size={size} colour={indicatorColour[type][style]} /> : children

  return (
    <button
      type="button"
      onClick={() => onClick()}
      className={`${styleClassMap[type][style]} ${sizeClassMap[size]} ${extraClasses} disabled:opacity-50 font-bold leading-none transition duration-300 ease-in-out rounded-full`}
      disabled={isDisabled || isWorking}
    >
      {buttonView}
    </button>
  )
}

export default Button