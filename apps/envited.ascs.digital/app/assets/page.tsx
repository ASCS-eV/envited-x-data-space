import { Assets } from '../../modules/Assets'
import { Breadcrumbs } from '../../modules/Breadcrumbs'
import { PageHeader } from '../../modules/PageHeader'

export default async function Index() {
  return (
    <main>
      <PageHeader
        heading="Assets"
        title="Streamlined Data for Development and Testing"
        description="All data available on the platform is harmonized to the latest standards and can be easily 
        used in your virtual development toolchain or testing process. We provide all partners with full transparency. 
        Use the search filter and meta tags to find your desired data and get a good overview of our ASAM OpenX standardized files, 
        Functional Mock-up Units, gLTF 3D models, as well as software services. If you find something missing, engage with the community"
        backgroundImage="/images/AdobeStock_838127622_Rich4289.jpeg"
      />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-40 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
        <Assets />
      </div>
    </main>
  )
}
