import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'

import { ColorScheme } from '../../../types'

interface Props {
  selectedTheme: ColorScheme
  onToggle: () => void
}

const ThemeToggle: FC<Props> = ({ selectedTheme, onToggle }) => (
  <button type="button" className="text-gray-700 dark:text-gray-400 p-3 -m-3" onClick={onToggle}>
    {selectedTheme === ColorScheme.dark ? (
      <MoonIcon className="text-gray-700 dark:text-gray-400 h-6 w-6" />
    ) : (
      <SunIcon className="text-gray-700 dark:text-gray-400 h-6 w-6" />
    )}
  </button>
)

export default ThemeToggle
