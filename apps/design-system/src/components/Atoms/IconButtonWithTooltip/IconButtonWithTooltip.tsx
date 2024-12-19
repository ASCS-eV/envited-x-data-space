import React, { FC, ReactNode, useState } from 'react'

import { TooltipType } from '../../../types'

interface Props {
  icon: JSX.Element
  type?: TooltipType
  children: ReactNode
  disabled?: boolean
  onClick: () => void
}

const IconButtonWithTooltip: FC<Props> = ({ icon, children, disabled = false, onClick }) => {
  const [hover, setHover] = useState(false)

  const handleMouseIn = () => !disabled && setHover(true)

  const handleMouseOut = () => !disabled && setHover(false)

  const styles = hover ? 'opacity-100 visible duration-100' : 'delay-300 opacity-0 invisible'

  return (
    <div className="relative flex items-center justify-center">
      <button
        onMouseOver={handleMouseIn}
        onMouseOut={handleMouseOut}
        onFocus={handleMouseIn}
        onBlur={handleMouseOut}
        disabled={disabled}
        type="button"
        onClick={() => !disabled && onClick()}
        className={`inline-flex items-center text-gray-600 hover:text-gray-800 text-sm font-semibold disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:text-gray-400`}
      >
        {icon}
      </button>
      <div
        role="tooltip"
        className={`${styles} flex justify-center absolute z-30 bottom-full py-2 px-3 text-xs font-medium rounded-lg shadow-lg tracking-wide text-white bg-gray-700 transition mb-3 border border-gray-600`}
      >
        {children}
        <div className="block w-3 h-3 bg-gray-700 absolute -bottom-1.5 mx-auto transform rotate-45 z-0 border-r border-b border-gray-600" />
      </div>
    </div>
  )
}

export default IconButtonWithTooltip
