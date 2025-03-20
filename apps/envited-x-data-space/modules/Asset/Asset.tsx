'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { clsx } from 'clsx'
import { pipe } from 'ramda'
import { FC, Fragment, useEffect, useState } from 'react'

import displayTrees from '../../common/asset/displayTrees'
import { extractDomainMetadata } from '../../common/asset/utils'
import { useTranslation } from '../../common/i18n'
import { ButtonType, ColorScheme, Profile, Token, TokenAttribute } from '../../common/types'
import {
  capitalize,
  displayItemValue,
  formatItemName,
  formatSectionName,
  getAssetType,
  kebabToCamelCase,
  removeKeywords,
} from '../../common/utils'
import { Button } from '../Button'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface AssetProps {
  token: { token: Token & { tokenAttributes: TokenAttribute[] }; profile: Profile }
}

export const Asset: FC<AssetProps> = ({ token: { token } }) => {
  const [displayTree, setDisplayTree] = useState<any>()
  const { t } = useTranslation('Asset')
  const [data, setData] = useState<Record<string, any>>({})

  useEffect(() => {
    const assetType = getAssetType(token.domainMetadata)
    console.log(displayTrees[kebabToCamelCase(assetType) as keyof typeof displayTrees])
    setDisplayTree(displayTrees[kebabToCamelCase(assetType) as keyof typeof displayTrees])
  }, [token.domainMetadata])

  useEffect(() => {
    const getSections = async (metadata: Record<string, any>) => {
      const metadataInSections = extractDomainMetadata(metadata)
      setData(metadataInSections)
    }

    if (token.domainMetadata) {
      getSections(token.domainMetadata)
    }
  }, [token])

  const hasNestedObjects = (obj: any) => {
    return Object.values(obj).some(value => typeof value === 'object' && value !== null)
  }

  const renderNestedProperties = (properties: any, section: string, level: number = 0) => {
    return Object.entries(properties).map(([key, value]) => {
      // Handle arrays by joining them with commas
      if (Array.isArray(value)) {
        return (
          <div key={key as string} className={clsx(' px-4 sm:col-span-1 sm:px-0 py-2')}>
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {pipe(formatSectionName, formatItemName)(key as string) as string}
            </dt>
            <dd className="text-sm leading-6 text-gray-700">
              {value.map((item: string) => capitalize(item)).join(', ')}
            </dd>
          </div>
        )
      } else if (typeof value === 'object' && value !== null) {
        return (
          <Fragment key={key as string}>
            <div key={key as string} className={clsx('px-4 sm:col-span-1 sm:px-0 py-2')}>
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {pipe(formatSectionName, formatItemName, removeKeywords)(key as string) as string}
              </dt>
              <dd className="text-sm leading-6 text-gray-700">
                <dl className={clsx('grid', hasNestedObjects(value) ? 'grid-cols-1' : 'grid-cols-2')}>
                  {renderNestedProperties(value, section, level + 1)}
                </dl>
              </dd>
            </div>
          </Fragment>
        )
      } else {
        return (
          <div key={key as string} className={clsx('px-4 sm:col-span-1 sm:px-0 py-2')}>
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {pipe(formatSectionName, formatItemName)(key as string) as string}
            </dt>
            <dd className="text-sm leading-6 text-gray-700 text-wrap break-words">{displayItemValue(value)}</dd>
          </div>
        )
      }
    })
  }

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
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl break-all">{data.name}</h1>

                <h2 id="information-heading" className="sr-only">
                  {t('[Header] product information')}
                </h2>
              </div>

              <div>
                <h3 className="sr-only">{t('[Header] reviews')}</h3>
                <div className="flex items-center">
                  <p className="mt-2 text-sm text-gray-500">{token.id}</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{data.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4">
              <Button
                href={`mailto:example-asset@envited.de?subject=ENVITED X Request for offer: ${token.id}&body=Dear Sales Team,%0D%0DI'm interested in your product ${process.env.NEXT_PUBLIC_UI_URL}/assets/${token.id}.%0DPlease get in touch with me with an offer.%0D%0DBest regards,`}
                type={ButtonType.block}
                colorScheme={ColorScheme.light}
                target="_blank"
              >
                {t('[Button] contact sales')}
              </Button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-bold text-gray-900">{t('[Header] asset information')}</h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list" className="text-sm font-medium leading-8 text-gray-900">
                  {displayTree?.terms.map((term: string) => (
                    <li key={data[term]}>
                      <strong>{formatSectionName(term)}</strong>{' '}
                      {data[term] && (
                        <ul>
                          {Object.entries(data[term]).map(([key, value]) => {
                            if (!key || !value) {
                              return ''
                            }
                            return (
                              <li>
                                <strong>{pipe(formatSectionName, formatItemName)(key as string) as string}:</strong>{' '}
                                {value as string}
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-bold text-gray-900">License</h3>
              <ul role="list" className="mt-4 text-sm font-medium leading-8 text-gray-900">
                <li>
                  <strong>{t('[Term] type')}</strong> {token.rights}
                </li>
                <li>
                  <strong>{t('[Term] license')}</strong>{' '}
                  <a href={token.rightsUri} className="font-medium text-blue-900 hover:text-blue-800">
                    {token.rightsUri}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <TabGroup as="div">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8">
                  {displayTree?.categories.map((tab: { name: string }) => (
                    <Tab
                      key={tab.name}
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-blue-800 text-blue-800'
                            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                          'whitespace-nowrap border-b-2 py-6 text-sm font-medium outline-none',
                        )
                      }
                    >
                      {tab.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {displayTree?.categories &&
                  displayTree?.categories.map((tab: { name: string; sections: string[] }) => (
                    <TabPanel key={tab.name}>
                      <h3 className="sr-only">{tab.name}</h3>
                      {tab.sections.map(section => (
                        <>
                          <h3 className="text-lg font-medium mt-6">{formatSectionName(section)}</h3>
                          <div className="mt-0">
                            <dl className="grid grid-cols-1 sm:grid-cols-2 pt-2">
                              {data[section] && renderNestedProperties(data[section], section)}
                            </dl>
                          </div>
                        </>
                      ))}
                    </TabPanel>
                  ))}
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>
    </>
  )
}
