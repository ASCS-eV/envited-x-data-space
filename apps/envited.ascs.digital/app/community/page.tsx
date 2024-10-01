import Link from 'next/link'

import { getPublishedProfiles } from '../../common/serverActions'
import { Members } from '../../modules/Members'
import { PageHeader } from '../../modules/PageHeader'

const roles = [
  {
    name: 'Data / service provider',
    description:
      'As a data / service provider, you make your offerings visible in the ecosystem and manage their self-description, quality, maintenance, operation, improvements, and usage policies.',
  },
  {
    name: 'Data / service integrator',
    description:
      'As a data / service integrator, you create value by combining offerings for consumers, managing self-description, quality, maintenance, operation, improvements, and usage policies.',
  },
  {
    name: 'Data & service evaluator',
    description:
      'As a data / service evaluator you are responsible for assessing and evaluating characteristics of the offerings in the ecosystem, aiming at providing comparison parameters.',
  },
  {
    name: 'Quality certification provider',
    description:
      'As a quality certification provider you are responsible for certifying the offerings in the ecosystem against selected standards, ensuring that quality parameters are being fulfilled.',
  },
  {
    name: 'Data & service consumer',
    description: 'As a data & service consumer you request and consume data and service offerings in the federation.',
  },
  {
    name: 'Advisor & consultant',
    description:
      'As an advisor and consultant, you assist current or potential federation participants with onboarding, integrating their infrastructure into the data space, exploring potential offerings, and developing business models within the ecosystem.',
  },
  {
    name: 'Federation service provider',
    description:
      'As an federation service provider you are esponsible for providing services that are necessary for the adequate functioning of the data ecosystem, being responsible for their quality, maintenance, operation, and continuous improvement.',
  },
  {
    name: 'Association member',
    description:
      'As an association member, you use and shape the data space according to your needs and requirements and have access to other association activities.',
  },
]

export default async function Index() {
  const profiles = await getPublishedProfiles()

  return (
    <>
      <div className="isolate relative overflow-hidden bg-gray-900 bg-cover bg-[url('/images/community.jpg')]">
        <div className="absolute top-0 -z-10 h-full w-full bg-gray-900 opacity-90" />
        <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-48 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-base font-semibold leading-7 text-blue-800">Community</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Advancing further, together</p>
          </div>
          <div className="relative mt-6">
            <p className="mx-auto max-w-4xl text-lg leading-8 text-white/60">
              Across our diverse community - spanning industry players (from startups to large corporations), academia,
              standardization and certification bodies - we harness cutting-edge simulation and AI technologies to fuel
              data-driven innovation. ENVITED-X builds a federated and secure data infrastructure, whereby data are
              shared, with users retaining control over their data access and usage.
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
              <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 lg:col-span-2 xl:col-auto">
                Collaboration and trust are the pillars of our ENVITED-X federation
              </h3>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-gray-600">
                  Collaboration and trust are the pillars of our ENVITED-X federation, where we believe that collective
                  efforts lead to greater achievements. High-quality data and services form the foundation for future
                  development processes and operating models. To support this, we ensure transparency and governance to
                  a unique pool of data and services. By connecting providers, integrators, and evaluators with
                  consumers, we enable the creation of innovative, forward-thinking business models with a clear
                  technical focus.
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
            <h3 className="text-4xl font-bold tracking-tight text-gray-900">Our community members</h3>
            <div className="my-12">
              <Members members={profiles} />
            </div>
          </div>
        </div>
      </div>
      <main>
        {/* <div className="mx-auto max-w-2xl px-4 pt-0 pb-12 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
          <div className="mx-auto max-w-2xl pb-20 lg:max-w-7xl py-24">
            <div className="max-w-4xl px-6 lg:px-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Collaboration and trust are the pillars of our ENVITED-X federation
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Across our diverse community - spanning industry players (from startups to large corporations),
                academia, standardization and certification bodies - we harness cutting-edge simulation and AI
                technologies to fuel data-driven innovation. ENVITED-X builds a federated and secure data
                infrastructure, whereby data are shared, with users retaining control over their data access and usage.
                <br />
                <br />
                Collaboration and trust are the pillars of our ENVITED-X federation, where we believe that collective
                efforts lead to greater achievements. High-quality data and services form the foundation for future
                development processes and operating models. To support this, we ensure transparency and governance to a
                unique pool of data and services. By connecting providers, integrators, and evaluators with consumers,
                we enable the creation of innovative, forward-thinking business models with a clear technical focus.
              </p>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 mt-5 mb-5">Our community members</h3>
            </div>
            <Members members={profiles} />
          </div>
        </div> */}
        <div className="bg-gray-900 py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[37.5rem] bg-grid-slate-900/[0.04] bg-pattern [mask-image:linear-gradient(0deg,transparent,black)]"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl lg:text-left">
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Roles</h2>
              <p className="mt-6 text-lg leading-8 text-gray-200">
                Our decentralized ENVITED-X ecosystem stands apart from traditional supply chains, where each partner
                holds a fixed role. In the ENVITED-X federation, roles are more flexible, allowing participants to
                seamlessly transition between being data consumers and producers.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-200">
                See what different roles participants can have in our ecosystem:
              </p>
            </div>
            <div className="mx-auto my-12 max-w-2xl lg:max-w-7xl">
              <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-4">
                {roles.map(feature => (
                  <div
                    key={feature.name}
                    className="relative rounded-lg overflow-hidden group transition-all ease-in-out duration-300 shadow-xl shadow-blue-900/5 ring-1 ring-gray-800 h-52 bg-gradient-to-b to-gray-900 from-blue-900/40 bg-gray-900"
                  >
                    {/* <div className="relative flex justify-center items-center p-6 bg-gray-900 rounded-lg h-full after:block after:absolute after:top-0 after:-right-[2.5rem] after:w-[15rem] after:-mr-half after:h-full after:-skew-x-12 after:bg-blue-900 after:opacity-5 after:z-0 hover:after:w-[40vw] after:transition-all after:ease-in-out after:duration-300"> */}
                    <div className="relative flex justify-center items-center p-6 rounded-lg h-full transition-all ease-in-out duration-300">
                      <div
                        aria-hidden="true"
                        className="absolute inset-y-0 right-1/2 z-0 w-[200%] -mr-10 group-hover:right-0 group-hover:-mr-32 origin-top-right skew-x-[-30deg] bg-gray-900 shadow-xl shadow-blue-900 ring-1 ring-blue-900 transition-all ease-in-out duration-300"
                      />
                      <div className="relative z-2 text-base font-semibold leading-7 text-white flex flex-col items-center justify-center gap-6 text-center">
                        <span className="transition-all ease-in-out duration-300 group-hover:opacity-0">
                          {feature.name}
                        </span>
                      </div>
                      <div className="absolute z-2 py-6 px-4 transition-all ease-in-out duration-300 opacity-0 mb-2.5 group-hover:opacity-100 group-hover:mb-0 text-white text-center text-sm">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative isolate overflow-hidden bg-white pt-14">
          {/* <div
            aria-hidden="true"
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/5 sm:-mr-80 lg:-mr-96"
          /> */}
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 lg:col-span-2 xl:col-auto">
                Federation
              </h3>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-gray-600">
                  As the central governing entity, the ASCS association coordinates the actions of all participants,
                  ensuring alignment with the federation’s objectives, rules, and standards.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  As the central governing entity, the ASCS association coordinates the actions of all participants,
                  ensuring alignment with the federation’s objectives, rules, and standards.
                </p>
                <ul className="mt-6 text-lg leading-8 text-gray-600 ps-5 space-y-4 list-disc list-inside">
                  <li>
                    <strong>Governance Layer</strong>: Oversees the legal, regulatory, and compliance aspects. This
                    includes setting strategies and policies on onboarding, data access, usage, intellectual property,
                    and resolving conflicts.
                  </li>
                  <li>
                    <strong>Data Space Management Layer</strong>: Focuses on defining the rules and processes for the
                    operation of the ENVITED-X data space, including data interoperability, data lifecycle management,
                    and metadata standards.
                  </li>
                  <li>
                    <strong>Service and Application Layer</strong>: Ensures that the technical tools and services are
                    interoperable, secure, and standardized. This could include defining APIs and creating tools for
                    data access, sharing, visualization, qualification and labeling.
                  </li>
                  <li>
                    <strong>Infrastructure Layer</strong>: Responsible for the underlying cloud and DLT infrastructure
                    that supports the federation. It ensures that computing resources, storage, and network services are
                    reliable, scalable, and secure.
                  </li>
                </ul>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Learn more about our onboarding process and how you can benefit from this federated structure.{' '}
                  <Link href={`/onboarding`} className="underline text-blue cursor-pointer">
                    Join us
                  </Link>
                  .
                </p>
              </div>
              <img
                alt=""
                src="/images/federation.jpg"
                className="mt-10 aspect-[6/5] w-full md:h-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 xl:row-span-2 xl:row-end-2 justify-self-end"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
        {/*         
        <div className="relative flex items-center justify-center h-[500px] overflow-hidden">
          <div className="absolute top-0 z-10 h-full w-full bg-black opacity-60" />
          <img src="/mission.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        </div>
        <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:max-w-7xl lg:px-8 bg-white py-24">
          <div className="max-w-4xl px-6 lg:px-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Federation</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              As the central governing entity, the ASCS association coordinates the actions of all participants,
              ensuring alignment with the federation’s objectives, rules, and standards.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The federation is structured in several interconnected layers, each responsible for specific aspects of
              governance, data sharing, and technical operations:
            </p>
            <ul className="mt-6 text-lg leading-8 text-gray-600 ps-5 space-y-4 list-disc list-inside">
              <li>
                <strong>Governance Layer</strong>: Oversees the legal, regulatory, and compliance aspects. This includes
                setting strategies and policies on onboarding, data access, usage, intellectual property, and resolving
                conflicts.
              </li>
              <li>
                <strong>Data Space Management Layer</strong>: Focuses on defining the rules and processes for the
                operation of the ENVITED-X data space, including data interoperability, data lifecycle management, and
                metadata standards.
              </li>
              <li>
                <strong>Service and Application Layer</strong>: Ensures that the technical tools and services are
                interoperable, secure, and standardized. This could include defining APIs and creating tools for data
                access, sharing, visualization, qualification and labeling.
              </li>
              <li>
                <strong>Infrastructure Layer</strong>: Responsible for the underlying cloud and DLT infrastructure that
                supports the federation. It ensures that computing resources, storage, and network services are
                reliable, scalable, and secure.
              </li>
            </ul>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Learn more about our onboarding process and how you can benefit from this federated structure.{' '}
              <Link href={`/onboarding`} className="underline text-blue cursor-pointer">
                Join us
              </Link>
              .
            </p>
          </div>
        </div>
         */}
      </main>
    </>
  )
}

export const dynamic = 'force-dynamic'
