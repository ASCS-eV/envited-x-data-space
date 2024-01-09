import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TableBody } from './Body'
import { TableCell } from './Cell'
import { TableFooter } from './Footer'
import { TableHeader } from './Header'
import { TableRow } from './Row'
import Table from './Table'

export default {
  component: Table,
  title: 'Components/Table',
} as Meta

const Template: Story = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableCell isHeaderCell>Asset</TableCell>
        <TableCell isHeaderCell>Balance</TableCell>
        <TableCell isHeaderCell>Value</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>XTZ</TableCell>
        <TableCell>1000</TableCell>
        <TableCell>$3000</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colspan={3}>Page 1</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
)

export const TableComponent = Template.bind({})

TableComponent.args = {}
