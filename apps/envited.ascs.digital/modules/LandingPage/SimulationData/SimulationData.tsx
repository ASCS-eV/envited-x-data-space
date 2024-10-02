import { useTranslation } from '../../../common/i18n'
import { ColorScheme } from '../../../common/types'
import { Button } from '../../Button'

export const SimulationData = () => {
  const { t } = useTranslation('SimulationData')

  return (
    <>
      <div className="py-24 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <img
              alt=""
              src="/images/AdobeStock_571252297_metamorworks.jpg"
              className="relative overflow-hidden rounded-3xl lg:max-w-lg h-full object-cover"
            />
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('[Heading] simulation data')}
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">{t('[Description] simulation data')}</p>
                <p className="mt-8">{t('[Description] simulation data invite')}</p>
              </div>
              <div className="mt-10 flex">
                <Button href={'/community'}>{t('[Button] our community')}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl py-0 sm:py-24 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[80rem] w-[80rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#798bb3" />
                <stop offset={1} stopColor="#798bb3" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto text-center pb-16 lg:mx-0 lg:flex-auto lg:py-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('[Heading] start your journey')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">{t('[Description] start your journey')}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button href={'/onboarding'} colorScheme={ColorScheme.dark}>
                {t('[Button] join us')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
