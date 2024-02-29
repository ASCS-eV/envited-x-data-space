'use client'

import { Address, Card, ContactPerson, Heading, Pill } from '@envited-marketplace/design-system'
import { has, isNil, map, prop, propOr } from 'ramda'
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
        {!isNil(member.offerings) && (
          <Card>
            <Heading importance="h4">{t('[Heading] offerings')}</Heading>
            {map(({ name, type, functionalities, supportedTools, supportedStandards }) => (
              <div className="mt-4">
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">{name}</h3>
                </div>
                <div className="mt-6 border-t border-gray-100 dark:border-gray-800">
                  <dl className="divide-y divide-gray-100 dark:divide-gray-800">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-500">
                        {t('[Heading] offering type')}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
                        {map((item: string) => <Pill key={item}>{item}</Pill>)(type.split(';') as [])}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-500">
                        {t('[Heading] offering functionalities')}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
                        {functionalities}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-500">
                        {t('[Heading] offering supported tools')}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
                        {supportedTools}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-500">
                        {t('[Heading] offering supported standards')}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
                        {supportedStandards}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))(propOr([], 'offerings')(member))}
          </Card>
        )}
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
        {!isNil(prop('salesName')(member)) && has('salesEmail')(member) && has('salesPhone')(member) && (
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
