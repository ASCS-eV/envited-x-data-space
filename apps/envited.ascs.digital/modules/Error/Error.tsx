import Link from 'next/link'
import { FC } from 'react'

import { useTranslation } from '../../common/i18n'

export const Error: FC = () => {
  const { t } = useTranslation('Error')

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-blue">{t('[Heading] error')}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t('[Heading] something went wrong')}
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/">
            {t('[Button] home')} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
