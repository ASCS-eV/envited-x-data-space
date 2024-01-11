'use client'

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@envited-marketplace/design-system'
import React from 'react'

export const ExampleTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell extraClasses="pb-0">
            <h4 className="text-gray-400 dark:text-gray-500 text-sm">Heading 1</h4>
          </TableCell>
          <TableCell extraClasses="hidden md:table-cell text-right pb-0">
            <h4 className="text-gray-400 dark:text-gray-500 text-sm">Heading 2</h4>
          </TableCell>
          <TableCell extraClasses="hidden md:table-cell text-right pb-0">
            <h4 className="text-gray-400 dark:text-gray-500 text-sm">Heading 3</h4>
          </TableCell>
          <TableCell extraClasses="text-right pb-0">
            <h4 className="text-gray-400 dark:text-gray-500 text-sm">Heading 4</h4>
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Item 1</TableCell>
          <TableCell extraClasses="hidden md:table-cell text-right">Item 2</TableCell>
          <TableCell extraClasses="hidden md:table-cell text-right">Item 3</TableCell>
          <TableCell extraClasses="text-right">Item 4</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
