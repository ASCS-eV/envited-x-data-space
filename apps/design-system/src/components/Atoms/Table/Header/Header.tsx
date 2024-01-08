import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const TableHeader: FC<Props> = ({ children }) => (
  <thead className="divide-y divide-gray-200 dark:divide-gray-600">{children}</thead>
)

export default TableHeader
