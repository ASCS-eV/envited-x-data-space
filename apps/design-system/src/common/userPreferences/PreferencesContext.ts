import { createContext, useContext } from 'react'

import { Language } from '../../types'

interface ContextProps {
  locale: Language
}

const PreferencesContext = createContext<ContextProps>({
  locale: Language.en,
})
const usePreferencesContext = () => useContext(PreferencesContext)

export { PreferencesContext, usePreferencesContext }
