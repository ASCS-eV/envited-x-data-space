'use client'

import { Tab } from '@headlessui/react'
import { pathOr } from 'ramda'
import { FC, Fragment } from 'react'

import { ButtonType, ColorScheme, Token } from '../../common/types'
import { formatTokenAttributes } from '../../common/utils'
import { Button } from '../Button'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface AssetProps {
  item: {
    token: Token
    tokenAttributes: any
  }
}

export const Asset: FC<AssetProps> = ({ item: { token, tokenAttributes } }) => {
  const attributes = formatTokenAttributes(tokenAttributes) as any
  console.log(token, attributes)

  return (
    <>
      <div>
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <img src={token.displayUri} alt={token.name} className="object-cover object-center" />
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl break-all">{token.name}</h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
              </div>

              <div>
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <p className="mt-2 text-sm text-gray-500">{token.id}</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{token.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4">
              <Button
                href={`mailto:example-asset@envited.de?subject=ENVITED X Request for offer: ${token.id}&body=Dear Sales Team,%0D%0DI'm interested in your product ${process.env.NEXTAUTH_URL}/${token.id}.%0DPlease get in touch with me with an offer.%0D%0DBest regards,`}
                type={ButtonType.block}
                colorScheme={ColorScheme.light}
                target="_blank"
              >
                Contact sales
              </Button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Asset information</h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  <li>
                    <strong>Format:</strong> ASAM OpenDrive 1.6
                  </li>
                  <li>
                    <strong>Size:</strong>{' '}
                    {pathOr('', ['hdmap', 'general', 'general', 'data', 'general', 'size'])(attributes)}
                  </li>
                  <li>
                    <strong>Recording time:</strong>{' '}
                    {pathOr('', ['hdmap', 'general', 'general', 'data', 'general', 'recordingTime'])(attributes)}
                  </li>
                </ul>
                <ul role="list">
                  <li>
                    <strong>Version:</strong> {pathOr('', ['hdmap', 'format', 'hdmap', 'version'])(attributes)}
                  </li>
                  {/* <li><strong>Upload Time:</strong> {token.createdAt}</li> */}
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">License</h3>
              <ul role="list" className="mt-4 text-sm text-gray-500">
                <li>
                  <strong>Type:</strong> {token.rights}
                </li>
                <li>
                  <strong>License type:</strong>{' '}
                  <a href={token.rightsUri} className="font-medium text-blue-900 hover:text-blue-800">
                    {token.rightsUri}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <Tab.Group as="div">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-blue-800 text-blue-800'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium outline-none',
                      )
                    }
                  >
                    Content
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-blue-800 text-blue-800'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium outline-none',
                      )
                    }
                  >
                    Product details
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-blue-800 text-blue-800'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium outline-none',
                      )
                    }
                  >
                    Location
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel>
                  <h3 className="sr-only">Content</h3>
                  {/* <div className="mt-0">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 pt-2">
                      <div className="border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Road Types</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.city}</dd>
                      </div>
                      <div className="border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Level of Detail</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.country}</dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Lane types</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.length}</dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Traffic Direction</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{product.roadSurface}</dd>
                      </div>
                    </dl>
                  </div> */}
                  <h3 className="text-lg font-medium mt-6">Quantity</h3>
                  <div className="mt-0">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 pt-2">
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Number intersections</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quantity', 'hdmap', 'numberIntersections'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Length</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quantity', 'hdmap', 'length'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Number traffic lights</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quantity', 'hdmap', 'numberTrafficLights'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Elevation range</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quantity', 'hdmap', 'elevationRange'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Range of modeling</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quantity', 'hdmap', 'rangeOfModeling'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Number objects</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quantity', 'hdmap', 'numberObjects'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Number traffic signs</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quantity', 'hdmap', 'numberTrafficSigns'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Number outlines</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quantity', 'hdmap', 'numberOutlines'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Speed limit</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          Min: {pathOr('', ['hdmap', 'quantity', 'hdmap', 'speedLimit', 'general', 'min'])(attributes)},
                          Max: {pathOr('', ['hdmap', 'quantity', 'hdmap', 'speedLimit', 'general', 'max'])(attributes)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <h3 className="sr-only">Product details</h3>
                  <h3 className="text-lg font-medium">Qualtity</h3>
                  <div className="mt-0">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 pt-2">
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Accuracy Signals</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quality', 'hdmap', 'accuracySignals'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Precision</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quality', 'hdmap', 'precision'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Accuracy Objects</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quality', 'hdmap', 'accuracyObjects'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Accuracy Lane Model 2d</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quality', 'hdmap', 'accuracyLaneModel2d'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Accuracy Lane Model Height</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'quality', 'hdmap', 'accuracyLaneModelHeight'])(attributes)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <h3 className="text-lg font-medium mt-6">Data Source</h3>
                  <div className="mt-0">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 pt-2">
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Measurement System</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'dataSource', 'hdmap', 'measurementSystem'])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Used Data Sources</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', ['hdmap', 'dataSource', 'hdmap', 'usedDataSources'])(attributes)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <h3 className="sr-only">Location</h3>
                  <img
                    src="https://envited.market/gcmedia/serve/reference/3506/xl/0/streckea8.png"
                    className="w-full h-auto mt-6"
                  />
                  <h3 className="text-lg font-medium mt-6">Project Location</h3>
                  <div className="mt-0">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 pt-2">
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Country</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'projectLocation',
                            'georeference',
                            'country',
                          ])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">State</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'projectLocation',
                            'georeference',
                            'state',
                          ])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Region</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'projectLocation',
                            'georeference',
                            'region',
                          ])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">City</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'projectLocation',
                            'georeference',
                            'city',
                          ])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Relation or Area</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'projectLocation',
                            'georeference',
                            'relationOrArea',
                          ])(attributes)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <h3 className="text-lg font-medium mt-6">Geodetic Reference System</h3>
                  <div className="mt-0">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 pt-2">
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Origin</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'geodeticReferenceSystem',
                            'georeference',
                            'origin',
                            'georeference',
                            'x',
                          ])(attributes)}
                          ,{' '}
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'geodeticReferenceSystem',
                            'georeference',
                            'origin',
                            'georeference',
                            'y',
                          ])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Coördinate System</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'geodeticReferenceSystem',
                            'georeference',
                            'coordinateSystem',
                          ])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Height System</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'geodeticReferenceSystem',
                            'georeference',
                            'heightSystem',
                          ])(attributes)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <h3 className="text-lg font-medium mt-6">Bounding Box</h3>
                  <div className="mt-0">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 pt-2">
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">xMin</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'projectLocation',
                            'georeference',
                            'boundingBox',
                            'georeference',
                            'xMin',
                          ])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">yMin</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'projectLocation',
                            'georeference',
                            'boundingBox',
                            'georeference',
                            'yMin',
                          ])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">xMax</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'projectLocation',
                            'georeference',
                            'boundingBox',
                            'georeference',
                            'xMax',
                          ])(attributes)}
                        </dd>
                      </div>
                      <div className="border-t border-gray-100 px-4 py-3 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">yMax</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                          {pathOr('', [
                            'hdmap',
                            'georeference',
                            'georeference',
                            'projectLocation',
                            'georeference',
                            'boundingBox',
                            'georeference',
                            'yMax',
                          ])(attributes)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  )
}
