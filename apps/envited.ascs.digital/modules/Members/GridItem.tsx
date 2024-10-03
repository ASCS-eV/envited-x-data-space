'use client'

import { MemberProfileCard } from '@envited-marketplace/design-system'
import Link from 'next/link'
import React, { FC } from 'react'

import { getImageUrl } from '../../common/utils'

interface ItemProps {
  name: string
  slug: string
  logo: string
}

export const GridItem: FC<ItemProps> = ({ name, slug, logo }) => {
  return (
    <Link href={`/community/${slug}`}>
      <MemberProfileCard title={name} logoUri={getImageUrl(logo)} />
    </Link>
  )
}
