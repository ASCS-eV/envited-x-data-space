export async function GET(request: Request) {
  try {
    return Response.json('hello dynamic world')
  } catch (error) {
    console.log('error', error)
    return Response.json(error)
  }
}

export const dynamic = 'force-dynamic'
