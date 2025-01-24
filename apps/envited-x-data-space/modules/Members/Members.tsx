'use client'

import { GridRow } from '@envited-x-data-space/design-system'
import { map } from 'ramda'
import React, { FC } from 'react'

import { GridItem } from './GridItem'

interface MembersProps {
  members: []
}

export const Members: FC<MembersProps> = ({ members }) => {
  return (
    <GridRow columns={`four` as any}>
      {map(({ name, slug, logo }: { name: string; slug: string; logo: string }) => {
        return <GridItem key={slug} name={name} slug={slug} logo={logo} />
      })(members)}
    </GridRow>
  )
}
