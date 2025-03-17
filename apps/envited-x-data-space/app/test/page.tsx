'use client'

import { getMetadataInSections } from 'apps/envited-x-data-space/common/asset/displayTrees/utils'
import { AssetDynamic } from 'apps/envited-x-data-space/modules/AssetDynamic'

import metadata from '../../common/fixtures/example/hd-map/domainMetadata.json'
import { Breadcrumbs } from '../../modules/Breadcrumbs'

export default async function Index() {
  const getAssetSections = await getMetadataInSections(metadata)
  console.log(getAssetSections)

  return (
    <>
      <main className="mx-auto max-w-2xl px-4 pt-0 pb-12 sm:px-6 lg:max-w-7xl lg:px-8 mt-6">
        <Breadcrumbs />
        <AssetDynamic sections={getAssetSections} metadata={metadata} />
      </main>
    </>
  )
}

export const dynamic = 'force-dynamic'
