'use client'

import { Button, Card, Grid, GridRow, Heading, HeadingWithTooltip, Tooltip } from '@envited-marketplace/design-system'
import React, { FC } from 'react'

import { useTranslation } from '../../common/i18n'

export const HeroHeader: FC = () => {
  const { t } = useTranslation('HeroHeader')

  return (
    <div className="mx-auto max-w-6xl py-32 sm:py-48 lg:py-56">
      <Grid>
        <GridRow columns={`four` as any}>
          <Card>
            <Heading importance="h1">Hello</Heading>
            <HeadingWithTooltip heading={<Heading importance="h3">Hello</Heading>} tooltip={<Tooltip>Test</Tooltip>} />
          </Card>
          <Card>
            <Heading importance="h1">Hello</Heading>
            <HeadingWithTooltip heading={<Heading importance="h3">Hello</Heading>} tooltip={<Tooltip>Test</Tooltip>} />
          </Card>
          <Card>
            <Heading importance="h1">Hello</Heading>
            <HeadingWithTooltip heading={<Heading importance="h3">Hello</Heading>} tooltip={<Tooltip>Test</Tooltip>} />
          </Card>
          <Card>
            <Heading importance="h1">Hello</Heading>
            <HeadingWithTooltip heading={<Heading importance="h3">Hello</Heading>} tooltip={<Tooltip>Test</Tooltip>} />
          </Card>
        </GridRow>
      </Grid>
      <div className="text-center">
        <div className="flex justify-center items-center"></div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={() => {}}>
            <span>{t('[Button] title')}</span>
          </Button>
        </div>
        <div className="mt-10">
          <h2 className="text-lg font-bold tracking-tight text-gray-900">{t('[Heading] why')}</h2>
          <p className="mt-2 text-md leading-8 text-gray-600">{t('[Description] why')}</p>
        </div>
      </div>
    </div>
  )
}
