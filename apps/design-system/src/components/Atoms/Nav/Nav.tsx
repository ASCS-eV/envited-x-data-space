import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Nav: FC<Props> = ({ children }) => (
  <nav>
    <ul>{children}</ul>
  </nav>
)

export default Nav
