'use client'

import { MemberProfileCard } from '@envited-x-data-space/design-system'
import Link from 'next/link'
import { isNil } from 'ramda'
import React, { FC } from 'react'

import { getImageUrl } from '../../common/utils'

interface ItemProps {
  name: string
  slug: string
  logo: string
}

export const GridItem: FC<ItemProps> = ({ name, slug, logo }) => {
  return (
    !isNil(logo) && (
      <Link href={`/community/${slug}`}>
        <MemberProfileCard title={name} logoUri={getImageUrl(logo)} />
      </Link>
    )
  )
}
