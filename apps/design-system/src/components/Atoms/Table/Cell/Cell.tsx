import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  colspan?: number
  isHeaderCell?: boolean
  extraClasses?: string
}

const TableCell: FC<Props> = ({ children, colspan = 1, isHeaderCell = false, extraClasses = '' }) => {
  const classes = isHeaderCell
    ? 'py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
    : 'py-4 whitespace-nowrap'
  return isHeaderCell ? (
    <th className={`${classes} ${extraClasses}`} colSpan={colspan}>
      {children}
    </th>
  ) : (
    <td className={`${classes} ${extraClasses}`} colSpan={colspan}>
      {children}
    </td>
  )
}

export default TableCell
