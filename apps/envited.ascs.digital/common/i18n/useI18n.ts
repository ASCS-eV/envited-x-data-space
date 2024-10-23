import { compose, mergeDeepRight, pathOr, propOr, reduce } from 'ramda'

import { AddAssetsTranslation } from '../../modules/AddAssets'
import { DashboardMembersTranslation } from '../../modules/DashboardMembers'
import { ErrorTranslation } from '../../modules/Error'
import { FooterTranslation } from '../../modules/Footer'
import { HeaderTranslation } from '../../modules/Header'
import { HeroHeaderTranslation } from '../../modules/HeroHeader'
import { ReinventingMobilityTranslation, SimulationDataTranslation, VisionTranslation } from '../../modules/LandingPage'
import { MemberTranslation } from '../../modules/Member'
import { NotFoundTranslation } from '../../modules/NotFound'
import { ProfileTranslation } from '../../modules/Profile'
import { UploadsTranslation } from '../../modules/Uploads'
import { UsersTranslation } from '../../modules/Users'
import { Locale, TranslationsMap } from './types'

const getTranslationsForLanguage = (namespace: string) => (locale: Locale) => pathOr({}, [locale, namespace])

const mergeTranslations = reduce(mergeDeepRight, { [Locale.en_GB]: {}, [Locale.de_DE]: {} })
const translationObject = mergeTranslations([
  AddAssetsTranslation,
  DashboardMembersTranslation,
  ErrorTranslation,
  FooterTranslation,
  HeaderTranslation,
  HeroHeaderTranslation,
  MemberTranslation,
  NotFoundTranslation,
  ProfileTranslation,
  UploadsTranslation,
  UsersTranslation,
  ReinventingMobilityTranslation,
  SimulationDataTranslation,
  VisionTranslation,
]) as TranslationsMap

export const translation = (translations: TranslationsMap) => (namespace: string) => {
  const t = (key: string): React.ReactElement =>
    compose(propOr('', key), getTranslationsForLanguage(namespace)(Locale.en_GB))(translations) as React.ReactElement

  return { t }
}

export const useTranslation = translation(translationObject)
