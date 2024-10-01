import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const features = [
  {
    name: 'Facilitate seamless data exchange',
    description:
      'Facilitate seamless data exchange and services between key stakeholders, enabling a rich environment where mobility simulations are powered by high-quality data.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Foster collaboration',
    description:
      'Foster collaborationbetween industry leaders, researchers, and innovators to address complex mobility challenges through new data-driven business cases.',
    icon: LockClosedIcon,
  },
  {
    name: 'Accelerate technological advancements',
    description:
      'Accelerate technological advancements by translating application-oriented research into industry practices through continuous exchange within an expert community that bridges technical capabilities with continuously evolving demands.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Develop predictive and adaptive mobility solutions',
    description:
      'Develop predictive and adaptive mobility solutions by combining real-world data and trusted AI with simulation models that respond dynamically to changing needs, environments, and scenarios.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Enable personalized and optimized mobility experiences',
    description:
      'Enable personalized and optimized mobility experiences for customers by integrating insights from simulations that reflect real-world scenarios and needs.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Champion safety and sustainability',
    description:
      'Champion safety and sustainability by using simulation data to predict, prevent, and improve mobility systems with minimal environmental impact and maximized safety outcomes.',
    icon: FingerPrintIcon,
  },
]

export default async function Index() {
  return (
    <>
      <div className="isolate relative overflow-hidden bg-gray-900 bg-cover  bg-center bg-[url('/images/mission.jpg')]">
        <div className="absolute top-0 -z-10 h-full w-full bg-gray-900 opacity-90" />
        <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-48 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-base font-semibold leading-7 text-blue-800">Mission</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Reinventing mobility</p>
          </div>
          <div className="relative mt-6">
            <p className="mx-auto max-w-4xl text-lg leading-8 text-white/60">
              All the data available on the platform are harmonised to the latest standards and can be easily used in
              your virtual development or testing process. We are providing all partners full transparency. Use the
              search mask and meta tags to find your desired data and get an good overview about our OpenCRG-,
              OpenDrive-, OpenSceneGraph- and unity-files as well as software tools.
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
      <div>
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-900/20 pt-14">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/5 sm:-mr-80 lg:-mr-96"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                Future-proof development
              </h3>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-gray-600">
                  Our ENVITED-X community mission is to create a trusted, dynamic, and interconnected B2B data ecosystem
                  that harnesses the full potential of simulation and AI technologies in the mobility sector. By
                  seamlessly integrating end users, data providers, and service providers into a domain-specific data
                  space, we aim to accelerate innovation, enhance collaboration, and unlock new insights that drive
                  smarter, safer, and more sustainable mobility solutions.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Data-driven simulation across departments and company borders manages increasing product complexity,
                  opens new solution spaces, and accelerates time-to-market.
                </p>
              </div>
              <img
                alt=""
                src="/images/mission.jpg"
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 xl:row-span-2 xl:row-end-2 justify-self-end"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="mx-auto -mt-12 mb-24 max-w-2xl lg:max-w-7xl">
            <h3 className="text-4xl font-bold tracking-tight text-gray-900">We aspire to</h3>
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3 my-12">
              {features.map(feature => (
                <div
                  key={feature.name}
                  className="relative rounded-lg overflow-hidden group transition-all ease-in-out duration-300 shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/10 h-52 bg-gradient-to-b to-gray-900 from-blue-900/40 bg-gray-900"
                >
                  {/* <div className="relative flex justify-center items-center p-6 bg-gray-900 rounded-lg h-full after:block after:absolute after:top-0 after:-right-[2.5rem] after:w-[15rem] after:-mr-half after:h-full after:-skew-x-12 after:bg-blue-900 after:opacity-5 after:z-0 hover:after:w-[40vw] after:transition-all after:ease-in-out after:duration-300"> */}
                  <div className="relative flex justify-center items-center p-6 rounded-lg h-full transition-all ease-in-out duration-300">
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 right-1/2 z-0 w-[200%] -mr-10 group-hover:right-0 group-hover:-mr-32 origin-top-right skew-x-[-30deg] bg-gray-900 shadow-xl shadow-blue-900 ring-1 ring-blue-900 transition-all ease-in-out duration-300"
                    />
                    <div className="relative z-2 text-base font-semibold leading-7 text-white flex flex-col items-center justify-center gap-6 text-center">
                      <feature.icon
                        aria-hidden="true"
                        className="h-12 w-12 text-blue-800 transition-all ease-in-out duration-300 group-hover:opacity-15"
                      />
                      <span className="transition-all ease-in-out duration-300 group-hover:opacity-0">
                        {feature.name}
                      </span>
                    </div>
                    <div className="absolute z-2 p-6 transition-all ease-in-out duration-300 opacity-0 mb-2.5 group-hover:opacity-100 group-hover:mb-0 text-white text-center">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="max-w-4xl lg:text-left">
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Through this unique ecosystem, we aim to be the catalyst for a future where data-driven mobility
                solutions revolutionize transportation, empowering all stakeholders to create a smarter, more connected
                world.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Join us in shaping our ecosystem with your valuable contributions. Discover more about our growing
                community.
              </p>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                <Link href={`/members`} className="underline text-blue cursor-pointer">
                  To our community
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="bg-gray-900 py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[37.5rem] bg-grid-slate-900/[0.04] bg-pattern [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl lg:text-left">
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Future-proof development</h2>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Our ENVITED-X community mission is to create a trusted, dynamic, and interconnected B2B data ecosystem
              that harnesses the full potential of simulation and AI technologies in the mobility sector. By seamlessly
              integrating end users, data providers, and service providers into a domain-specific data space, we aim to
              accelerate innovation, enhance collaboration, and unlock new insights that drive smarter, safer, and more
              sustainable mobility solutions.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-200">We aspire to:</p>
          </div>
          <div className="mx-auto my-12 max-w-2xl lg:max-w-7xl">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
              {features.map(feature => (
                <div
                  key={feature.name}
                  className="relative rounded-lg overflow-hidden group transition-all ease-in-out duration-300 shadow-[0_0_10px_0_rgba(0,0,0,0)] hover:shadow-white/20 hover:shadow-blue-900/20 h-52"
                >
                  <div className="relative flex justify-center items-center p-6 bg-gray-800/50 shadow-[inset_0_1px_0_0_#ffffff0d] rounded-lg h-full after:block after:absolute after:top-0 after:-right-[2.5rem] after:w-[15rem] after:-mr-half after:h-full after:-skew-x-12 after:bg-blue-900 after:opacity-5 after:z-0 hover:after:w-[40vw] after:transition-all after:ease-in-out after:duration-300">
                    <div className="text-base font-semibold leading-7 text-white flex flex-col items-center justify-center gap-6 text-center">
                      <feature.icon
                        aria-hidden="true"
                        className="h-12 w-12 text-blue-800 transition-all ease-in-out duration-300 group-hover:opacity-15"
                      />
                      <span className="transition-all ease-in-out duration-300 group-hover:opacity-0">
                        {feature.name}
                      </span>
                    </div>
                    <div className="absolute z-2 p-6 transition-all ease-in-out duration-300 opacity-0 mb-2.5 group-hover:opacity-100 group-hover:mb-0 text-white text-center">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-4xl lg:text-left">
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Through this unique ecosystem, we aim to be the catalyst for a future where data-driven mobility solutions
              revolutionize transportation, empowering all stakeholders to create a smarter, more connected world.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Join us in shaping our ecosystem with your valuable contributions. Discover more about our growing
              community.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              <Link href={`/members`} className="underline text-blue cursor-pointer">
                To our community
              </Link>
            </p>
          </div>
        </div>
      </div>
      */}
    </>
  )
}
