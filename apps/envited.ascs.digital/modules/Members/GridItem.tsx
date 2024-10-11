'use client'

import { MemberProfileCard } from '@envited-marketplace/design-system'
import Link from 'next/link'
import React, { FC } from 'react'

import { getImageUrl } from '../../common/utils'
import { isNil } from 'ramda'

interface ItemProps {
  name: string
  slug: string
  logo: string
}

export const GridItem: FC<ItemProps> = ({ name, slug, logo }) => {
  return !isNil(logo) && (
    <Link href={`/community/${slug}`}>
      <MemberProfileCard title={name} logoUri={getImageUrl(logo)} />
    </Link>
  )
}
