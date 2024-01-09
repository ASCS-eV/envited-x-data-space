import React, { FC } from 'react'

interface Props {
  children: React.ReactNode
  importance?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading: FC<Props> = ({ importance = 'h1', children }) => {
  const heading = {
    h1: <h1 className="text-6xl pb-8 font-bold">{children}</h1>,
    h2: <h2 className="text-4xl pb-6 font-bold">{children}</h2>,
    h3: <h3 className="text-2xl pb-1 font-bold">{children}</h3>,
    h4: <h4 className="text-gray-400 dark:text-gray-500 text-sm leading-none tracking-wide">{children}</h4>,
    h5: <h5 className="text-base">{children}</h5>,
    h6: <h6 className="text-sm">{children}</h6>,
  }

  return heading[importance]
}

export default Heading
