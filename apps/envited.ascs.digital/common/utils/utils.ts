import { RESPONSES } from '../constants'

export const ok = (data: any) => Response.json(data)

export const badRequest = (message: string | null = null) =>
  Response.json(message, { status: RESPONSES.badRequest.status, statusText: RESPONSES.badRequest.statusText })

export const internalServerError = () =>
  Response.json(null, {
    status: RESPONSES.internalServerError.status,
    statusText: RESPONSES.internalServerError.statusText,
  })

export const notFound = () =>
  Response.json(null, { status: RESPONSES.notFound.status, statusText: RESPONSES.notFound.statusText })

export const noContent = () =>
  new Response(null, { status: RESPONSES.noContent.status, statusText: RESPONSES.noContent.statusText })
