'use client'

import { Address, ContactPerson, Pill } from '@envited-marketplace/design-system'
import { Tab } from '@headlessui/react'
import { isNil, map, propOr } from 'ramda'
import React, { FC, Fragment } from 'react'

import { useTranslation } from '../../common/i18n'
import { Profile } from '../../common/types'
import { getImageUrl } from '../../common/utils'

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

interface MemberProps {
  member: Profile
}
export const Member: FC<MemberProps> = ({ member }) => {
  const { t } = useTranslation('Member')

  return (
    <>
      <div>
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {propOr('', 'name')(member)}
                </h1>
              </div>
            </div>

            <p className="mt-6 text-sm leading-6 text-gray-700">{propOr('', 'description')(member)}</p>
          </div>

          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-20 lg:max-w-none w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 space-x-8">
              <div className="">
                <h3 className="text-sm font-medium text-gray-900">{t('[Heading] address')}</h3>
                <div className="mt-4">
                  <Address
                    street={propOr('', 'streetAddress')(member)}
                    postalCode={propOr('', 'postalCode')(member)}
                    city={propOr('', 'addressLocality')(member)}
                    country={propOr('', 'addressCountry')(member)}
                    website={propOr('', 'website')(member)}
                  />
                </div>
              </div>

              <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                {!isNil(propOr('', 'logo')(member)) && (
                  <img
                    src={getImageUrl(propOr('', 'logo')(member))}
                    alt={propOr('', 'name')(member)}
                    width={0}
                    height={0}
                    className="w-full h-full object-contain object-center p-4"
                  />
                )}
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">{t('[Heading] business categories')}</h3>
              <div className="flex gap-3 mt-4">
                {map(({ businessCategoryId }) => <Pill key={businessCategoryId}>{businessCategoryId}</Pill>)(
                  propOr([], 'businessCategories')(member),
                )}
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 space-x-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{t('[Heading] principal contact')}</h3>
                  <div className="mt-4">
                    <ContactPerson
                      name={propOr('', 'principalName')(member)}
                      email={propOr('', 'principalEmail')(member)}
                      phone={propOr('', 'principalPhone')(member)}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{t('[Heading] sales contact')}</h3>
                  <div className="mt-4">
                    <ContactPerson
                      name={propOr('', 'salesName')(member)}
                      email={propOr('', 'salesEmail')(member)}
                      phone={propOr('', 'salesPhone')(member)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <h2 className="text-lg font-medium tracking-tight text-gray-900">{t('[Heading] offerings')}</h2>
            <Tab.Group as="div">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8">
                  {!isNil(member.offerings) &&
                    map(({ name }) => (
                      <Tab
                        key={name}
                        className={({ selected }) =>
                          `
                        ${
                          selected
                            ? 'border-blue-800 text-blue-800'
                            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800'
                        }
                        whitespace-nowrap border-b-2 py-6 text-sm font-medium outline-none
                      `
                        }
                      >
                        {name}
                      </Tab>
                    ))(propOr([], 'offerings')(member))}
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                {!isNil(member.offerings) &&
                  map(({ name, type, functionalities, supportedTools, supportedStandards }) => (
                    <Tab.Panel key={name} className="text-sm text-gray-500">
                      <h3 className="sr-only">{name}</h3>
                      <div className="mt-0">
                        <dl className="grid grid-cols-1 sm:grid-cols-1 pt-2">
                          <div className="border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              {t('[Heading] offering type')}
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2 inline-flex space-x-2">
                              {map((item: string) => <Pill key={item}>{item}</Pill>)(type.split(';') as [])}
                            </dd>
                          </div>
                          <div className="border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              {t('[Heading] offering functionalities')}
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{functionalities}</dd>
                          </div>
                          <div className="border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              {t('[Heading] offering supported tools')}
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2 space-x-2">
                              {map((item: string) => <Pill key={item}>{item}</Pill>)(supportedTools.split(';') as [])}
                            </dd>
                          </div>
                          <div className="border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              {t('[Heading] offering supported standards')}
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2 space-x-2">
                              {map((item: string) => <Pill key={item}>{item}</Pill>)(
                                supportedStandards.split(';') as [],
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </Tab.Panel>
                  ))(propOr([], 'offerings')(member))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-16 lg:max-w-none">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-lg font-medium text-gray-900">Assets from {propOr('', 'name')(member)}</h2>
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
      </div>
    </>
  )
}
