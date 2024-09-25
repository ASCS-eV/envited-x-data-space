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
      <div>
        <div className="relative flex items-center justify-center h-[500px] overflow-hidden">
          <div className="absolute top-0 z-10 h-full w-full bg-black opacity-60" />
          <img src="/mission.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        </div>
        <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:max-w-7xl lg:px-8 bg-white py-24">
          <div className="max-w-4xl px-6 lg:px-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Reinventing mobility</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Automated, electric and software-defined vehicles are revolutionizing transportation, enabling innovative
              mobility solutions. These systems rely heavily on sensing and interacting with their environment.
              <br />
              <br />
              Data-driven simulation across departments and company borders manages increasing product complexity, opens
              new solution spaces, and accelerates time-to-market.
            </p>
          </div>
        </div>
      </div>
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
    </>
  )
}
