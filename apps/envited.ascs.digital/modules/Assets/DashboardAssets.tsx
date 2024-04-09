'use client'

import { Heading } from '@envited-marketplace/design-system'
import Link from 'next/link'

import { ROUTES } from '../../common/constants/routes'

const products = [
  {
    id: 1,
    name: 'Motorway Testfield A8 Heimsheim <-> Leonberg (XODR)',
    href: '/assets/detail',
    description: 'A map section of the A8 highway from Heimsheim to Leonberg with a total length of 37.91 km. It was',
    options: 'XODR-3DM-23001',
    price: '20 xtz',
    imageSrc: 'https://envited.market/media/OpenDRIVE_A9_final_bO9LFP7.png.500x320_q85_crop-scale.png',
    imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: 2,
    name: 'San Francisco Sample (Unreal-Carla)',
    href: '/assets/detail',
    description:
      'San Francisco Union Square and adjacent streets. 3D Visualization of San Francisco HD maps, designed based on real-world OpenDRIVE data',
    options: 'CARLA-TGG-21001',
    price: '300 xtz',
    imageSrc: 'https://envited.market/media/Kachel_San_Francisco_unreal.png.500x320_q85_crop-scale.png',
    imageAlt: 'Front of plain black t-shirt.',
  },
]

export const DashboardAssets = () => {
  return (
    <>
      <div className="flex justify-between mb-6 pb-6 border-b">
        <Heading importance="h3">Assets</Heading>
        <Link
          href={ROUTES.DASHBOARD.ADD_ASSETS}
          className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 text-xs sm:text-sm disabled:opacity-50 font-bold leading-none transition duration-300 ease-in-out rounded-md"
        >
          Add assets
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
        {products.map(product => (
          <div
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="aspect-h-3 aspect-w-4 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-48">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-48 w-full object-cover object-center sm:h-48 sm:w-full"
              />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
              <p className="text-sm italic text-gray-500">{product.options}</p>
              <h3 className="text-sm font-medium text-gray-900">
                <a href={product.href}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <div className="flex justify-between pt-4">
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                <a
                  href={product.href}
                  className="whitespace-nowrap text-sm font-medium text-blue-900 hover:text-blue-800"
                >
                  View all
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
