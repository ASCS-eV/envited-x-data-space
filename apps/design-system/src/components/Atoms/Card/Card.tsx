import React, { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Card: FC<Props> = ({ children }) => (
  <div className="border text-black bg-white dark:text-white dark:border-gray-900 dark:bg-gray-900 py-5 px-6 md:px-8 md:py-7 rounded-2xl w-full">
    {children}
  </div>
)

export default Card
