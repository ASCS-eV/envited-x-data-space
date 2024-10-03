'use client'

import React, { FC } from 'react'

interface PageHeaderProps {
  heading: string
  title: string
  description: string
  backgroundImage?: string
}
export const PageHeader: FC<PageHeaderProps> = ({
  heading,
  title,
  description,
  backgroundImage = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply',
}) => {
  return (
    <div className={`isolate relative overflow-hidden bg-gray-900`}>
      <img src={backgroundImage} alt={heading} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute top-0 -z-10 h-full w-full bg-gray-900 opacity-90" />
      <div className="mx-auto max-w-7xl px-6 py-24 text-left sm:py-48 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-blue-800">{heading}</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-4xl text-lg leading-8 text-white/60">{description}</p>
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 h-[80rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse cx={604} cy={512} rx={604} ry={512} fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)" />
            <defs>
              <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                <stop stopColor="#798bb3" />
                <stop offset={1} stopColor="#848ab7" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
