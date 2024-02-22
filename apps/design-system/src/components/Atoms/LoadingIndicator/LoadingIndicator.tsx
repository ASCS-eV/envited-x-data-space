import React, { FC } from 'react'

import { Colour, Size } from '../../../types'

interface Props {
  size?: Size
  colour?: Colour
}

const LoadingIndicator: FC<Props> = ({ size = Size.medium, colour = Colour.blue }) => {
  const sizeClassMap = {
    [Size.small]: 'h-3.5 w-3.5',
    [Size.medium]: 'h-4 w-4',
    [Size.large]: 'h-6 w-6',
  }

  const textColour = `text-${colour}`

  return (
    <svg
      className={`animate-spin ${sizeClassMap[size]} ${textColour}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <title>Loading Indicator</title>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export default LoadingIndicator
