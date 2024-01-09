import { render, screen } from '@testing-library/react'
import React from 'react'

import { TableBody } from './Body'
import { TableCell } from './Cell'
import { TableFooter } from './Footer'
import { TableHeader } from './Header'
import { TableRow } from './Row'
import Table from './Table'

describe('components/Table', () => {
  it('should render Table', () => {
    // when ... rendering component
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeaderCell>CELL HEADER 1</TableCell>
            <TableCell isHeaderCell>CELL HEADER 2</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>CELL VALUE 1</TableCell>
            <TableCell>CELL VALUE 2</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colspan={3}>TABLE FOOTER</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    )

    const tableElement = screen.getByRole('table')

    // then ... should render with expected properties
    expect(tableElement).toBeInTheDocument()
  })
})
