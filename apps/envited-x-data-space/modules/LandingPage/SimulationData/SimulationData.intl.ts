import { Locale, TranslationsMap } from '../../../common/i18n/types'
import de from './locales/de_DE.json'
import en from './locales/en_GB.json'

export const translations: TranslationsMap = {
  [Locale.en_GB]: {
    SimulationData: en,
  },
  [Locale.de_DE]: {
    SimulationData: de,
  },
}
