import { useTranslation } from '../../../common/i18n'

export const Vision = () => {
  const { t } = useTranslation('Vision')

  return (
    <div>
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        <video
          src="#"
          autoPlay
          loop
          muted
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
        ></video>
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
      <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:max-w-7xl lg:px-8 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('[Heading] empowering innovators')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('[Description] empowering innovators')}</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              <a className="underline text-blue cursor-pointer">{t('[Button] learn more')}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
