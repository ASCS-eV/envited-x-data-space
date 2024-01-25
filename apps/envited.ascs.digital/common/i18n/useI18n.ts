import { compose, mergeDeepRight, pathOr, propOr, reduce } from 'ramda'

import { HeaderTranslation } from '../../modules/Header'
import { HeroHeaderTranslation } from '../../modules/HeroHeader'
import { UsersTranslation } from '../../modules/Users'
import { Locale, TranslationsMap } from './types'

const getTranslationsForLanguage = (namespace: string) => (locale: Locale) => pathOr({}, [locale, namespace])

const mergeTranslations = reduce(mergeDeepRight, { [Locale.en_GB]: {}, [Locale.de_DE]: {} })
const translationObject = mergeTranslations([HeaderTranslation, HeroHeaderTranslation, UsersTranslation]) as TranslationsMap

export const translation = (translations: TranslationsMap) => (namespace: string) => {
  const t = (key: string): React.ReactElement =>
    compose(propOr('', key), getTranslationsForLanguage(namespace)(Locale.en_GB))(translations) as React.ReactElement

  return { t }
}

export const useTranslation = translation(translationObject)
