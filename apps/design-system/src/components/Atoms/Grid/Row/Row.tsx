import React, { FC, ReactNode } from 'react'

import { Columns } from '../../../../types'

interface Props {
  columns: Columns
  children: ReactNode
}

const GridRow: FC<Props> = ({ columns = Columns.three, children }) => {
  const columnsClassMap = {
    [Columns.two]: 'lg:grid-cols-2 xl:grid-cols-2',
    [Columns.three]: 'lg:grid-cols-2 xl:grid-cols-3',
    [Columns.four]: 'lg:grid-cols-3 xl:grid-cols-4',
    [Columns.five]: 'lg:grid-cols-5 xl:grid-cols-5',
  }

  return (
    <div className={`${columnsClassMap[columns]} grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6`}>
      {children}
    </div>
  )
}

export default GridRow
