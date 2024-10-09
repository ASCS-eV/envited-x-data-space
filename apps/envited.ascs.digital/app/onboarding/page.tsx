import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { is, prop } from 'ramda'

import { ButtonType, ColorScheme } from '../../common/types'
import { Button } from '../../modules/Button'

const tiers = [
  {
    name: 'Community',
    id: 'tier-community',
    featured: false,
  },
  {
    name: 'Association',
    id: 'tier-association',
    featured: true,
  },
]
const sections = [
  {
    name: 'Data & Service Access and Contribution',
    features: [
      { name: 'Organization visibility', tiers: { Community: true, Association: true } },
      { name: 'Explore data & service offers', tiers: { Community: true, Association: true } },
      { name: 'Consume data & services', tiers: { Community: 'Limited', Association: 'Unlimited' } },
      { name: 'Provide data & services', tiers: { Community: 'Limited', Association: 'Unlimited' } },
      { name: 'Benefit from standards, metrics and labels', tiers: { Community: 'Limited', Association: 'Unlimited' } },
      { name: 'Open-Source contribution', tiers: { Community: true, Association: true } },
    ],
  },
  {
    name: 'Governance and Organizational Influence',
    features: [
      { name: 'Access to exclusive association member activities', tiers: { Community: 'Limited', Association: true } },
      { name: 'Shape the ENVITED-X roadmap', tiers: { Community: false, Association: true } },
      { name: 'Voting and decision rights', tiers: { Community: false, Association: true } },
      { name: 'Define architecture and rules', tiers: { Community: false, Association: true } },
      { name: 'Define governance and policy', tiers: { Community: false, Association: true } },
      { name: 'Work groups engagement', tiers: { Community: false, Association: true } },
      { name: 'Contribute to standards, metrics and labels', tiers: { Community: false, Association: true } },
    ],
  },
]

export default async function Index() {
  return (
    <>
      <div className="isolate relative overflow-hidden bg-gray-900 bg-cover bg-center bg-[url('/images/onboarding.jpg')]">
        <div className="absolute top-0 -z-10 h-full w-full bg-gray-900 opacity-90" />
        <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-48 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-base font-semibold leading-7 text-blue-800">Onboarding</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Join our Simulation Data Sharing Community
            </p>
          </div>
          <div className="relative mt-6">
            <p className="mx-auto max-w-4xl text-lg leading-8 text-white/60">
              Become a part of our growing community of innovators and experts in a secure and compliant environment.
              Whether you're shaping the future of autonomous vehicles, smart cities, or sustainable transportation, the
              ENVITED-X data space empowers you to innovate, collaborate, and lead in the mobility revolution.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-md leading-8 text-white/60">
              In the ENVITED-X data space we offer two different participation models.
            </p>
            <svg
              viewBox="0 0 1208 1024"
              className="absolute -top-10 left-1/2 -z-10 h-[80rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
            >
              <ellipse cx={604} cy={512} rx={604} ry={512} fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)" />
              <defs>
                <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                  <stop stopColor="#798bb3" />
                  <stop offset={1} stopColor="#848ab7" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flow-root bg-white pb-24 sm:pb-32">
          <div className="-mt-80">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
                <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10">
                  <div>
                    <h3 className="text-base font-semibold leading-7 text-blue-900">Community member</h3>
                    <div className="mt-4 flex items-center justify-center gap-x-2 bg-gray-200 h-48">
                      <img alt="" src="/images/community-member.png" />
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                      Explore, share, and consume data with limited services. Be visible to organizations seeking
                      collaboration.
                    </p>
                    <div className="mt-8">
                      <Button href={'#demim'} type={ButtonType.block}>
                        Start free
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10">
                  <div>
                    <h3 className="text-base font-semibold leading-7 text-blue-900">Association member</h3>
                    <div className="mt-4 flex items-center justify-center gap-x-2 bg-gray-200 h-48">
                      <img alt="" src="/images/association-member.png" />
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                      Get full access to data and services, actively contribute, and have decision rights in governance,
                      work groups, and policies.
                    </p>
                    <div className="mt-8">
                      <Button href={'https://asc-s.de/en/becoming-a-member'} type={ButtonType.block} target="_blank">
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="isolate relative">
        <div className="mx-auto max-w-7xl px-6 pb-10 sm:pb-32 lg:px-8">
          <div className="mb-10 md:mb-20">
            {/* Feature comparison (up to lg) */}
            <section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
              <h2 id="mobile-comparison-heading" className="sr-only">
                Feature comparison
              </h2>

              <div className="mx-auto max-w-2xl space-y-16">
                {tiers.map(tier => (
                  <div key={tier.id}>
                    <div
                      className={`${
                        tier.featured ? 'border-indigo-600' : 'border-transparent'
                      } -mt-px w-72 border-t-2 pt-10 md:w-80`}
                    >
                      <h3
                        className={`${
                          tier.featured ? 'text-indigo-600' : 'text-gray-900'
                        } text-sm font-semibold leading-6`}
                      >
                        {tier.name}
                      </h3>
                    </div>

                    <div className="mt-10 space-y-10">
                      {sections.map(section => (
                        <div key={section.name}>
                          <h4 className="text-sm font-semibold leading-6 text-gray-900">{section.name}</h4>
                          <div className="relative mt-6">
                            <div
                              aria-hidden="true"
                              className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-sm sm:block"
                            />

                            <div
                              className={`${
                                tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10'
                              } relative rounded-lg bg-white shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0`}
                            >
                              <dl className="divide-y divide-gray-200 text-sm leading-6">
                                {section.features.map(feature => {
                                  const value = prop(tier.name)(feature.tiers)
                                  return (
                                    <div
                                      key={feature.name}
                                      className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                                    >
                                      <dt className="pr-4 text-gray-600">{feature.name}</dt>
                                      <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                        {is(String)(value) ? (
                                          <span
                                            className={
                                              tier.featured ? 'font-semibold text-indigo-600' : 'text-gray-900'
                                            }
                                          >
                                            {value}
                                          </span>
                                        ) : (
                                          <>
                                            {value ? (
                                              <CheckIcon
                                                aria-hidden="true"
                                                className="mx-auto h-5 w-5 text-indigo-600"
                                              />
                                            ) : (
                                              <XMarkIcon aria-hidden="true" className="mx-auto h-5 w-5 text-gray-400" />
                                            )}

                                            <span className="sr-only">{value ? 'Yes' : 'No'}</span>
                                          </>
                                        )}
                                      </dd>
                                    </div>
                                  )
                                })}
                              </dl>
                            </div>

                            <div
                              aria-hidden="true"
                              className={`${
                                tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10'
                              } pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Feature comparison (lg+) */}
            <section aria-labelledby="comparison-heading" className="hidden lg:block">
              <h2 id="comparison-heading" className="sr-only">
                Feature comparison
              </h2>

              <div className="grid grid-cols-3 gap-x-8 before:block">
                {tiers.map(tier => (
                  <div key={tier.id} aria-hidden="true" className="-mt-px">
                    <div className={`${tier.featured ? 'border-blue-900' : 'border-transparent'} pt-10`}>
                      <p
                        className={`${
                          tier.featured ? 'text-blue-900' : 'text-gray-900'
                        } text-sm font-semibold leading-6`}
                      >
                        {tier.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="-mt-6 space-y-16">
                {sections.map(section => (
                  <div key={section.name}>
                    <h3 className="text-sm font-semibold leading-6 text-gray-900">{section.name}</h3>
                    <div className="relative -mx-8 mt-10">
                      <table className="relative w-full border-separate border-spacing-x-8">
                        <thead>
                          <tr className="text-left">
                            <th scope="col">
                              <span className="sr-only">Feature</span>
                            </th>
                            {tiers.map(tier => (
                              <th key={tier.id} scope="col">
                                <span className="sr-only">{tier.name} tier</span>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.features.map((feature, featureIdx) => (
                            <tr key={feature.name}>
                              <th
                                scope="row"
                                className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
                              >
                                {feature.name}
                                {featureIdx !== section.features.length - 1 ? (
                                  <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                                ) : null}
                              </th>
                              {tiers.map(tier => {
                                const value = prop(tier.name)(feature.tiers)
                                return (
                                  <td key={tier.id} className="relative w-1/4 px-4 py-0 text-center">
                                    <span className="relative h-full w-full py-3">
                                      {is(String)(value) ? (
                                        <span
                                          className={`${
                                            tier.featured ? 'font-semibold text-blue-900' : 'text-gray-900'
                                          } text-sm leading-6`}
                                        >
                                          {value}
                                        </span>
                                      ) : (
                                        <>
                                          {value ? (
                                            <CheckIcon aria-hidden="true" className="mx-auto h-5 w-5 text-blue-900" />
                                          ) : (
                                            <XMarkIcon aria-hidden="true" className="mx-auto h-5 w-5 text-gray-400" />
                                          )}

                                          <span className="sr-only">{value ? 'Yes' : 'No'}</span>
                                        </>
                                      )}
                                    </span>
                                  </td>
                                )
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Fake card borders */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-3 gap-x-8 before:block"
                      >
                        {tiers.map(tier => (
                          <div
                            key={tier.id}
                            className={`${
                              tier.featured ? 'ring-2 ring-blue-900' : 'ring-1 ring-gray-900/10'
                            } rounded-lg`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <p className="mt-6 text-lg leading-7 text-gray-600">
            For more information about the price models, please contact the ASCS office.
          </p>
        </div>
      </div>
      <div className="relative isolate overflow-hidden bg-gradient-to-b to-gray-900 from-blue-900/40 pt-14 bg-gray-900">
        <div
          id="demim"
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-gray-900 shadow-xl shadow-blue-900 ring-1 ring-blue-900 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-10 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:col-span-2 xl:col-auto">
              Decentralized Member Identity Management
            </h3>
            <div className="max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="mt-6 text-lg leading-8 text-gray-400">
                At ENVITED-X, trust is the foundation of our community. We value collaboration, transparency, and
                security, which is why we developed DEMIM — our Decentralized Member Identity Management.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-400">
                In the ENVITED-X data space, verified digital identities are your key to secure access. Each identity is
                decentralized and blockchain-powered, ensuring that only authorized participants can log in and interact
                within the ecosystem.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-400">
                Once your company's digital identity and those of your employees are verified, you can use them for
                seamless and secure login. This ensures that every user accessing the data space is authenticated,
                protecting the integrity of the ecosystem and enabling transparent, trustworthy collaboration.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button href={'https://identity.ascs.digital/'} colorScheme={ColorScheme.dark} target="_blank">
                  Create your digital identity
                </Button>
              </div>
            </div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/eqNZhfOPR04?si=854TiNT_BBlahovp"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  )
}
