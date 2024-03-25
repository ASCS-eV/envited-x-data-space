import { parseJSON } from 'date-fns'
import {
  __,
  divide,
  equals,
  flip,
  gt,
  join,
  lt,
  multiply,
  pipe,
  propSatisfies,
  replace,
  splitEvery,
  subtract,
  take,
  takeLast,
  when,
} from 'ramda'

export const formatNumber = (number: number) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number)

export const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

export const isServer = () => typeof window === 'undefined'

export const isUp = (number: number) => number >= 0

export const formatPercentage = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number)

export const formatAmount = (number: number) =>
  new Intl.NumberFormat(
    'en-US',
    gt(number)(1) || lt(number)(-1)
      ? {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }
      : {
          minimumFractionDigits: 2,
          maximumSignificantDigits: 2,
        },
  ).format(number)

export const truncate = (length: number) =>
  when(
    propSatisfies(gt(__, length), 'length'),
    pipe((x: string) => [take(5, x), takeLast(3, x)], join('…')),
  )

export const getISODate = (date: string) => parseJSON(date).toISOString()

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(getISODate(date)),
  )

export const formatDateTime = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(getISODate(date)))

export const formatShortDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
    new Date(getISODate(date)),
  )

export const ipfsToHttps = replace('ipfs://', process.env.NEXT_PUBLIC_APP_IPFS_URI || 'https://ipfs.io/ipfs/')

export const calculateProfitPercentage = (currentValue: number) => pipe(flip(divide)(currentValue), flip(subtract)(1))

export const chunkString = splitEvery

export const verifiedValidAddress = equals(3)

export const bytesToMegaBytes = pipe(flip(divide)(multiply(1024, 1024)), x => x.toFixed(2))
