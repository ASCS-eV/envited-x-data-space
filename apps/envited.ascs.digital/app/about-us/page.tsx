import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default async function Index() {
  return (
    <>
      <div className="isolate relative overflow-hidden bg-gray-900 bg-cover  bg-center bg-[url('/mission.jpg')]">
        <div className="absolute top-0 -z-10 h-full w-full bg-gray-900 opacity-90" />
        <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-48 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-base font-semibold leading-7 text-blue-800">About us</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Envited Data Space</p>
          </div>
          <div className="relative mt-6">
            <p className="mx-auto max-w-4xl text-lg leading-8 text-white/60">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
              gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
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
    </>
  )
}
