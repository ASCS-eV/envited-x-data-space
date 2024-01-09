import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const TableFooter: FC<Props> = ({ children }) => <tfoot className="text-sm">{children}</tfoot>

export default TableFooter
