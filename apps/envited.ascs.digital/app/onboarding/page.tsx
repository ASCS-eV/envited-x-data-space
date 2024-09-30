import { PageHeader } from '../../modules/PageHeader'

export default async function Index() {
  return (
    <>
      <PageHeader heading="Onboarding" description="" />
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
    </>
  )
}
