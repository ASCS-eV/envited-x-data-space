export enum Language {
  nl = 'nl',
  en = 'en',
}

export interface TranslationsMap {
  [Language.en]: { [key: string]: { [key: string]: string } }
  [Language.nl]: { [key: string]: { [key: string]: string } }
}

export enum Columns {
  two = 'two',
  three = 'three',
  four = 'four',
  five = 'five',
}

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum ColorScheme {
  light = 'light',
  dark = 'dark',
}

export type Obj = { [key: string]: string | number }

export type Action<T> = {
  type: T
  data?: Obj
}

export interface IRole {
  id: string
  name: string
  description: string
}

export enum Role {
  admin = 'admin',
  user = 'user',
  principal = 'principal',
  federator = 'federator',
}

export enum CredentialType {
  AscsMember = 'AscsMember',
  AscsUser = 'AscsUser',
}

export interface Session {
  user: {
    pkh: string
    role?: string
  }
}
