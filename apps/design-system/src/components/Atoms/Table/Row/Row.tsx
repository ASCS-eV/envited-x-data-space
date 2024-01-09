import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const TableRow: FC<Props> = ({ children }) => <tr>{children}</tr>

export default TableRow
