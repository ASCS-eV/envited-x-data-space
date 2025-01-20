export enum Locale {
  de_DE = 'DE',
  en_GB = 'EN',
}

export type TranslationsMap = {
  [key in Locale]: { [key: string]: { [key: string]: string } }
}
