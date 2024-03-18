import { compose, head, join, juxt, pipe, replace, slice, tail, toUpper } from 'ramda'

export const formatBreadcrumbLabel = compose(replace('-', ' '), join(''), juxt([compose(toUpper, head), tail]))

export const formatBreadcrumbUri = (items: string[]) => (index: number) =>
  pipe(slice(0, index + 1), join('/'), (x: string) => `/${x}`)(items)
