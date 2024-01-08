import { NextResponse } from 'next/server'

import { RESPONSES } from '../constants'

export const ok = (response: NextResponse) => result => response.json(result)

export const badRequest = (response: NextResponse) => response.json({ status: 403, statusText: RESPONSES.BAD_REQUEST })

export const internalServerError = () => Response.json({ status: 500, statusText: RESPONSES.INTERNAL_SERVER_ERROR })

export const notFound = () => Response.json({ status: 404, statusText: RESPONSES.NOT_FOUND })

export const noContent = () => Response.json({ status: 205, statusText: RESPONSES.NO_CONTENT })
