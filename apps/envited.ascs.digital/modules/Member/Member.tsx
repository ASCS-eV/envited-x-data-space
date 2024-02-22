'use client'

import { Address, Card, ContactPerson, Heading, Pill } from '@envited-marketplace/design-system'
import { has, isNil, map, propOr } from 'ramda'
import React, { FC } from 'react'

import { useTranslation } from '../../common/i18n'
import { Profile } from '../../common/types'

interface MemberProps {
  member: Profile
}
export const Member: FC<MemberProps> = ({ member }) => {
  const { t } = useTranslation('Member')

  return (
    <div className="flex gap-x-8">
      <div className="w-3/4 flex flex-col gap-8">
        <Card>
          <Heading importance="h4">{t('[Heading] member profile')}</Heading>
          <Heading importance="h2">{propOr('', 'name')(member)}</Heading>
          <div className="">
            <Heading importance="h4">{t('[Heading] business categories')}</Heading>
            <div className="flex gap-3 mt-2">
              {map((categorie: string) => <Pill key={categorie}>{categorie}</Pill>)(['OEM', 'Supplier'])}
            </div>
          </div>
          <div className="mt-6">
            <Heading importance="h4">{t('[Heading] about us')}</Heading>
            <div className="flex gap-3 mt-2">{propOr('', 'description')(member)}</div>
          </div>
        </Card>
      </div>
      <div className="w-1/4 flex flex-col gap-8">
        <Card>
          {!isNil(propOr('', 'logo')(member)) && (
            <img
              src={propOr('', 'logo')(member)}
              alt={propOr('', 'name')(member)}
              width={0}
              height={0}
              className="w-full h-auto mb-6"
            />
          )}
          <Heading importance="h4">{t('[Heading] address')}</Heading>
          <div className="mt-4">
            <Address
              street={propOr('', 'streetAddress')(member)}
              postalCode={propOr('', 'postalCode')(member)}
              city={propOr('', 'addressLocality')(member)}
              country={propOr('', 'addressCountry')(member)}
              website={propOr('', 'website')(member)}
            />
          </div>
        </Card>
        {has('principalName')(member) && has('principalEmail')(member) && has('principalPhone')(member) && (
          <Card>
            <Heading importance="h4">{t('[Heading] principal contact')}</Heading>
            <div className="mt-4">
              <ContactPerson
                name={propOr('', 'principalName')(member)}
                email={propOr('', 'principalEmail')(member)}
                phone={propOr('', 'principalPhone')(member)}
              />
            </div>
          </Card>
        )}
        {has('salesName')(member) && has('salesEmail')(member) && has('salesPhone')(member) && (
          <Card>
            <Heading importance="h4">{t('[Heading] sales contact')}</Heading>
            <div className="mt-4">
              <ContactPerson
                name={propOr('', 'salesName')(member)}
                email={propOr('', 'salesEmail')(member)}
                phone={propOr('', 'salesPhone')(member)}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
