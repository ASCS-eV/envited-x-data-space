import { useTranslation } from '../../../common/i18n'

export const SimulationData = () => {
  const { t } = useTranslation('SimulationData')

  return (
    <div>
      <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20 h-96">
        <img
          src="/AdobeStock_571252297_metamorworks.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:max-w-7xl lg:px-8 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('[Heading] simulation data')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('[Description] simulation data')}</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('[Description] simulation data invite')}</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              <a className="underline text-blue cursor-pointer">{t('[Button] learn more')}</a>
            </p>
          </div>
          <div className="mx-auto max-w-2xl lg:max-w-4xl mt-12">
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-gray-900">
              {t('[Heading] start your journey')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('[Description] start your journey')}</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              <a className="underline text-blue cursor-pointer">{t('[Button] join us')}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
