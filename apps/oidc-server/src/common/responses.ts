export const ok = (message: any) => ({
  statusCode: 200,
  body: JSON.stringify({ message }),
})

export const internalServerError = (message: string) => ({
  statusCode: 500,
  body: JSON.stringify({ message }),
})
