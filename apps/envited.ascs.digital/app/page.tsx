export default async function Index() {
  return (
    <>
      <div>
        <div className="relative flex items-center justify-center h-screen overflow-hidden"> 
          <video src="https://d1hqi5mu4fov5n.cloudfront.net/videos/Company/About_us_1920_1080.mp4" autoPlay loop muted className="absolute z-10 w-auto min-w-full min-h-full max-w-none"> 
          </video> 
          <div className="absolute top-0 z-10 h-full w-full bg-black opacity-60" />
          <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl py-32">
              <div className="">
                <h2 className="text-base font-semibold leading-7 text-blue">Our vision</h2>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Simulation is THE key for future mobility.</h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">Simulation gives mobility a future.</p>
              </div>
            </div>
          </div>
        </div> 
        <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:max-w-7xl lg:px-8 bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Empowering the innovators in mobility
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                The seamless integration of simulation assets through the ENVITED-X data space into R&D environments across corporate boundaries provides competitive and collaborative advantages to our community. We follow the principle of coopetition, using both competition and collaboration to create value for our members and the industry.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                <a className="underline text-blue cursor-pointer">Learn more</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20 h-96">
          <img src="/preview-image.png" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        </div>
        <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:max-w-7xl lg:px-8 bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Simulation data sharing community
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                In our community, we believe in the power of collaboration to drive innovation forward and push the boundaries of simulation technologies. You gain access to a wealth of resources, including simulation data, services and expertise, to fuel your simulation projects. Our community is committed to fostering an environment where members can thrive and succeed.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We invite you to become part of our vibrant and dynamic
                shared simulation data community for virtual test drive!
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                <a className="underline text-blue cursor-pointer">Learn more</a>
              </p>
            </div>
            <div className="mx-auto max-w-2xl lg:max-w-4xl mt-12">
              <h2 className="mt-10 text-2xl font-bold tracking-tight text-gray-900">
                Start your data journey today
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Become part of our trusted shared data community with over 15 years of experience in the simulation sector. Benefit from our democratic and compliant governance structures and a secure digital identity framework. Collaborate with us, develop innovations and shape the future of mobility with us. Join today and become part of a pioneering community!
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                <a className="underline text-blue cursor-pointer">Join us</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20 h-96">
          <img src="/preview-image-1.png" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        </div>
        <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6 lg:max-w-7xl lg:px-8 bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Reinventing mobility</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Automation and electrification are revolutionizing transportation, enabling innovative mobility solutions. These systems rely heavily on sensing and interacting with the environment. Data-driven simulation manages increasing product complexity, opens new solution spaces, and accelerates time-to-market.
              </p>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                <a className="underline text-blue cursor-pointer">Learn more</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
