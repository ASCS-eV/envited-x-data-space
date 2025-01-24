export interface Log {
  info: typeof console.info
  warn: typeof console.warn
  error: typeof console.error
}

export const log = {
  info: console.info,
  warn: console.warn,
  error: console.error,
}
