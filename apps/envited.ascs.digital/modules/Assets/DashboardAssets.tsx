'use client'

import { Heading } from '@envited-marketplace/design-system'
import Link from 'next/link'
import { map } from 'ramda'
import { FC } from 'react'

import { ROUTES } from '../../common/constants/routes'
import { Token } from '../../common/types'

interface AssetsProps {
  items: Token[]
}

export const DashboardAssets: FC<AssetsProps> = ({ items }) => {
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
        {map(
          ({
            id,
            hash,
            createdAt,
            contract,
            minter,
            tokenId,
            displayUri,
            tokenMetadata,
            name,
            description,
            creators,
            publishers,
            date,
            type,
            rights,
            rightsUri,
            language,
            artifactUri,
            identifier,
            externalUri,
            modifiedAt,
          }: Token) => (
            <div
              key={id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-3 aspect-w-4 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-48">
                <img src={displayUri} alt={name} className="h-48 w-full object-cover object-center sm:h-48 sm:w-full" />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <p className="text-sm italic text-gray-500">{id}</p>
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={`/assets/${id}`} className="break-all">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {name}
                  </a>
                </h3>
                <p className="text-sm text-gray-500">{description}</p>
                <div className="flex justify-between pt-4">
                  <a
                    href={`/assets/${id}`}
                    className="whitespace-nowrap text-sm font-medium text-blue-900 hover:text-blue-800"
                  >
                    View
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          ),
        )(items)}
      </div>
    </>
  )
}
