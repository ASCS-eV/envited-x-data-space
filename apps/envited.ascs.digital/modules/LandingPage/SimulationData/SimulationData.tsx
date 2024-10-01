import { useTranslation } from '../../../common/i18n'

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
                <a className="rounded-md bg-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800">
                  {t('[Button] learn more')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl py-24 sm:py-24 sm:px-6 lg:px-8">
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
          <div className="mx-auto text-center lg:mx-0 lg:flex-auto lg:py-20">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('[Heading] start your journey')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">{t('[Description] start your journey')}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {/* <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t('[Button] join us')}
              </a> */}
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                {t('[Button] join us')} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20 h-96">
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
              <a className="rounded-md bg-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800">{t('[Button] learn more')}</a>
            </p>
          </div>
          <div className="mx-auto max-w-2xl lg:max-w-4xl mt-12">
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-gray-900">
              {t('[Heading] start your journey')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('[Description] start your journey')}</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              <a className="rounded-md bg-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800">{t('[Button] join us')}</a>
            </p>
          </div>
        </div>
      </div> */}
    </>
  )
}
