'use client'

import { Address, Card, ContactPerson, Heading, Pill } from '@envited-marketplace/design-system'
import { isNil, map } from 'ramda'
import React, { FC } from 'react'

import { useTranslation } from '../../common/i18n'

interface MemberProps {
  name: string
  description: string
  logo: string
  website: string
  streetAddress: string
  addressCountry: string
  addressLocality: string
  postalCode: string
  salesEmail: string | null
  salesName: string | null
  salesPhone: string | null
  principalEmail: string | null
  principalName: string | null
  principalPhone: string | null
}

export const Member: FC<MemberProps> = ({
  name,
  description,
  logo,
  website,
  streetAddress,
  addressCountry,
  addressLocality,
  postalCode,
  salesEmail,
  salesName,
  salesPhone,
  principalEmail,
  principalName,
  principalPhone,
}) => {
  const { t } = useTranslation('Member')

  return (
    <div className="flex gap-x-8">
      <div className="w-3/4 flex flex-col gap-8">
        <Card>
          <Heading importance="h4">{t('[Heading] member profile')}</Heading>
          <Heading importance="h2">{name}</Heading>
          <div className="">
            <Heading importance="h4">{t('[Heading] business categories')}</Heading>
            <div className="flex gap-3 mt-2">
              {map((categorie: string) => <Pill key={categorie}>{categorie}</Pill>)(['OEM', 'Supplier'])}
            </div>
          </div>
          <div className="mt-6">
            <Heading importance="h4">{t('[Heading] about us')}</Heading>
            <div className="flex gap-3 mt-2">{description}</div>
          </div>
        </Card>
      </div>
      <div className="w-1/4 flex flex-col gap-8">
        <Card>
          {!isNil(logo) && <img src={logo} alt={name} width={0} height={0} className="w-full h-auto mb-6" />}
          <Heading importance="h4">{t('[Heading] address')}</Heading>
          <div className="mt-4">
            <Address
              street={streetAddress}
              postalCode={postalCode}
              city={addressLocality}
              country={addressCountry}
              website={website}
            />
          </div>
        </Card>
        {principalName && principalEmail && principalPhone && (
          <Card>
            <Heading importance="h4">{t('[Heading] principal contact')}</Heading>
            <div className="mt-4">
              <ContactPerson name={principalName} email={principalEmail} phone={principalPhone} />
            </div>
          </Card>
        )}
        {salesName && salesEmail && salesPhone && (
          <Card>
            <Heading importance="h4">{t('[Heading] sales contact')}</Heading>
            <div className="mt-4">
              <ContactPerson name={salesName} email={salesEmail} phone={salesPhone} />
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
