import { compose, mergeDeepRight, pathOr, propOr, reduce } from 'ramda'

import { AddAssetsTranslation } from '../../modules/AddAssets'
import { AssetTranslation } from '../../modules/Asset'
import { AssetsTranslations } from '../../modules/Assets'
import { DashboardMembersTranslation } from '../../modules/DashboardMembers'
import { ErrorTranslation } from '../../modules/Error'
import { FooterTranslation } from '../../modules/Footer'
import { HeaderTranslation } from '../../modules/Header'
import { HeroHeaderTranslation } from '../../modules/HeroHeader'
import { ReinventingMobilityTranslation } from '../../modules/LandingPage'
import { SimulationDataTranslation } from '../../modules/LandingPage/SimulationData'
import { VisionTranslation } from '../../modules/LandingPage/Vision'
import { MemberTranslation } from '../../modules/Member'
import { MintTranslation } from '../../modules/Mint'
import { NotFoundTranslation } from '../../modules/NotFound'
import { ProfileTranslation } from '../../modules/Profile'
import { UploadedAssetTranslation } from '../../modules/UploadedAsset'
import { UploadedAssetsTranslation } from '../../modules/UploadedAssets'
import { UsersTranslation } from '../../modules/Users'
import { WalletConnectTranslation } from '../../modules/WalletConnect'
import { Locale, TranslationsMap } from './types'

const getTranslationsForLanguage = (namespace: string) => (locale: Locale) => pathOr({}, [locale, namespace])

const mergeTranslations = reduce(mergeDeepRight, { [Locale.en_GB]: {}, [Locale.de_DE]: {} })
const translationObject = mergeTranslations([
  SimulationDataTranslation,
  VisionTranslation,
  AddAssetsTranslation,
  AssetTranslation,
  AssetsTranslations,
  DashboardMembersTranslation,
  ErrorTranslation,
  FooterTranslation,
  HeaderTranslation,
  HeroHeaderTranslation,
  MemberTranslation,
  NotFoundTranslation,
  ProfileTranslation,
  UploadedAssetsTranslation,
  UploadedAssetTranslation,
  UsersTranslation,
  ReinventingMobilityTranslation,
  MintTranslation,
  WalletConnectTranslation,
]) as TranslationsMap

export const translation = (translations: TranslationsMap) => (namespace: string) => {
  const t = (key: string): React.ReactElement =>
    compose(propOr('', key), getTranslationsForLanguage(namespace)(Locale.en_GB))(translations) as React.ReactElement

  return { t }
}

export const useTranslation = translation(translationObject)
