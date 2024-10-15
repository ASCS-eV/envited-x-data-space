import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { AssociationMemberIcon, CommunityMemberIcon } from 'apps/envited.ascs.digital/modules/Icons'
import Link from 'next/link'
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
      <div className="isolate relative overflow-hidden bg-gray-900 bg-cover bg-center bg-[url('/images/AdobeStock_811521204_ZeNDaY.jpeg')]">
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
                      <div className="w-24 h-24">
                        <CommunityMemberIcon />
                      </div>
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
                      <div className="w-24 h-24">
                        <AssociationMemberIcon />
                      </div>
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                      Get full access to data and services, actively contribute, and have decision rights in governance,
                      work groups, and policies.
                    </p>
                    <div className="mt-8">
                      <Button href={'https://asc-s.de/en/becoming-a-member'} type={ButtonType.block} target="_blank">
                        Learn more about ASCS
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
        <div className="mx-auto max-w-7xl px-6 pb-10 md:pb-10 lg:px-8">
          <div className="mb-10 md:mb-0">
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
        </div>
      </div>
      <section className="isolate overflow-hidden bg-white px-6 lg:px-8">
        <div className="relative mx-auto max-w-2xl py-24 sm:py-32 lg:max-w-4xl">
          <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white sm:h-32" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/5 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center" />
          <figure className="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">
            <div className="relative col-span-2 lg:col-start-1 lg:row-start-2">
              <svg
                fill="none"
                viewBox="0 0 162 128"
                aria-hidden="true"
                className="absolute -top-12 left-0 -z-10 h-32 stroke-gray-900/10"
              >
                <path
                  d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                  id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                />
                <use x={86} href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" />
              </svg>
              <blockquote>
                <h3 className="text-gray-800 text-3xl font-extrabold">Get in touch</h3>
              </blockquote>
            </div>
            <div className="col-end-1 w-16 lg:row-span-4 lg:w-72">
              <img alt="" src="/images/alexander.png" className="rounded-xl bg-indigo-50 lg:rounded-3xl" />
            </div>
            <figcaption className="text-base lg:col-start-1 lg:row-start-3">
              <div>
                <div className="font-semibold text-gray-900">Dipl.-Ing. Alexander F. Walser</div>
                <div className="mt-1 text-gray-500">Managing Director</div>
              </div>
              <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                  </dt>
                  <dd>
                    <strong>Automotive Solution Center for Simulation e. V.</strong>
                    <br />
                    Curiestraße 2
                    <br />
                    70563 Stuttgart, Germany
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                  </dt>
                  <dd>
                    <a href="tel:+49 (0) 711 699659-21" className="hover:text-gray-900">
                      +49 (0) 711 699659-21
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                  </dt>
                  <dd>
                    <a href="mailto:alexander.walser@asc-s.de" className="hover:text-gray-900">
                      alexander.walser@asc-s.de
                    </a>
                  </dd>
                </div>
              </dl>
            </figcaption>
          </figure>
        </div>
      </section>
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
                <Button href={'https://staging.identity.ascs.digital/'} colorScheme={ColorScheme.dark} target="_blank">
                  Create your own identity
                </Button>
                <Link href={'/about-us'} className="text-white text-base font-semibold">
                  More about us
                </Link>
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
