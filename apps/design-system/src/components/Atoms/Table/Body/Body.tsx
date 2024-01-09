import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const TableBody: FC<Props> = ({ children }) => (
  <tbody className="divide-y divide-gray-200 dark:divide-gray-800 border-none">{children}</tbody>
)

export default TableBody
