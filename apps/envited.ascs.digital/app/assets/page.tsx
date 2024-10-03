import { Assets } from '../../modules/Assets'
import { Breadcrumbs } from '../../modules/Breadcrumbs'
import { PageHeader } from '../../modules/PageHeader'

export default async function Index() {
  return (
    <main>
      <PageHeader
        heading="Assets"
        title="All the data available on the platform"
        description="All the data available on the platform are harmonised to the latest standards and can be easily used in
        your virtual development or testing process. We are providing all partners full transparency. Use the
        search mask and meta tags to find your desired data and get an good overview about our OpenCRG-,
        OpenDrive-, OpenSceneGraph- and unity-files as well as software tools"
        backgroundImage="/images/onboarding.jpg"
      />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-40 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
        <Assets />
      </div>
    </main>
  )
}
