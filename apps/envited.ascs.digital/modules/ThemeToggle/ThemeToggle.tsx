'use client'

import { ColorScheme, ThemeToggle as TT } from '@envited-marketplace/design-system'
import { useTheme } from 'next-themes'
import { equals } from 'ramda'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <TT
        selectedTheme={theme as ColorScheme}
        onToggle={() => {
          equals(theme)(ColorScheme.light) ? setTheme(ColorScheme.dark) : setTheme(ColorScheme.light)
        }}
      />
    </>
  )
}

export default ThemeToggle
