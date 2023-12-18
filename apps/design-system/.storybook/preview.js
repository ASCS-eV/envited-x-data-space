import { PreferencesContext } from '../src/common/userPreferences'
import '../src/index.css'

export const globalTypes = {
  language: {
    name: 'Language',
    description: 'Language',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: ['en', 'nl'],
      showName: false,
    },
  },
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: 'light',
    darkClass: 'dark',
    classTarget: 'html',
    stylePreview: true,
  },
}

const withLocaleProvider = (Story, context) => {
  const locale = context.globals.language
  return (
    <PreferencesContext.Provider value={{ locale }}>
      <div className="dark:text-white">
        <Story {...context} />
      </div>
    </PreferencesContext.Provider>
  )
}

export const decorators = [withLocaleProvider]
