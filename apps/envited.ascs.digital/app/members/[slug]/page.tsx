import { prop, propOr } from 'ramda'

import { getProfile } from '../../../common/serverActions'
import { Header } from '../../../modules/Header'
import { Member } from '../../../modules/Member'

export default async function Index({ params: { slug } }: { params: { slug: string } }) {
  const profile = await getProfile(slug)

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Member
            name={propOr('', 'name')(profile)}
            description={propOr('', 'description')(profile)}
            logo={propOr(null, 'logo')(profile)}
            website={propOr('', 'website')(profile)}
            streetAddress={propOr('', 'streetAddress')(profile)}
            addressCountry={propOr('', 'addressCountry')(profile)}
            addressLocality={propOr('', 'addressLocality')(profile)}
            postalCode={propOr('', 'postalCode')(profile)}
            salesEmail={prop('salesEmail')(profile)}
            salesName={prop('salesName')(profile)}
            salesPhone={prop('salesPhone')(profile)}
            principalEmail={prop('principalEmail')(profile)}
            principalName={prop('principalName')(profile)}
            principalPhone={prop('principalPhone')(profile)}
          />
        </div>
      </main>
    </>
  )
}
