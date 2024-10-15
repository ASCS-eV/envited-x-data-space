import Link from 'next/link'

import { PageHeader } from '../../modules/PageHeader'

export default async function Index() {
  return (
    <>
      <PageHeader
        heading="About us"
        title="ASCS association"
        description="The ENVITED-X data space is operated by the Automotive Solution Center for Simulation e.V. (ASCS), a non-profit association founded in Germany in 2008. Our mission is to use computer simulation, AI, and high-performance computing to advance mobility, making it faster, more efficient, and sustainable. By focusing on simulation, we accelerate research & development, optimize resource use, and support eco-friendly solutions. As multiplier, catalyst and accelerator in the mobility sector, ASCS connects stakeholders, providing a platform for collaboration, knowledge exchange, and innovation. Learn more about ASCS's work and membership benefits on our website [Link to www.asc-s.de]."
        backgroundImage="/images/AdobeStock_824054193_goami.jpeg"
      />
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-900/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/5 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 pb-0 pt-10 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              ENVITED research cluster
            </h3>
            <div className="max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="mt-6 text-lg leading-8 text-gray-700">
                ENVITED-X is part of the ENVITED research cluster of the ASCS. The primary goal of the ENVITED research
                cluster is to accelerate{' '}
                <strong>research and the adoption of cutting-edge simulation technologies</strong> for the virtual
                development of highly automated and self-driving vehicles in intermodal mobility concepts. This
                encompasses all computer-aided and data-driven development processes, including virtual function design,
                validation, certification, and demonstration of system components up to complete systems.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                The ENVITED research cluster is a long-term, member-driven initiative that strategically coordinates,
                consolidates, and connects a variety of activities and projects. Members can actively participate in
                these initiatives, using them as a valuable source of knowledge and a springboard for launching new
                projects and collaborations.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                <Link href="www.asc-s.de" target="_blank">
                  Experience more about the ENVITED reserach cluster
                </Link>
              </p>
            </div>
            <img
              alt=""
              src="/images/AdobeStock_682810927_Gorodenkoff.jpeg"
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl bg-center object-cover sm:mt-16 lg:mt-32 xl:row-span-2 xl:row-end-2 justify-self-end"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
      <div className="relative isolate overflow-hidden bg-gradient-to-b to-gray-900 from-blue-900/40 pt-14 bg-gray-900 bg-contain bg-right bg-[url('/images/AdobeStock_823134873.jpeg')]">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[250%] origin-top-right skew-x-[-30deg] bg-gray-900 shadow-xl shadow-blue-900 ring-1 ring-blue-900 sm:-mr-80 lg:-mr-[30rem]"
        />
        <div className="mx-auto max-w-7xl px-6 pb-0 pt-10 sm:pb-20 sm:pt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <div className="lg:col-span-2 xl:col-auto xl:col-end-1 xl:row-start-1">
              <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Open-Source Strategy
              </h3>
              <div className="mt-6 max-w-xl lg:mt-16">
                <p className="text-lg leading-8 text-gray-400">
                  The <strong>ENVITED-X data space</strong> follows an open-source strategy to foster innovation,
                  collaboration, and transparency within the simulation and mobility community.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-gray-900 sm:h-48" />
      </div>
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 pb-0 pt-10 sm:pb-40 sm:pt-0 lg:px-8">
          <h3 className="text-4xl font-bold tracking-tight text-white mb-10">
            Here are key reasons behind this approach
          </h3>
          <div className="text-md leading-8 text-gray-400 grid grid-cols-2 md:grid-cols-2 gap-x-16 gap-y-8">
            <div>
              <h4 className="text-xl font-bold text-white">Collaboration and Knowledge Sharing</h4>
              <p className="mt-4 text-md leading-8 text-gray-400">
                By being open-source, ENVITED-X encourages active participation and knowledge exchange between members
                from diverse sectors, including industry, academia, and research institutions. This collaborative
                environment accelerates the development of new ideas, technologies, and solutions.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Innovation and Flexibility</h4>
              <p className="mt-4 text-md leading-8 text-gray-400">
                ENVITED-X as a open-source platform allow for continuous improvement, as users can contribute to and
                enhance the technology. This dynamic model fosters innovation, enabling rapid advancements in simulation
                assets and services for autonomous, connected and intermodal mobility.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Transparency and Trust</h4>
              <p className="mt-4 text-md leading-8 text-gray-400">
                The ENVITED-X open-source framework ensures transparency in how the platform operates. This builds trust
                among users, as they can review, audit, and modify the codebase according to the specific community
                needs while ensuring data security and compliance.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Scalability and Interoperability</h4>
              <p className="mt-4 text-md leading-8 text-gray-400">
                Our open-source strategy enables greater scalability and interoperability. Users can easily integrate
                new tools, standards, and technologies, ensuring the platform evolves in line with industry needs and
                technological advancements.
              </p>
            </div>
          </div>
          <p className="mt-12 text-md leading-8 text-gray-400">
            By adopting an open-source approach, ENVITED-X ensures a{' '}
            <strong>sustainable, inclusive, and forward-thinking ecosystem</strong> that empowers the entire mobility
            community to contribute, innovate, and benefit.
          </p>
        </div>
      </div>
    </>
  )
}
