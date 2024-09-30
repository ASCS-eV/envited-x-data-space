import React, { FC } from 'react'

interface MemberProfileCardProps {
  title: string
  logoUri: string
}

const MemberProfileCard: FC<MemberProfileCardProps> = ({ title, logoUri }) => {
  return (
    <div className="flex flex-col border rounded-2xl max-w-xl overflow-hidden ring-0 focus:ring focus:ring-gray-50 hover:shadow h-full bg-white dark:bg-gray-900 dark:border-transparent dark:border-gray-800">
      <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex justify-center items-center overflow-hidden relative h-48">
        <img src={logoUri} alt={title} className="w-full h-full object-center object-contain px-4" />
        <div className="absolute block w-full h-full top-0 left-0" />
      </div>
    </div>
  )
}

export default MemberProfileCard
