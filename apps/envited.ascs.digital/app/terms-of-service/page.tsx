import { PageHeader } from '../../modules/PageHeader'

export default async function Index() {
  return (
    <>
      <PageHeader
        heading="Terms of Service"
        title="ENVITED-X data space"
        description='Please read these General Terms of Use ("Terms") carefully in their entirety before using www.envited-x.net, operated by the Automotive Solution Center for Simulation e.V. ("ASCS"). These Terms constitute an agreement between you and ASCS, located at Curiestrasse 2, 70563 Stuttgart, Germany, and govern your access to and use of the ENVITED-X Data Space ("Data Space") platform.'
        backgroundImage="/images/AdobeStock_619508170_Onchira.jpeg"
      />
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-900/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-900/10 ring-1 ring-blue-900/5 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-6xl px-6 pb-0 pt-10 sm:pt-40 lg:px-8">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">1. Introduction</h3>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            ASCS operates the Data Space (hereinafter "Operator") and provides a central access point for data and
            services (collectively, "Offerings") focused on simulation-based development, validation, certification, and
            operation of automated mobility and transport units and systems. The purpose of the Data Space is to promote
            and strengthen research, development, and standardization in these areas. To this end, the Data Space
            enables the transparent provision, exchange, and combination of Offerings between Providers and Consumers
            (collectively, "Users") in the B2B sector. The provision, exchange, and combination of Offerings are managed
            through standardized interfaces and shared rules. The goal is to simplify business processes for all Users
            and leverage the potential of available data sources.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            The Data Space is built on a decentralized data infrastructure and utilizes industry standards in Web3 and
            Distributed Ledger Technologies (DLT).
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            The following Terms apply to ensure a fair and secure flow of information, as well as the transmission and
            use of Offerings through the platform. Users' individual terms of use do not apply, even if not expressly
            objected to. This does not apply to Offerings provided and offered by Providers on the platform. The use of
            such Offerings is governed individually between Providers and Consumers. Providers may attach specific terms
            of use in the metadata of their Offerings. To simplify usage, Consumers generally agree to these terms upon
            using or subscribing to the Offerings.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            By accessing or using the Data Space, you agree to these Terms, including any modifications and updates that
            may occur between your initial acceptance of these Terms and any future access or use. If you do not agree
            to these Terms, you may not access or use this Data Space.
            <br />
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
      <div>
        <div className="mx-auto max-w-6xl px-6 pb-0 sm:pb-40 lg:px-8">
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-12">
              2. User registration and access
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              To access certain features of the Data Space, you may need to register for a company/institution account
              and a user account.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-700">You undertake to do so:</p>
            <ul className="list-disc list-blue-800 text-lg leading-8 text-gray-700 pl-6">
              <li>
                Register through the ASCS Decentralised Member Identity Management (DEMIM), where your Identity
                Credentials will be verified and provided to you as Verified Credentials.
              </li>
              <li>Provide accurate and up-to-date information during the registration process.</li>
              <li>
                Ensure that your credentials remain secure and confidential. You are solely responsible for all actions
                taken under your account.
              </li>
            </ul>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Use your verified proof of identity to connect to the platform.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              There are two participation models for registered users:
            </p>
            <ul className="list-disc list-blue-800 text-lg leading-8 text-gray-700 pl-6">
              <li>
                Community Member: a general participant with some limited access to product offerings or platform
                services.
              </li>
              <li>
                Association Member: member of the ASCS and the ENVITED research cluster. A participant with extended
                access to product offerings and platform services.
              </li>
              <li>Registered users can take on several ecosystem roles in each participation model.</li>
            </ul>
          </div>
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-12">
              3. Use of the platform
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              <strong>
                You agree to use the Data Space solely for purposes that are lawful and in accordance with these Terms.
              </strong>
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              <strong>Specifically, you agree to refrain from the following:</strong>
            </p>
            <ul className="list-disc list-blue-800 text-lg leading-8 text-gray-700 pl-6">
              <li>Using the Data Space to upload, transmit, or share unlawful, harmful, or inappropriate content.</li>
              <li>
                Using the Data Space to upload content that belongs to third parties without their explicit, indefinite
                permission. This includes, but is not limited to:
                <ul className="list-disc list-blue-800 text-lg leading-8 text-gray-700 pl-6">
                  <li>Images, videos, or other media</li>
                  <li>Texts, documents, or other materials</li>
                  <li>Models, software, or code</li>
                </ul>
              </li>
              <li>
                Uploading licensed content to the Data Space that does not allow you to upload, share, and distribute it
                in accordance with the Terms. You are responsible for ensuring that such licenses are valid and cover
                the intended use.
              </li>
              <li>
                Misusing or interfering with the Data Space, including attempts to gain unauthorized access to other
                users' data.
              </li>
              <li>Reverse-engineering, decompiling, or disassembling parts of the Data Space.</li>
              <li>Sharing data or content from the Data Space with third parties without proper permission.</li>
            </ul>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Failure to comply with the points listed above will be considered a breach of these Terms of Use.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              <strong>We reserve the right to:</strong>
            </p>
            <ul className="list-disc list-blue-800 text-lg leading-8 text-gray-700 pl-6">
              <li>
                Remove or block access to content that infringes or appears to infringe intellectual property rights, to
                the extent technically possible.
              </li>
              <li>Suspend or terminate accounts responsible for repeated violations.</li>
              <li>Initiate legal action if necessary to protect the rights of content owners.</li>
            </ul>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              <strong>Product Offerings can be made available by providers in the Data Space in two ways:</strong>
            </p>
            <ul className="list-disc list-blue-800 text-lg leading-8 text-gray-700 pl-6">
              <li>
                Descriptions of the Product Offerings, especially general descriptions of content, general product
                specification information including the type of usage terms, and information about the provider
                (collectively "Metadata") are uploaded or transmitted to the Data Space, while the actual Offerings are
                stored in the Operator's cloud infrastructure.
              </li>
              <li>
                Only Metadata is created or transmitted within the Data Space, while the actual Offering is hosted on an
                IT infrastructure provided by the Provider. The Provider is solely responsible for the secure operation
                of this IT infrastructure.
              </li>
            </ul>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              The Data Space functions as a source or distributor for Offerings. In the latter case, the Data Space
              serves merely as a communication tool between Providers and Consumers. This Data Space utilizes the
              InterPlanetary File System (IPFS) to store Metadata related to user-generated content and services. By
              using this Data Space, you agree that Metadata relating to your data interactions and usage may be stored
              in IPFS, a decentralized peer-to-peer protocol designed for high availability and data integrity. We
              recommend that Providers store or provide their Offerings on cloud infrastructures located in Europe.
              Offerings provided through the Operator's cloud infrastructure are stored and processed on AWS servers
              located in Frankfurt, Germany. This arrangement ensures compliance with the General Data Protection
              Regulation (GDPR) and supports data privacy and security standards. This Data Space utilizes the Tezos
              blockchain for implementing smart contracts and tokenization features. By using functionalities within
              this Data Space, you agree to the use and execution of smart contracts on the Tezos blockchain, a
              decentralized and public ledger.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-12">
              4. Contributions and Payments
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Access to certain features in the Data Space may require fees or contributions, which will be clearly
              communicated in advance. All payments must be made according to the fee and contribution models provided
              on the Data Space and by the Operator. All prices are in euros, excluding VAT or other applicable indirect
              taxes at the statutory rate.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-12">
              5. Limitation of Liability
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              <strong>5.1 Liability for Own Content</strong>
              <br />
              The content provided within the Data Space is intended solely for general information purposes. The Data
              Space Operator endeavors to keep the content up-to-date, accurate, and complete. However, the Operator
              does not guarantee the correctness, completeness, or currency of the content provided. Any liability for
              direct or indirect damages arising from the use or non-use of the provided information is excluded to the
              extent permitted by law.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              <strong>5.2 Liability for Third-Party Content</strong>
              <br />
              The Data Space Operator is not responsible for content provided or uploaded by users. The Operator does
              not actively review third-party content and assumes no liability for such content, particularly regarding
              its accuracy, completeness, legality, or potential rights violations. The Operator reserves the right to
              remove content that is unlawful or inappropriate at its discretion and within technical capabilities. The
              Operator is technically unable to delete information provided via IPFS, the Tezos Blockchain, or the
              provider’s cloud infrastructure. Smart Contracts can also be used independently of the Data Space, for
              which the Operator assumes no liability. However, the Operator can hide content from the Tezos Blockchain
              within the Data Space upon complaint and stop pinning IPFS-pinned content.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              <strong>5.3 User Responsibility</strong>
              <br />
              Users of the Data Space are responsible for ensuring that they have the necessary rights and permissions
              to upload, share, or distribute content in the Data Space. The user guarantees that they are the sole
              owner of the rights to the content they provide or that they have obtained the explicit permission of the
              rights holder. The Operator assumes no liability for violations of copyright, data protection regulations,
              or other third-party rights by the user.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              <strong>5.4 Links and References</strong>
              <br />
              The Data Space may contain links to external websites or third-party content. The Operator has no
              influence over the content of such external websites and assumes no responsibility or liability for them.
              The content of linked sites is solely the responsibility of their respective operators. No legal
              violations were apparent at the time of linking. If the Operator becomes aware of any legal violation by
              linked content, the link will be removed immediately.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              <strong>5.5 Disclaimer of Liability</strong>
              <br />
              The Data Space and its contents are provided “as is” without warranty, either express or implied. To the
              extent permitted by law, the Operator excludes any liability for damages resulting from the use of the
              Data Space or the contents therein, including indirect damages, consequential damages, lost profits, or
              data loss. This also applies to damages resulting from technical malfunctions, system failures, or data
              loss within the Data Space.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-12">6. Export Control</h3>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              The user acknowledges that the use of the Data Space may be subject to import/export restrictions. In
              particular, there may be licensing requirements or restrictions on the use of the Data Space and
              associated technologies in foreign jurisdictions. The user agrees to comply with applicable import/export
              control regulations of the Federal Republic of Germany, the European Union, and all other relevant laws
              and regulations. The provider’s obligation to fulfill the contract is subject to compliance with all
              applicable national or international import/export regulations or other statutory provisions that may
              impose restrictions.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-12">
              7. Suspension or Modification of Operations
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              The operator of the Data Space reserves the right to modify, suspend, or permanently discontinue the
              operation of the Data Space, its services, and participation models at any time, with or without prior
              notice and without stating a reason. This may occur particularly due to changes in operational
              requirements, legal obligations, or business strategy. In the event of termination, access to the Data
              Space, services, and participation models will be immediately discontinued. The operator is entitled to
              delete or restrict access to data, content, and contributions from participants without liability. Users
              are responsible for securing their data before termination. Rights and obligations that arose prior to
              termination will remain in effect. The operator is not liable for any loss or damage resulting from the
              suspension, modification, or termination of the Data Space or its services.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-12">
              8. Changes to Terms of Use
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              The operator may modify these Terms from time to time, with or without prior notice, to accommodate
              changes in legal or regulatory requirements or in the operation of the Data Space. By continuing to use
              the platform after such changes, you agree to the new Terms.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-12">9. Governing Law</h3>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              These Terms are governed by the laws of the Federal Republic of Germany. All disputes arising from or in
              connection with these Terms are subject to the exclusive jurisdiction of the courts of Stuttgart, Germany.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-12">10. Contact</h3>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              If you have any questions regarding these Terms, please reach out to us, and we will assist you in
              understanding your rights and obligations under this agreement.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Solution Center for Simulation e.V.
              <br />
              Curiestrasse 2<br />
              70563 Stuttgart, Germany
              <br />
              <a href="mailto:info@asc-s.de" className="hover:text-gray-900" target="_blank">
                info@asc-s.de
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
