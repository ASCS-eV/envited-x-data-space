import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Columns } from '../../../types'
import Grid from './Grid'
import { GridRow } from './Row'

export default {
  component: Grid,
  title: 'Components/Grid',
  argTypes: { columns: { control: { type: 'select' }, options: Object.keys(Columns) } },
} as Meta

const GridTemplate: Story = ({ columns }) => (
  <Grid>
    <GridRow columns={columns}>
      <div className="bg-orange-100 block h-40" />
      <div className="bg-orange-100 block h-40" />
      <div className="bg-orange-100 block h-40" />
      <div className="bg-orange-100 block h-40" />
      <div className="bg-orange-100 block h-40" />
      <div className="bg-orange-100 block h-40" />
      <div className="bg-orange-100 block h-40" />
    </GridRow>
  </Grid>
)

export const GridComponent = GridTemplate.bind({})

GridComponent.args = {
  columns: Columns.three,
}
