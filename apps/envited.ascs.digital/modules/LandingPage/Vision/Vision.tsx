import Link from 'next/link'

import { useTranslation } from '../../../common/i18n'

export const Vision = () => {
  const { t } = useTranslation('Vision')

  return (
    <div>
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        <iframe
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none aspect-video"
          src="https://www.youtube.com/embed/nvkmMvjVDIE?playlist=nvkmMvjVDIE&loop=1&autoplay=1&mute=1&controls=0"
          allow="autoplay"
        />
        <div className="absolute top-0 z-10 h-full w-full bg-black opacity-60" />
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl py-32">
            <div className="">
              <h2 className="text-base font-semibold leading-7 text-blue">{t('[Heading] our vision')}</h2>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {t('[SubHeading] our vision')}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">{t('[Description] our vision')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-900/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/5 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              {t('[Heading] empowering innovators')}
            </h3>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">{t('[Description] empowering innovators')}</p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href={'/mission'}
                  className="rounded-md bg-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                >
                  {t('[Button] learn more')}
                </Link>
              </div>
            </div>
            <img
              alt=""
              src="/images/AdobeStock_571252297_metamorworks.jpg"
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
      {/* <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:max-w-7xl lg:px-8 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('[Heading] empowering innovators')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('[Description] empowering innovators')}</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              <Link href={'/mission'} className="underline text-blue cursor-pointer">
                {t('[Button] learn more')}
              </Link>
            </p>
          </div>
        </div>
      </div> */}
    </div>
  )
}
