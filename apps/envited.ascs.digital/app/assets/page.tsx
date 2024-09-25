import { Assets } from '../../modules/Assets'
import { Breadcrumbs } from '../../modules/Breadcrumbs'
import { PageHeader } from '../../modules/PageHeader'

export default async function Index() {
  return (
    <>
      <PageHeader
        heading="Assets"
        description="All the data available on the platform are harmonised to the latest standards and can be easily used in your virtual development or testing process. We are providing all partners full transparency. Use the search mask and meta tags to find your desired data and get an good overview about our OpenCRG-, OpenDrive-, OpenSceneGraph- and unity-files as well as software tools."
      />
      <main className="mx-auto max-w-2xl px-4 pt-0 pb-12 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
        <Breadcrumbs />
        <Assets />
      </main>
    </>
  )
}
