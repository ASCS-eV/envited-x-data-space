import { EnvelopeIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'

interface ContactPersonProps {
  name: string
  phone?: string
  email?: string
}

const ContactPerson: FC<ContactPersonProps> = ({ name, phone = null, email = null }) => {
  return (
    <dl className="space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
      <div className="flex gap-x-4">
        <dt className="flex-none">
          <span className="sr-only">Address</span>
          <UserIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
        </dt>
        <dd>{name}</dd>
      </div>
      {phone && (
        <div className="flex gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Telephone</span>
            <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
          </dt>
          <dd>
            <a className="hover:text-white" href={`tel:${phone}`}>
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
            <a className="hover:text-white" href={`mailto:${email}`}>
              {email}
            </a>
          </dd>
        </div>
      )}
    </dl>
  )
}

export default ContactPerson
