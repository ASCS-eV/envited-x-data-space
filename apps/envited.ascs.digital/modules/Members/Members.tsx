'use client'

import { GridRow } from '@envited-marketplace/design-system'
import { map } from 'ramda'
import React, { FC } from 'react'

import { GridItem } from './GridItem'

interface MembersProps {
  members: []
}

export const Members: FC<MembersProps> = ({ members }) => {
  return (
    <GridRow columns={`four` as any}>
      {map(
        ({
          name,
          slug,
          logo,
          streetAddress,
          addressLocality,
          postalCode,
          addressCountry,
        }: {
          name: string
          slug: string
          logo: string
          streetAddress: string
          addressLocality: string
          postalCode: string
          addressCountry: string
        }) => {
          return (
            <GridItem
              key={slug}
              name={name}
              slug={slug}
              logo={logo}
              street={streetAddress}
              city={addressLocality}
              postalCode={postalCode}
              country={addressCountry}
              businessCategories={['OEM', 'Supplier']}
            />
          )
        },
      )(members)}
    </GridRow>
  )
}
