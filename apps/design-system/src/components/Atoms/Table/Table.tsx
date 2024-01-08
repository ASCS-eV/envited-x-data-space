import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Table: FC<Props> = ({ children }) => (
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 overflow-hidden sm:rounded-lg">
    {children}
  </table>
)

export default Table
