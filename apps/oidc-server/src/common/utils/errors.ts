export class ExtendedError extends Error {
  code?: number
  resource?: string
  resourceId?: string | number
  userId?: string
}
