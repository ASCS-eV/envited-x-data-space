import React, { FC, ReactElement } from 'react'

import { Address } from '../Address'

interface MemberProfileCardProps {
  title: string
  logoUri: string
  street: string
  city: string
  postalCode: string
  country: string
  businessCategories: ReactElement<any, any>
}

const MemberProfileCard: FC<MemberProfileCardProps> = ({
  title,
  logoUri,
  street,
  city,
  postalCode,
  country,
  businessCategories,
}) => {
  return (
    <div className="flex flex-col border rounded-2xl max-w-xl overflow-hidden ring-0 focus:ring focus:ring-orange-50 hover:shadow h-full bg-white dark:bg-gray-900 dark:border-transparent dark:border-gray-800">
      <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex justify-center items-center overflow-hidden relative h-48">
        <img src={logoUri} alt={title} className="w-full h-full object-center object-contain px-4" />
        <div className="absolute block w-full h-full top-0 left-0" />
      </div>
      <div className="min-w-0 relative flex flex-auto flex-col p-5 sm:p-5 items-start">
        <h2 className="text-xl sm:text-xl font-extrabold mt-4 mb-2">{title}</h2>
        <div className="mt-2">
          <Address street={street} city={city} postalCode={postalCode} country={country} />
        </div>
        {businessCategories && (
          <div className="mt-6">
            <h3 className="text-xs font-normal dark:text-gray-500">Business Categories</h3>
            <div className="flex gap-3 mt-2">{businessCategories}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MemberProfileCard
