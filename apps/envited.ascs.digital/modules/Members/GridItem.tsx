'use client'

import { MemberProfileCard, Pill } from '@envited-marketplace/design-system'
import Link from 'next/link'
import { map } from 'ramda'
import React, { FC } from 'react'

interface ItemProps {
  name: string
  slug: string
  logo: string
  street: string
  city: string
  postalCode: string
  country: string
  businessCategories?: string[]
}

export const GridItem: FC<ItemProps> = ({
  name,
  slug,
  logo,
  street,
  city,
  postalCode,
  country,
  businessCategories = [],
}) => {
  return (
    <Link href={`/members/${slug}`}>
      <MemberProfileCard
        title={name}
        logoUri={logo}
        street={street}
        city={city}
        postalCode={postalCode}
        country={country}
        businessCategories={<>{map((category: string) => <Pill>{category}</Pill>)(businessCategories)}</>}
      />
    </Link>
  )
}
