import { getPublishedProfiles } from '../../common/serverActions'
import { ButtonType } from '../../common/types'
import { Button } from '../../modules/Button'
import {
  CommunityMemberIcon,
  DataAdvisorIcon,
  DataCertificationIcon,
  DataConsumerIcon,
  DataEvaluatorIcon,
  DataIntegratorIcon,
  DataProviderIcon,
  FederationServiceProviderIcon,
} from '../../modules/Icons'
import { Members } from '../../modules/Members'
import { PageHeader } from '../../modules/PageHeader'

const roles = [
  {
    name: 'Data & service provider',
    description:
      'As a data & service provider, you make your offerings visible in the ecosystem and manage their self-description, quality, maintenance, operation, improvements, and usage policies.',
    icon: <DataProviderIcon />,
  },
  {
    name: 'Data & service integrator',
    description:
      'As a data & service integrator, you create value by combining offerings for consumers, managing self-description, quality, maintenance, operation, improvements, and usage policies.',
    icon: <DataIntegratorIcon />,
  },
  {
    name: 'Data & service evaluator',
    description:
      'As a data & service evaluator you are responsible for assessing and evaluating characteristics of the offerings in the ecosystem, aiming at providing comparison parameters.',
    icon: <DataEvaluatorIcon />,
  },
  {
    name: 'Quality certification provider',
    description:
      'As a quality certification provider you are responsible for certifying the offerings in the ecosystem against selected standards, ensuring that quality parameters are being fulfilled.',
    icon: <DataCertificationIcon />,
  },
  {
    name: 'Data & service consumer',
    description: 'As a data & service consumer you request and consume data and service offerings in the federation.',
    icon: <DataConsumerIcon />,
  },
  {
    name: 'Advisor & consultant',
    description:
      'As an advisor and consultant, you assist current or potential federation participants with onboarding, integrating their infrastructure into the data space, exploring potential offerings, and developing business models within the ecosystem.',
    icon: <DataAdvisorIcon />,
  },
  {
    name: 'Federation service provider',
    description:
      'As a federation service provider you are responsible for providing services that are necessary for the adequate functioning of the data ecosystem, being responsible for their quality, maintenance, operation, and continuous improvement.',
    icon: <FederationServiceProviderIcon />,
  },
  {
    name: 'Association member',
    description:
      'As an association member, you use and shape the data space according to your needs and requirements and have access to other association activities.',
    icon: <CommunityMemberIcon />,
  },
]

export default async function Index() {
  const profiles = await getPublishedProfiles()

  return (
    <>
      <PageHeader
        heading="Community"
        title="Advancing further, together"
        description="Across our diverse community - spanning industry players (from startups to large corporations), academia,
              standardization and certification bodies - we harness cutting-edge simulation and AI technologies to fuel
              data-driven innovation. ENVITED-X builds a federated and secure data infrastructure, whereby data is
              shared, with users retaining control over their data access and usage."
        backgroundImage="/images/AdobeStock_814069778_Robert Kneschke.jpeg"
      />
      <div>
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-900/20 pt-14">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/5 sm:-mr-80 lg:-mr-96"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 lg:col-span-2 xl:col-auto">
                Shared goals for long-term success
              </h3>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-gray-700">
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
                src="/images/AdobeStock_287243623_REDPIXEL.jpeg"
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
                    <div className="relative flex justify-center items-center p-6 rounded-lg h-full transition-all ease-in-out duration-300">
                      <div
                        aria-hidden="true"
                        className="absolute inset-y-0 right-1/2 z-0 w-[200%] -mr-10 group-hover:right-0 group-hover:-mr-32 origin-top-right skew-x-[-30deg] bg-gray-900 shadow-xl shadow-blue-900 ring-1 ring-blue-900 transition-all ease-in-out duration-300"
                      />
                      <div className="relative z-2 text-base font-semibold leading-7 text-white flex flex-col items-center justify-center gap-6 text-center">
                        <div className="h-12 w-12 text-blue-800 transition-all ease-in-out duration-300 group-hover:opacity-15">
                          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" id="Icons" viewBox="0 0 60 60"><path d="M54,22.15V13a4,4,0,0,0-4-4H41V6a6.006,6.006,0,0,0-6-6H19a6.006,6.006,0,0,0-6,6V9H4a4,4,0,0,0-4,4V46a4,4,0,0,0,4,4H30v3.954C30,57.881,37.729,60,45,60s15-2.119,15-6.046V27h0C60,24.784,57.5,23.149,54,22.15ZM58,27c0,1.632-5.064,4-13,4s-13-2.371-13-4,5.064-4,13-4S58,25.37,58,27ZM15,6a4,4,0,0,1,4-4H35a4,4,0,0,1,4,4V9H37V6a2,2,0,0,0-2-2H19a2,2,0,0,0-2,2V9H15ZM35,9H19V6H35ZM2,13a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2v8.671A36.136,36.136,0,0,0,45,21c-7.27,0-15,2.1-15,6H6a4,4,0,0,1-4-4ZM23,29h7v4H24a1,1,0,0,1-1-1ZM4,48a2,2,0,0,1-2-2V27.46A5.969,5.969,0,0,0,6,29H21v3a3,3,0,0,0,3,3h6V48ZM45,58c-7.936,0-13-2.4-13-4.046V48.113C34.767,50,39.991,51,45,51s10.233-1,13-2.887v5.841C58,55.6,52.936,58,45,58Zm0-9c-7.936,0-13-2.362-13-3.989v-5.9C34.767,41,39.991,42,45,42s10.233-1,13-2.889v5.9C58,46.638,52.936,49,45,49Zm0-9c-7.936,0-13-2.365-13-3.993v-5.9c2.767,1.895,7.991,2.894,13,2.894s10.233-1,13-2.894v5.9C58,37.635,52.936,40,45,40Z"/></svg> */}
                          {feature.icon}
                        </div>
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
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 lg:col-span-2 xl:col-auto">
                Federation
              </h3>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-md leading-8 text-gray-700">
                  As the central governing entity, the ASCS association coordinates the actions of all participants,
                  ensuring alignment with the federation’s objectives, rules, and standards.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-700">
                  The federation is structured in several interconnected layers, each responsible for specific aspects
                  of governance, data sharing, and technical operations:
                </p>
                <ul className="mt-6 text-md leading-8 text-gray-700 ps-5 space-y-4 list-disc list-inside">
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
                <p className="mt-6 text-md leading-8 text-gray-700">
                  Learn more about our onboarding process and how you can benefit from this federated structure.
                </p>
                <div className="mt-6">
                  <Button href={`/onboarding`} type={ButtonType.default}>
                    Join us
                  </Button>
                </div>
              </div>
              <img
                alt=""
                src="/images/AdobeStock_949051393_VIK.jpeg"
                className="mt-10 aspect-[6/5] w-full md:h-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 xl:row-span-2 xl:row-end-2 justify-self-end"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
      </main>
    </>
  )
}

export const dynamic = 'force-dynamic'
