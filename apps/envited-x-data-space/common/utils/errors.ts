import { assoc, propOr } from 'ramda'

import { ERRORS } from '../constants'
import { ERROR_CODES } from '../constants/errors'

export class ExtendedError extends Error {
  code: number | undefined
  resource: string | undefined
  resourceId: string | number | undefined
  userId: string | undefined
}

class UnauthorizedError extends ExtendedError {
  constructor({
    resource,
    resourceId,
    message,
    userId,
  }: {
    resource: string
    resourceId?: string | number
    message: string
    userId?: string
  }) {
    super(message)
    this.name = 'UnauthorizedError'
    this.code = ERROR_CODES.UNAUTHORIZED
    this.resource = resource
    this.resourceId = resourceId
    this.userId = userId
  }
}
class BadRequestError extends ExtendedError {
  constructor({
    resource,
    resourceId,
    message,
    userId,
  }: {
    resource: string
    resourceId?: string | number
    message: string
    userId?: string
  }) {
    super(message)
    this.name = 'BadRequestError'
    this.code = ERROR_CODES.BAD_REQUEST
    this.resource = resource
    this.resourceId = resourceId
    this.userId = userId
  }
}

class ForbiddenError extends ExtendedError {
  constructor({
    resource,
    resourceId,
    message,
    userId,
  }: {
    resource: string
    resourceId?: string | number
    message: string
    userId?: string
  }) {
    super(message)
    this.name = 'ForbiddenError'
    this.code = ERROR_CODES.BAD_REQUEST
    this.resource = resource
    this.resourceId = resourceId
    this.userId = userId
  }
}

class NotFoundError extends ExtendedError {
  constructor({
    resource,
    resourceId,
    message,
    userId,
  }: {
    resource: string
    resourceId?: string | number
    message: string
    userId?: string
  }) {
    super(message)
    this.name = 'NotFoundError'
    this.resource = resource
    this.resourceId = resourceId
    this.code = ERROR_CODES.BAD_REQUEST
    this.userId = userId
  }
}

class InternalServerError extends ExtendedError {
  constructor(message: string) {
    super(message)
    this.name = 'InternalServerError'
    this.code = ERROR_CODES.INTERNAL_SERVER_ERROR
  }
}

export const formatError = (error: unknown) => {
  const errorMessage = {
    message: propOr('Unknown error message', 'message')(error),
    name: propOr('Unknown error name', 'name')(error),
  }
  if (error instanceof ExtendedError) {
    assoc('code', error.code)(errorMessage)
  }

  return errorMessage
}

export const unauthorized = ({
  resource,
  resourceId,
  userId,
}: {
  resource: string
  resourceId?: string | number
  userId?: string
}) => new UnauthorizedError({ resource, resourceId, message: ERRORS.UNAUTHORIZED, userId })

export const badRequest = ({
  resource,
  resourceId,
  message,
  userId,
}: {
  resource: string
  resourceId?: string | number
  message: string
  userId?: string
}) => new BadRequestError({ resource, resourceId, message, userId })

export const forbidden = ({
  resource,
  resourceId,
  message,
  userId,
}: {
  resource: string
  resourceId?: string | number
  message: string
  userId?: string
}) => new ForbiddenError({ resource, resourceId, message, userId })

export const internalServerError = () => new InternalServerError(ERRORS.INTERNAL_SERVER_ERROR)

export const notFound = ({
  resource,
  resourceId,
  userId,
}: {
  resource: string
  resourceId?: string | number
  userId?: string
}) => new NotFoundError({ resource, resourceId, message: ERRORS.NOT_FOUND, userId })
