import Link from 'next/link'
import { FC } from 'react'

import { useTranslation } from '../../common/i18n'

export const NotFound: FC = () => {
  const { t } = useTranslation('NotFound')

  return (
    <>
      <div className="isolate overflow-hidden bg-gray-900 h-screen">
        <div className="mx-auto max-w-7xl px-6 pb-48 pt-24 text-center sm:pt-48 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-base font-semibold leading-7 text-blue-800">{t('[Heading] 404')}</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {t('[Heading] page not found')}
            </p>
          </div>
          <div className="relative mt-6">
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/" className="text-white">
                {t('[Button] home')} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <svg
              viewBox="0 0 1208 1024"
              className="absolute -top-10 left-1/2 -z-10 h-[80rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
            >
              <ellipse cx={604} cy={512} rx={604} ry={512} fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)" />
              <defs>
                <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                  <stop stopColor="#798bb3" />
                  <stop offset={1} stopColor="#848ab7" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      {/* <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-blue">{t('[Heading] 404')}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t('[Heading] page not found')}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">{t('[Heading] something went wrong')}</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/">
              {t('[Button] home')} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main> */}
    </>
  )
}
