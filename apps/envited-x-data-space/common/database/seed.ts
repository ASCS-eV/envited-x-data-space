import { RDSDataClient } from '@aws-sdk/client-rds-data'
import { fromIni } from '@aws-sdk/credential-providers'
import { drizzle as RDSDrizzle } from 'drizzle-orm/aws-data-api/pg'
import { map } from 'ramda'

import { BUSINESS_CATEGORIES } from './data/businessCategories'
import { ROLES } from './data/roles'
import { connectDb } from './database'
import { db } from './queries/queries'
import { insertUserTx } from './queries/users'
import { businessCategory, role, globalIdentifier } from './schema'
import * as schema from './schema'
import { GLOBAL_IDENTIFIERS } from './data/globalIdentifiers'

const insertRoles = (connection: any) => async (roles: any[]) =>
  connection.insert(role).values(roles).onConflictDoNothing().execute()
const insertBusinessCategories = (connection: any) => async (businessCategories: any[]) =>
  connection.insert(businessCategory).values(businessCategories).onConflictDoNothing().execute()
const insertGlobalIdentifiers = (connection: any) => async (globalIdentifiers: any[]) =>
  connection.insert(globalIdentifier).values(globalIdentifiers).onConflictDoNothing().execute()

const seed = async () => {
  try {
    // Insert seeding requirements here
    let connection = null

    if (process.env.ENV === 'development') {
      connection = await connectDb()
    } else {
      const rdsClient = new RDSDataClient({
        credentials: fromIni({ profile: process.env.AWS_PROFILE || '' }),
        region: 'eu-central-1',
      })

      connection = RDSDrizzle(rdsClient, {
        database: process.env.RDS_DB_NAME || '',
        secretArn: process.env.RDS_SECRET_ARN || '',
        resourceArn: process.env.RDS_RESOURCE_ARN || '',
        schema,
      })
    }

    // const roles = map((role: Record<string, any>) => ({ ...role, createdAt: new Date(), updatedAt: new Date() }))(ROLES)
    // await insertRoles(connection)(roles)

    // const businessCategories = map((category: Record<string, any>) => ({
    //   ...category,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }))(BUSINESS_CATEGORIES)
    // await insertBusinessCategories(connection)(businessCategories)

    const database = await db()
    const memberCredential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        {
          'AscsMember': {
            '@context': {
              '@protected': true,
              '@version': 1.1,
              'address': 'http://schema.org/address',
              'articlesOfAssociation': 'https://schema.org/termsOfService',
              'contributionRules': 'https://schema.org/termsOfService',
              'isAscsMember': 'http://schema.org/Boolean',
              'isEnvitedMember': 'http://schema.org/Boolean',
              'name': 'https://schema.org/name',
              'privacyPolicy': 'https://schema.org/termsOfService',
              'url': 'https://schema.org/url',
              'vatID': 'http://schema.org/vatID',
            },
            '@id': 'https://schema.ascs.digital/AscsMemberCredential/v1#AscsMember',
          },
          'AscsMemberCredential': 'https://schema.ascs.digital/AscsMemberCredential/v1#',
          '@version': 1.1,
          '@protected': true,
          'PostalAddress': {
            '@context': {
              '@protected': true,
              '@version': 1.1,
              'addressCountry': 'https://schema.org/addressCountry',
              'addressLocality': 'http://schema.org/addressLocality',
              'postalCode': 'http://schema.org/postalCode',
              'streetAddress': 'http://schema.org/streetAddress',
            },
            '@id': 'http://schema.org/PostalAddress',
          },
        },
      ],
      'id': 'urn:uuid:a5edf624-1808-47ed-9b1a-bd04ba42f02d',
      'type': ['VerifiableCredential', 'AscsMemberCredential'],
      'credentialSubject': {
        id: 'did:pkh:tz:tz1Kj1XAEhrcuPS3rvZ8BGsUGDjv78ykEkEi',
        name: 'vDL Digital Ventures GmbH',
        url: 'https://vdl.digital/',
        isAscsMember: true,
        privacyPolicy: 'https://asc-s.de/datenschutz',
        contributionRules: 'https://asc-s.de/media/files/ascs_Contribution_Rules_as_of_2020-07-08_YNCA2wi.pdf',
        articlesOfAssociation: 'https://asc-s.de/media/files/ascs_articles_of_association_2021-09-17.pdf',
        address: {
          addressCountry: '+49',
          addressLocality: 'Aschheim',
          postalCode: '85609',
          streetAddress: 'Jägerweg 10',
          type: 'PostalAddress',
        },
        type: 'AscsMember',
        vatID: 'DE322014796',
        isEnvitedMember: true,
      },
      'issuer': 'did:pkh:tz:tz1ZBYB7Lwmoc7xbwq59mHK4GbiPhfPaEo2g',
      'issuanceDate': '2024-10-30T12:20:55.134Z',
      'proof': {
        '@context': {
          TezosMethod2021: 'https://w3id.org/security#TezosMethod2021',
          TezosSignature2021: {
            '@context': {
              '@protected': true,
              '@version': 1.1,
              'challenge': 'https://w3id.org/security#challenge',
              'created': {
                '@id': 'http://purl.org/dc/terms/created',
                '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
              },
              'domain': 'https://w3id.org/security#domain',
              'expires': {
                '@id': 'https://w3id.org/security#expiration',
                '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
              },
              'id': '@id',
              'nonce': 'https://w3id.org/security#nonce',
              'proofPurpose': {
                '@context': {
                  '@protected': true,
                  '@version': 1.1,
                  'assertionMethod': {
                    '@container': '@set',
                    '@id': 'https://w3id.org/security#assertionMethod',
                    '@type': '@id',
                  },
                  'authentication': {
                    '@container': '@set',
                    '@id': 'https://w3id.org/security#authenticationMethod',
                    '@type': '@id',
                  },
                  'id': '@id',
                  'type': '@type',
                },
                '@id': 'https://w3id.org/security#proofPurpose',
                '@type': '@vocab',
              },
              'proofValue': 'https://w3id.org/security#proofValue',
              'publicKeyJwk': {
                '@id': 'https://w3id.org/security#publicKeyJwk',
                '@type': '@json',
              },
              'type': '@type',
              'verificationMethod': {
                '@id': 'https://w3id.org/security#verificationMethod',
                '@type': '@id',
              },
            },
            '@id': 'https://w3id.org/security#TezosSignature2021',
          },
        },
        'type': 'TezosSignature2021',
        'proofPurpose': 'assertionMethod',
        'proofValue':
          'edsigtzevcJza3fCTZpraJZaqmeN641T6Sce8uCe7F63q43TdChp93NAffEbieNnNRQXHk4i1ChgYAjAcYyDLHGSWRYMhvkSexP',
        'verificationMethod': 'did:pkh:tz:tz1ZBYB7Lwmoc7xbwq59mHK4GbiPhfPaEo2g#TezosMethod2021',
        'created': '2024-10-30T12:20:55.138Z',
        'publicKeyJwk': {
          alg: 'EdBlake2b',
          crv: 'Ed25519',
          kty: 'OKP',
          x: 'wQwP7kofPqTHCBSs2FmH21jiK7Agg9N02VXiFmXeOMQ',
        },
      },
      'expirationDate': '2102-09-15T17:14:33Z',
    }

    const userCredential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        {
          'AscsUser': {
            '@context': {
              '@protected': true,
              '@version': 1.1,
              'address': 'http://schema.org/address',
              'email': 'https://schema.org/email',
              'isAscsMember': 'http://schema.org/Boolean',
              'isEnvitedMember': 'http://schema.org/Boolean',
              'name': 'https://schema.org/name',
              'privacyPolicy': 'https://schema.org/termsOfService',
            },
            '@id': 'https://schema.ascs.digital/AscsUserCredential#AscsUser',
          },
          '@protected': true,
          'AscsUserCredential': 'https://schema.ascs.digital/AscsUserCredential#',
          'PostalAddress': {
            '@context': {
              '@protected': true,
              '@version': 1.1,
              'addressCountry': 'https://schema.org/addressCountry',
              'addressLocality': 'http://schema.org/addressLocality',
              'postalCode': 'http://schema.org/postalCode',
              'streetAddress': 'http://schema.org/streetAddress',
            },
            '@id': 'http://schema.org/PostalAddress',
          },
          '@version': 1.1,
        },
      ],
      'id': 'urn:uuid:950d1f21-cbe2-407e-92ef-7e154bed5c1d',
      'type': ['VerifiableCredential', 'AscsUserCredential'],
      'credentialSubject': {
        id: 'did:pkh:tz:tz1QiMF7KNwmabgo5fkchacKh5niBK9Xai7y',
        isEnvitedMember: true,
        name: 'Roy Scheeren',
        address: {
          addressLocality: 'Aschheim',
          postalCode: '85609',
          streetAddress: 'Jägerweg 10',
          type: 'PostalAddress',
        },
        type: 'AscsUser',
        email: 'roy.scheeren@vdl.digital',
        isAscsMember: true,
        privacyPolicy: 'https://asc-s.de/datenschutz',
      },
      'issuer': 'did:pkh:tz:tz1Kj1XAEhrcuPS3rvZ8BGsUGDjv78ykEkEi',
      'issuanceDate': '2024-11-04T21:15:00.687Z',
      'proof': {
        '@context': {
          TezosMethod2021: 'https://w3id.org/security#TezosMethod2021',
          TezosSignature2021: {
            '@context': {
              '@protected': true,
              '@version': 1.1,
              'challenge': 'https://w3id.org/security#challenge',
              'created': {
                '@id': 'http://purl.org/dc/terms/created',
                '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
              },
              'domain': 'https://w3id.org/security#domain',
              'expires': {
                '@id': 'https://w3id.org/security#expiration',
                '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
              },
              'id': '@id',
              'nonce': 'https://w3id.org/security#nonce',
              'proofPurpose': {
                '@context': {
                  '@protected': true,
                  '@version': 1.1,
                  'assertionMethod': {
                    '@container': '@set',
                    '@id': 'https://w3id.org/security#assertionMethod',
                    '@type': '@id',
                  },
                  'authentication': {
                    '@container': '@set',
                    '@id': 'https://w3id.org/security#authenticationMethod',
                    '@type': '@id',
                  },
                  'id': '@id',
                  'type': '@type',
                },
                '@id': 'https://w3id.org/security#proofPurpose',
                '@type': '@vocab',
              },
              'proofValue': 'https://w3id.org/security#proofValue',
              'publicKeyJwk': {
                '@id': 'https://w3id.org/security#publicKeyJwk',
                '@type': '@json',
              },
              'type': '@type',
              'verificationMethod': {
                '@id': 'https://w3id.org/security#verificationMethod',
                '@type': '@id',
              },
            },
            '@id': 'https://w3id.org/security#TezosSignature2021',
          },
        },
        'type': 'TezosSignature2021',
        'proofPurpose': 'assertionMethod',
        'proofValue':
          'edsigtbbW7BBBJsueVHEbvXiHTjqu64gbTxYgRDSMLWofVa851PHTabW4j8eRPsXmDrNsL7h1GGWJtAg19Eu9sqmWiY7psAi5Yi',
        'verificationMethod': 'did:pkh:tz:tz1Kj1XAEhrcuPS3rvZ8BGsUGDjv78ykEkEi#TezosMethod2021',
        'created': '2024-11-04T21:15:00.691Z',
        'publicKeyJwk': {
          alg: 'EdBlake2b',
          crv: 'Ed25519',
          kty: 'OKP',
          x: 't-afb_Xe9vymTi32fuTG7Z-wYulK3zSHXAohIUK9_Yc',
        },
      },
      'expirationDate': '2102-09-15T17:14:33Z',
    }
    // const newUser = await database.insertUserTx(userCredential)

    await insertGlobalIdentifiers(connection)(GLOBAL_IDENTIFIERS);

    // console.log(user)
    // const frn = {
    //   method: 'did:pkh',
    //   namespace: 'tezos',
    //   chainId: 'NetXnHfVqm9iesp',
    //   nss: 'tz1ZBYB7Lwmoc7xbwq59mHK4GbiPhfPaEo2g',
    // }
    // const globalIdentifier = await database.getGlobalIdentifierByFullResourceName(frn)
    // const user = await database.getUserByDid(frn)
    // console.log(globalIdentifier)
    // console.log(user)

    // const user = await database.getUserByDid({
    //   method: 'did:pkh',
    //   namespace: 'tezos',
    //   chainId: 'NetXnHfVqm9iesp',
    //   nss: 'tz1QiMF7KNwmabgo5fkchacKh5niBK9Xai7y',
    // })
    // console.log(user)

    // const userRoles = await database.getUserRolesByDid({
    //   method: 'did:pkh',
    //   namespace: 'tezos',
    //   chainId: 'NetXnHfVqm9iesp',
    //   nss: 'tz1QiMF7KNwmabgo5fkchacKh5niBK9Xai7y',
    // })
    // console.log(userRoles)

    return
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(0)
  }
}

seed()
