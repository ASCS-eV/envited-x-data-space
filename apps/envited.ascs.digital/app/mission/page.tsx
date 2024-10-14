import { ColorScheme } from '../../common/types'
import { Button } from '../../modules/Button'
import {
  AccelerateTechnologyIcon,
  FosterCollaborationIcon,
  PersonalizedMobilityIcon,
  SeamlessDataExchangeIcon,
  SelfDrivingIcon,
  SustainableCarIcon,
} from '../../modules/Icons'
import { PageHeader } from '../../modules/PageHeader'

const features = [
  {
    name: 'Facilitate seamless exchange',
    description:
      'Facilitate seamless exchange of data and services between key stakeholders, creating a rich environment where mobility simulations are powered by high-quality data.',
    icon: <SeamlessDataExchangeIcon />,
  },
  {
    name: 'Foster collaboration',
    description:
      'Foster collaboration between industry leaders, researchers, and innovators to address complex mobility challenges through new data-driven business cases.',
    icon: <FosterCollaborationIcon />,
  },
  {
    name: 'Accelerate technological advancements',
    description:
      'Accelerate technological advancements by translating application-oriented research into industry practices through continuous exchange within an expert community that bridges technical capabilities with continuously evolving demands.',
    icon: <AccelerateTechnologyIcon />,
  },
  {
    name: 'Develop predictive and adaptive mobility solutions',
    description:
      'Develop predictive and adaptive mobility solutions by combining real-world data and trusted AI with simulation models that respond dynamically to changing needs, environments, and scenarios.',
    icon: <SelfDrivingIcon />,
  },
  {
    name: 'Enable personalized and optimized mobility experiences',
    description:
      'Enable personalized and optimized mobility experiences for customers by integrating insights from simulations that reflect real-world scenarios and needs.',
    icon: <PersonalizedMobilityIcon />,
  },
  {
    name: 'Champion safety and sustainability',
    description:
      'Champion safety and sustainability by using simulation data to predict, prevent, and improve mobility systems with minimal environmental impact and maximized safety outcomes.',
    icon: <SustainableCarIcon />,
  },
]

export default async function Index() {
  return (
    <main>
      <PageHeader
        heading="Mission"
        title="Reinventing mobility"
        description="Automated, electric and software-defined vehicles are revolutionizing transportation, enabling innovative mobility solutions. 
        These systems rely heavily on sensing and interacting with their environment. Data-driven simulation across departments and company borders 
        manages increasing product complexity, opens new solution spaces, and accelerates time-to-market."
        backgroundImage="/images/AdobeStock_822448804_SKIMP Art.jpeg"
      />
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-900/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/5 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 pb-0 pt-10 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              Future-proof development
            </h3>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-700">
                Our ENVITED-X community mission is to create a trusted, dynamic, and interconnected B2B data ecosystem
                that harnesses the full potential of simulation and AI technologies in the mobility sector. By
                seamlessly integrating end users, data providers, and service providers into a domain-specific data
                space, we aim to accelerate innovation, enhance collaboration, and unlock new insights that drive
                smarter, safer, and more sustainable mobility solutions.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                Data-driven simulation across departments and company borders manages increasing product complexity,
                opens new solution spaces, and accelerates time-to-market.
              </p>
            </div>
            <img
              alt=""
              src="/images/AdobeStock_777175657_Creative_Bringer.jpeg"
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 xl:row-span-2 xl:row-end-2 justify-self-end"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto mt-10 md:-mt-12 mb-24 max-w-2xl lg:max-w-7xl">
          <h3 className="text-4xl font-bold tracking-tight text-gray-900">We aspire to</h3>
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3 my-12">
            {features.map(feature => (
              <div
                key={feature.name}
                className="relative rounded-lg overflow-hidden group transition-all ease-in-out duration-300 shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/10 h-52 bg-gradient-to-b to-gray-900 from-blue-900/40 bg-gray-900"
              >
                <div className="relative flex justify-center items-center p-6 rounded-lg h-full transition-all ease-in-out duration-300">
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 right-1/2 z-0 w-[200%] -mr-10 group-hover:right-0 group-hover:-mr-32 origin-top-right skew-x-[-30deg] bg-gray-900 shadow-xl shadow-blue-900 ring-1 ring-blue-900 transition-all ease-in-out duration-300"
                  />
                  <div className="relative z-2 text-base font-semibold leading-7 text-white flex flex-col items-center justify-center gap-6 text-center">
                    <div className="h-12 w-12 text-blue-800 transition-all ease-in-out duration-300 group-hover:opacity-15">
                      {feature.icon}
                    </div>
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
      </div>
      <div className="mx-auto max-w-7xl pb-10 pt-0 md:pb-24 px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 rounded-md sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[80rem] w-[80rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#798bb3" />
                <stop offset={1} stopColor="#798bb3" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto text-center lg:mx-0 lg:flex-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Be Part of the Future of Data-Driven Mobility
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Through this unique ecosystem, we aim to be the catalyst for a future where data-driven mobility solutions
              revolutionize transportation, empowering all stakeholders to create a smarter, more connected world.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Join us in shaping our ecosystem with your valuable contributions. Discover more about our growing
              community.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button href={'/community'} colorScheme={ColorScheme.dark}>
                Meet our community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
