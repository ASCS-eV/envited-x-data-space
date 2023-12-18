import { Locale } from './types'
import { translation } from './useI18n'

describe('common/i18n/useI18n', () => {
  describe('useTranslation', () => {
    it.each([
      ['NAMESPACE', 'KEY', 'VALUE'],
      ['NAMESPACE', 'NON_EXISTENT_KEY', ''],
      ['NON_EXISTENT_NAMESPACE', 'KEY', ''],
    ])('should return as expected', (namespace, key, expected) => {
      // given ... we have a locale and translations
      const translationObject = {
        [Locale.de_DE]: {
          NAMESPACE: {
            KEY: 'WAARDE',
          },
        },
        [Locale.en_GB]: {
          NAMESPACE: {
            KEY: 'VALUE',
          },
        },
      }
      // when ... we want to get a translated value from a key
      const { t } = translation(translationObject)(namespace)

      // then ... it returns the value as expected
      expect(t(key)).toEqual(expected)
    })
  })
})
