import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Grid: FC<Props> = ({ children }) => <div className="container mx-auto my-4 px-4">{children}</div>

export default Grid
