import * as jose from 'jose'

export const importJWK = jose.importJWK
export const signJWT = (payload: jose.JWTPayload) => new jose.SignJWT(payload)
