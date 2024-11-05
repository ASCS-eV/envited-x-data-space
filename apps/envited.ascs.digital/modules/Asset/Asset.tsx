'use client'

import { Tab } from '@headlessui/react'
import Link from 'next/link'
import { FC, Fragment } from 'react'

import { ButtonType, ColorScheme, Token } from '../../common/types'
import { Button } from '../Button'

const product = {
  name: 'Motorway Testfield A8 Heimsheim <-> Leonberg (XODR)',
  version: { name: '1.0', date: 'June 5, 2021', datetime: '2021-06-05' },
  sku: 'XODR-3DM-23001',
  price: '20 EUR',
  shortDescription:
    'A map section of the A8 highway from Heimsheim to Leonberg with a total length of 37.91 km. It was checked, validated and labeled with regard to the credibility levels defined in the UPSIM project. The road quality (asphalt) is good.',
  description:
    'The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.',
  highlights: ['OpenDRIVE', '15,15 MB', 'December 5, 2023'],
  type: 'OpenDRIVE',
  technologyPartner: '3D Mapping Solutions GmbH',
  fileSize: '15,18 MB',
  publishDate: 'Dec. 5, 2023',
  relatedTools: 'OddLOT (Tool) , COVISE (Tool)',
  fileFormat: 'OpenDRIVE',
  city: 'Munich',
  country: 'Germany',
  length: '>10km',
  roadSurface: 'Asphalt',
  streetName: 'Bundesautobahn A8',
  streetType: 'Highway/ Autobahn',
  trackType: 'Map',
  trafficManagement: 'Four lanes, Highway/ Autobahn Entry, Highway/ Autobahn Exit, Three lanes, Two lanes',
  miscellaneous: '-',
  sourceData: '-',
  directionOfTravel: 'both ways',
  crossSlope: 'No',
  environment: 'Not existing',
  resolution: '-',
  superelevation: 'Yes',
  imageSrc: 'https://envited.market/media/OpenDRIVE_A9_final_bO9LFP7.png',
  imageAlt: 'Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.',
}

const reviews = {
  featured: [
    {
      id: 1,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: 'July 16, 2021',
      datetime: '2021-07-16',
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 2,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: 'July 12, 2021',
      datetime: '2021-07-12',
      author: 'Hector Gibbons',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
  ],
}

const license = {
  href: '#',
  summary:
    'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
}

const products = [
  {
    id: 1,
    name: 'Motorway Testfield A8 Heimsheim <-> Leonberg (XODR)',
    href: '/assets/detail',
    description: 'A map section of the A8 highway from Heimsheim to Leonberg with a total length of 37.91 km. It was',
    options: 'XODR-3DM-23001',
    price: '20 EUR',
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
    price: '300 EUR',
    imageSrc: 'https://envited.market/media/Kachel_San_Francisco_unreal.png.500x320_q85_crop-scale.png',
    imageAlt: 'Front of plain black t-shirt.',
  },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface AssetProps {
  item: Token
}

export const Asset: FC<AssetProps> = ({ item }) => {
  return (
    <>
      <div>
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <img src={item.displayUri} alt={item.name} className="object-cover object-center" />
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl break-all">{item.name}</h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Version {product.version.name} (Updated{' '}
                  <time dateTime={product.version.datetime}>{product.version.date}</time>)
                </p>
              </div>

              <div>
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <p className="mt-2 text-sm text-gray-500">{item.id}</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{item.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4">
              <Button
                href={`mailto:example-asset@envited.de?subject=ENVITED X Request for offer: ${item.id}&body=Dear Sales Team,%0D%0DI'm interested in your product ${process.env.NEXTAUTH_URL}/${item.id}.%0DPlease get in touch with me with an offer.%0D%0DBest regards,`}
                type={ButtonType.block}
                colorScheme={ColorScheme.light}
                target="_blank"
              >
                Contact sales
              </Button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">File information</h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  {product.highlights.map(highlight => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">License</h3>
              <p className="mt-4 text-sm text-gray-500">
                {license.summary}{' '}
                <a href={license.href} className="font-medium text-blue-900 hover:text-blue-800">
                  Read full license
                </a>
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <Tab.Group as="div">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-blue-800 text-blue-800'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium outline-none',
                      )
                    }
                  >
                    Product details
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-blue-800 text-blue-800'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium outline-none',
                      )
                    }
                  >
                    KML Road Map
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-blue-800 text-blue-800'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium outline-none',
                      )
                    }
                  >
                    Google Road Map
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="text-sm text-gray-500">
                  <h3 className="sr-only">Product details</h3>
                  <div className="mt-0">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 pt-2">
                      <div className="border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">City</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.city}</dd>
                      </div>
                      <div className="border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Country</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.country}</dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Length</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.length}</dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Road surface</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.roadSurface}</dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Street name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.streetName}</dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Street type</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.streetType}</dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Technology partner</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.technologyPartner}</dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">File format</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.fileFormat}</dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Track type</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.trackType}</dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Traffic management</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.trafficManagement}</dd>
                      </div>
                    </dl>
                  </div>
                </Tab.Panel>

                <Tab.Panel className="pt-10">
                  <h3 className="sr-only">KML Road Map</h3>

                  <img
                    src="https://envited.market/gcmedia/serve/reference/3506/xl/0/streckea8.png"
                    className="w-full h-auto"
                  />
                </Tab.Panel>

                <Tab.Panel className="pt-10 -mb-10">
                  <h3 className="sr-only">Google Road Map</h3>

                  <iframe
                    src="https://www.google.com/maps/d/u/1/embed?mid=1nt7dEym9fom0bQQkX4JrEQF72Qk4FbE&amp;ehbc=2E312F&amp;noprof=1"
                    width="770"
                    height="400"
                    className="w-full h-96"
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-16 lg:max-w-none">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-lg font-medium text-gray-900">More assets from OpenDRIVE</h2>
          <a href="/assets" className="whitespace-nowrap text-sm font-medium text-blue-900 hover:text-blue-800">
            View all
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
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
                  <a
                    href={product.href}
                    className="whitespace-nowrap text-sm font-medium text-blue-900 hover:text-blue-800"
                  >
                    View
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
