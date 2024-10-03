import React, { FC } from 'react'

interface MemberProfileCardProps {
  title: string
  logoUri: string
}

const MemberProfileCard: FC<MemberProfileCardProps> = ({ title, logoUri }) => {
  return (
    <div className="flex flex-col rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10 max-w-xl overflow-hidden h-full dark:bg-gray-900 dark:border-gray-800">
      <div className="aspect-square flex justify-center items-center overflow-hidden relative h-48">
        <img src={logoUri} alt={title} className="w-full h-full object-center object-contain" />
        <div className="absolute block w-full h-full top-0 left-0" />
      </div>
    </div>
  )
}

export default MemberProfileCard
