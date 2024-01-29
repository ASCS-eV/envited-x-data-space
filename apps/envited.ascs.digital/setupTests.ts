import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'util'

Object.assign(global, { TextDecoder, TextEncoder })

const testCache = <T extends Function>(func: T) => func

jest.mock('react', () => {
  const originalModule = jest.requireActual('react')
  return {
    ...originalModule,
    cache: testCache,
  }
})

