import { useTranslation } from '../../../common/i18n'
import { ColorScheme } from '../../../common/types'
import { Button } from '../../Button'

export const ReinventingMobility = () => {
  const { t } = useTranslation('ReinventingMobility')

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b to-gray-900 from-blue-900/40 pt-14 bg-gray-900">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-gray-900 shadow-xl shadow-blue-900 ring-1 ring-blue-900 sm:-mr-80 lg:-mr-96"
      />
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:col-span-2 xl:col-auto">
            {t('[Heading] reinventing mobility')}
          </h3>
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p className="text-lg leading-8 text-gray-400">{t('[Description] reinventing mobility')}</p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button href={'/assets'} colorScheme={ColorScheme.dark}>
                {t('[Button] dive into our offerings')}
              </Button>
            </div>
          </div>
          <img
            src="/images/AdobeStock_892645802_Aisha.jpeg"
            alt=""
            className="mt-10 aspect-[6/5] w-full max-w-lg rounded-xl object-cover lg:mt-0 xl:row-span-2 xl:row-end-2 justify-self-end"
          />
        </div>
      </div>
    </div>
  )
}
