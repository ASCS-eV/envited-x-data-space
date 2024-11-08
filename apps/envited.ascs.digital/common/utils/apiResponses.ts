import { RESPONSES } from '../constants'

export const ok = (data: any) => Response.json(data)

export const badRequest = () =>
  Response.json(null, { status: RESPONSES.badRequest.status, statusText: RESPONSES.badRequest.statusText })

export const internalServerError = () =>
  Response.json(null, {
    status: RESPONSES.internalServerError.status,
    statusText: RESPONSES.internalServerError.statusText,
  })

export const notFound = () =>
  Response.json(null, { status: RESPONSES.notFound.status, statusText: RESPONSES.notFound.statusText })

export const noContent = () =>
  new Response(null, { status: RESPONSES.noContent.status, statusText: RESPONSES.noContent.statusText })

export const unauthorized = () =>
  new Response(null, { status: RESPONSES.unauthorized.status, statusText: RESPONSES.unauthorized.statusText })
