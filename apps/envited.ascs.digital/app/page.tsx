import { ReinventingMobility, SimulationData, Vision } from '../modules/LandingPage'
import {
  verifyCredential as spruceVerifyCredential,
  // verifyPresentation as spruceVerifyPresentation,
} from '@spruceid/didkit-wasm-node'
export default async function Index() {
  const VC =  {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        {
            "PostalAddress": {
                "@context": {
                    "@protected": true,
                    "@version": 1.1,
                    "addressCountry": "https://schema.org/addressCountry",
                    "addressLocality": "http://schema.org/addressLocality",
                    "postalCode": "http://schema.org/postalCode",
                    "streetAddress": "http://schema.org/streetAddress"
                },
                "@id": "http://schema.org/PostalAddress"
            },
            "AscsMember": {
                "@context": {
                    "@protected": true,
                    "@version": 1.1,
                    "address": "http://schema.org/address",
                    "articlesOfAssociation": "https://schema.org/termsOfService",
                    "contributionRules": "https://schema.org/termsOfService",
                    "isAscsMember": "http://schema.org/Boolean",
                    "isEnvitedMember": "http://schema.org/Boolean",
                    "name": "https://schema.org/name",
                    "privacyPolicy": "https://schema.org/termsOfService",
                    "url": "https://schema.org/url",
                    "vatID": "http://schema.org/vatID"
                },
                "@id": "https://schema.ascs.digital/AscsMemberCredential/v1#AscsMember"
            },
            "AscsMemberCredential": "https://schema.ascs.digital/AscsMemberCredential/v1#",
            "@protected": true,
            "@version": 1.1
        }
    ],
    "id": "urn:uuid:db9ec84b-21e0-4e92-8750-e3c02426c39f",
    "type": [
        "VerifiableCredential",
        "AscsMemberCredential"
    ],
    "credentialSubject": {
        "id": "did:pkh:tz:tz1cwef8BHv5Knc6nx6efHo9wDyLMim3EP2m",
        "address": {
            "addressCountry": "+49",
            "addressLocality": "Muncih",
            "postalCode": "1234",
            "streetAddress": "Street+1",
            "type": "PostalAddress"
        },
        "privacyPolicy": "https://asc-s.de/datenschutz",
        "contributionRules": "https://asc-s.de/media/files/ascs_Contribution_Rules_as_of_2020-07-08_YNCA2wi.pdf",
        "articlesOfAssociation": "https://asc-s.de/media/files/ascs_articles_of_association_2021-09-17.pdf",
        "vatID": "",
        "url": "",
        "name": "VDL+Test+company",
        "isAscsMember": true,
        "isEnvitedMember": true,
        "type": "AscsMember"
    },
    "issuer": "did:pkh:tz:tz1ZBYB7Lwmoc7xbwq59mHK4GbiPhfPaEo2g",
    "issuanceDate": "2024-03-25T09:13:35.883Z",
    "proof": {
        "@context": {
            "TezosMethod2021": "https://w3id.org/security#TezosMethod2021",
            "TezosSignature2021": {
                "@context": {
                    "@protected": true,
                    "@version": 1.1,
                    "challenge": "https://w3id.org/security#challenge",
                    "created": {
                        "@id": "http://purl.org/dc/terms/created",
                        "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
                    },
                    "domain": "https://w3id.org/security#domain",
                    "expires": {
                        "@id": "https://w3id.org/security#expiration",
                        "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
                    },
                    "id": "@id",
                    "nonce": "https://w3id.org/security#nonce",
                    "proofPurpose": {
                        "@context": {
                            "@protected": true,
                            "@version": 1.1,
                            "assertionMethod": {
                                "@container": "@set",
                                "@id": "https://w3id.org/security#assertionMethod",
                                "@type": "@id"
                            },
                            "authentication": {
                                "@container": "@set",
                                "@id": "https://w3id.org/security#authenticationMethod",
                                "@type": "@id"
                            },
                            "id": "@id",
                            "type": "@type"
                        },
                        "@id": "https://w3id.org/security#proofPurpose",
                        "@type": "@vocab"
                    },
                    "proofValue": "https://w3id.org/security#proofValue",
                    "publicKeyJwk": {
                        "@id": "https://w3id.org/security#publicKeyJwk",
                        "@type": "@json"
                    },
                    "type": "@type",
                    "verificationMethod": {
                        "@id": "https://w3id.org/security#verificationMethod",
                        "@type": "@id"
                    }
                },
                "@id": "https://w3id.org/security#TezosSignature2021"
            }
        },
        "type": "TezosSignature2021",
        "proofPurpose": "assertionMethod",
        "proofValue": "edsigteihGDMqec5nraFYiJZZJBcXAeEbhBxj9cFLPa6MqQyszuHGLq1QYnDEBaMwMx9g59xb2Mho2EEkyHxyzWbzKWvsQx6sxY",
        "verificationMethod": "did:pkh:tz:tz1ZBYB7Lwmoc7xbwq59mHK4GbiPhfPaEo2g#TezosMethod2021",
        "created": "2024-03-25T09:13:35.886Z",
        "publicKeyJwk": {
            "alg": "EdBlake2b",
            "crv": "Ed25519",
            "kty": "OKP",
            "x": "wQwP7kofPqTHCBSs2FmH21jiK7Agg9N02VXiFmXeOMQ"
        }
    },
    "expirationDate": "2102-09-15T17:14:33Z"
  }
  const VC =  {"@context":["https://www.w3.org/2018/credentials/v1",{"@version":1.1,"AscsUser":{"@context":{"@protected":true,"@version":1.1,"address":"http://schema.org/address","email":"https://schema.org/email","isAscsMember":"http://schema.org/Boolean","isEnvitedMember":"http://schema.org/Boolean","name":"https://schema.org/name","privacyPolicy":"https://schema.org/termsOfService"},"@id":"https://schema.ascs.digital/AscsUserCredential#AscsUser"},"AscsUserCredential":"https://schema.ascs.digital/AscsUserCredential#","PostalAddress":{"@context":{"@protected":true,"@version":1.1,"addressCountry":"https://schema.org/addressCountry","addressLocality":"http://schema.org/addressLocality","postalCode":"http://schema.org/postalCode","streetAddress":"http://schema.org/streetAddress"},"@id":"http://schema.org/PostalAddress"},"@protected":true}],"id":"urn:uuid:e9beea62-fa13-465b-bc84-99400b19e962","type":["VerifiableCredential","AscsUserCredential"],"credentialSubject":{"id":"did:pkh:tz:tz1gp7pWdFFEHXS7rVNjzWHKLkBuvHCTnM26","isAscsMember":true,"email":"jeroenbranje@gmail.com","privacyPolicy":"https://asc-s.de/datenschutz","name":"Jeroen Branje","isEnvitedMember":true,"address":{"addressLocality":"Aschheim","postalCode":"85609","streetAddress":"Jägerweg 10","type":"PostalAddress"},"type":"AscsUser"},"issuer":"did:pkh:tz:tz1Kj1XAEhrcuPS3rvZ8BGsUGDjv78ykEkEi","issuanceDate":"2024-04-23T13:45:38.897Z","proof":{"@context":{"TezosMethod2021":"https://w3id.org/security#TezosMethod2021","TezosSignature2021":{"@context":{"@protected":true,"@version":1.1,"challenge":"https://w3id.org/security#challenge","created":{"@id":"http://purl.org/dc/terms/created","@type":"http://www.w3.org/2001/XMLSchema#dateTime"},"domain":"https://w3id.org/security#domain","expires":{"@id":"https://w3id.org/security#expiration","@type":"http://www.w3.org/2001/XMLSchema#dateTime"},"id":"@id","nonce":"https://w3id.org/security#nonce","proofPurpose":{"@context":{"@protected":true,"@version":1.1,"assertionMethod":{"@container":"@set","@id":"https://w3id.org/security#assertionMethod","@type":"@id"},"authentication":{"@container":"@set","@id":"https://w3id.org/security#authenticationMethod","@type":"@id"},"id":"@id","type":"@type"},"@id":"https://w3id.org/security#proofPurpose","@type":"@vocab"},"proofValue":"https://w3id.org/security#proofValue","publicKeyJwk":{"@id":"https://w3id.org/security#publicKeyJwk","@type":"@json"},"type":"@type","verificationMethod":{"@id":"https://w3id.org/security#verificationMethod","@type":"@id"}},"@id":"https://w3id.org/security#TezosSignature2021"}},"type":"TezosSignature2021","proofPurpose":"assertionMethod","proofValue":"edsigtcDWbzS6ZYULFzNDvD3j3Z4vVW3Nk1nXMiorw77GNXGLG9qt6NR8aYseQxCoBHUuSo19vagPvWswzBVUzfDsY86qdig3mj","verificationMethod":"did:pkh:tz:tz1Kj1XAEhrcuPS3rvZ8BGsUGDjv78ykEkEi#TezosMethod2021","created":"2024-04-23T13:45:38.898Z","publicKeyJwk":{"alg":"EdBlake2b","crv":"Ed25519","kty":"OKP","x":"t-afb_Xe9vymTi32fuTG7Z-wYulK3zSHXAohIUK9_Yc"}},"expirationDate":"2102-09-15T17:14:33Z"}
  const r = await spruceVerifyCredential(JSON.stringify(VC), "{}")
  console.log(r)
  return (
    <>
      <Vision />
      <SimulationData />
      <ReinventingMobility />
    </>
  )
}
