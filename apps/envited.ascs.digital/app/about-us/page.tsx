import Link from 'next/link'

import { PageHeader } from '../../modules/PageHeader'

export default async function Index() {
  return (
    <>
      <PageHeader
        heading="About us"
        title="ASCS association"
        description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
              gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
        backgroundImage="/images/about-us.jpg"
      />
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-900/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/5 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 pb-0 pt-10 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              ASCS association
            </h3>
            <div className="max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="mt-6 text-lg leading-8 text-gray-700">
                The ENVITED-X data space is operated by the{' '}
                <strong>Automotive Solution Center for Simulation e.V. (ASCS)</strong>, a non-profit association founded
                in Germany in 2008. Our mission is to harness the power of{' '}
                <strong>computer simulation, artificial intelligence, and high-performance computing</strong> to drive
                the future of mobility by making it <strong>faster, more efficient, and more sustainable</strong>. With
                simulation at the core, we enable quicker development cycles, optimized resource use, and
                environmentally friendly solutions.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                As an association, we leverage our expertise, resources, and network to serve as a{' '}
                <strong>bridge and integrator</strong> across various interfaces in the mobility sector. We provide a
                platform where simulation is at the forefront, ensuring{' '}
                <strong>reliable knowledge is accessible</strong> and empowering all stakeholders to innovate.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                Together with our members and partners, we offer Europe’s leading platform for{' '}
                <strong>collaboration, knowledge exchange, international cooperation, and research/education</strong> in
                the field of simulation. Our goal is to make simulation a central force in achieving the{' '}
                <strong>sustainable mobility of the future</strong>.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                Learn more about the association's tasks, activities, organizational structure, and the benefits of
                membership by visiting the{' '}
                <Link href="www.asc-s.de" target="_blank">
                  ASCS e.V. website
                </Link>
                .
              </p>
            </div>
            <img
              alt=""
              src="/images/about-us.jpg"
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl bg-center object-cover sm:mt-16 lg:mt-0 xl:row-span-2 xl:row-end-2 justify-self-end"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
      <div className="relative isolate overflow-hidden bg-white pt-14">
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 lg:col-span-2 xl:col-auto">
              Open-Source Strategy
            </h3>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-md leading-8 text-gray-700">
                The <strong>ENVITED-X data space</strong> follows an open-source strategy to foster innovation,
                collaboration, and transparency within the simulation and mobility community.
              </p>
              <p className="mt-6 text-md leading-8 text-gray-700">Here are key reasons behind this approach:</p>
              <ul className="mt-6 text-md leading-8 text-gray-700 ps-5 space-y-4 list-disc list-inside">
                <li>
                  <strong>Collaboration and Knowledge Sharing</strong>: By being open-source, ENVITED-X encourages
                  active participation and knowledge exchange between members from diverse sectors, including industry,
                  academia, and research institutions. This collaborative environment accelerates the development of new
                  ideas, technologies, and solutions.
                </li>
                <li>
                  <strong>Innovation and Flexibility</strong>: ENVITED-X as a open-source platform allow for continuous
                  improvement, as users can contribute to and enhance the technology. This dynamic model fosters
                  innovation, enabling rapid advancements in simulation assets and services for autonomous, connected
                  and intermodal mobility.
                </li>
                <li>
                  <strong>Transparency and Trust</strong>: The ENVITED-X open-source framework ensures transparency in
                  how the platform operates. This builds trust among users, as they can review, audit, and modify the
                  codebase according to the specific community needs while ensuring data security and compliance.
                </li>
                <li>
                  <strong>Scalability and Interoperability</strong>: Our open-source strategy enables greater
                  scalability and interoperability. Users can easily integrate new tools, standards, and technologies,
                  ensuring the platform evolves in line with industry needs and technological advancements.
                </li>
              </ul>
              <p className="mt-6 text-md leading-8 text-gray-700">
                By adopting an open-source approach, ENVITED-X ensures a{' '}
                <strong>sustainable, inclusive, and forward-thinking ecosystem</strong> that empowers the entire
                mobility community to contribute, innovate, and benefit.
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
    </>
  )
}
