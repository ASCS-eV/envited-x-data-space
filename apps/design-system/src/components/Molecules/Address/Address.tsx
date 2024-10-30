import { BuildingOffice2Icon, EnvelopeIcon, LinkIcon, PhoneIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'

interface AddressProps {
  street: string
  city: string
  postalCode: string
  country: string
  website?: string
  phone?: string
  email?: string
}

const Address: FC<AddressProps> = ({
  street,
  city,
  postalCode,
  country,
  website = null,
  phone = null,
  email = null,
}) => {
  return (
    <dl className="space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
      <div className="flex gap-x-4">
        <dt className="flex-none">
          <span className="sr-only">Address</span>
          <BuildingOffice2Icon className="h-7 w-6 text-gray-400" aria-hidden="true" />
        </dt>
        <dd>
          {street}
          <br />
          {city}, {postalCode}
          <br />
          {country}
        </dd>
      </div>
      {website && (
        <div className="flex gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Website</span>
            <LinkIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
          </dt>
          <dd>
            <a className="text-gray-400 hover:text-black" href={website}>
              {website}
            </a>
          </dd>
        </div>
      )}
      {phone && (
        <div className="flex gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Telephone</span>
            <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
          </dt>
          <dd>
            <a className="text-gray-400 hover:text-black" href={`tel:${phone}`}>
              {phone}
            </a>
          </dd>
        </div>
      )}
      {email && (
        <div className="flex gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Email</span>
            <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
          </dt>
          <dd>
            <a className="text-gray-400 hover:text-black" href={`mailto:${email}`}>
              {email}
            </a>
          </dd>
        </div>
      )}
    </dl>
  )
}

export default Address
