export const unauthorized = () => new Error('Unauthorized')

export const badRequest = (message: string) => new Error(`BAD_REQUEST::403::${message}`)

export const internalServerError = () => new Error('Internal Server Error')

export const notFound = () => new Error('Not Found')

export const error = () => new Error('Something went wrong')
