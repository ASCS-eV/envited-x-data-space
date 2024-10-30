import { useEffect, useState } from 'react'
import ReactQRCode from 'react-qr-code'
import useSWR from 'swr'

import { fetcher } from './common/fetcher'
import './global.css'
import { Loader } from './modules/loader'
import { getOpenIdConnectUrl } from './utils'

const QRCode = ReactQRCode as any

function App() {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const loginChallenge = urlSearchParams.get('login_challenge')

  const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_API_URL}/challenge/${loginChallenge}`, fetcher)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false)

  useEffect(() => {
    try {
      const url = getOpenIdConnectUrl(data)
      setQrCodeValue(url)
    } catch (e: any) {
      setQrCodeValue(null)
      setErrorMessage(e.message)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      const { loginId } = data
      const interval = setInterval(() => {
        fetch(`${import.meta.env.VITE_API_URL}/redirect/${loginId}`)
          .then(res => res.json())
          .then(data => {
            if (data?.redirect?.destination) {
              setIsRedirecting(true)
              clearInterval(interval)
              window.location = data.redirect.destination
            }
          })
          .catch(e => {
            console.error(e)
          })
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [data])

  return (
    <>
      <header className="fixed top-0 z-40 w-full">
        <div className="absolute top-0 w-full bg-white h-2"></div>
        <div className="absolute z-40 bg-logo bg-no-repeat inline-flex justify-center px-24 pt-2 pb-4 hidden md:block">
          <img src="/ASCS_logo_envited-X_colour_alex.png" alt="Envited Data Space" height={40} width={170} />
        </div>
        <div className="absolute z-40 bg-logo bg-no-repeat inline-flex justify-center px-20 pt-2 pb-4 md:hidden -left-16">
          <img src="/ASCS_logo_envited-X_colour_alex.png" alt="Envited Data Space" height={30} width={128} />
        </div>
      </header>
      <div className="relative isolate overflow-hidden bg-gradient-to-b to-gray-900 from-blue-900/40 pt-14 bg-gray-900 min-h-screen flex flex-col justify-center items-center">
        <div
          id="demim"
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-gray-900 shadow-xl shadow-blue-900 ring-1 ring-blue-900 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto text-center">
          <h3 className="max-w-2xl text-4xl font-bold tracking-tight text-white leading-normal">
            Sign in with your verified credential to securely access the <strong>ENVITED-X data space</strong>.
          </h3>

          <div className="mx-auto mt-12 max-w-lg rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10 text-center">
            <p className="mt-6 text-lg leading-8 text-gray-700">
              By signing in and presenting your verifiable credential, you agree to the{' '}
              <a
                href={import.meta.env.VITE_EXTERNAL_TERMS_AND_CONDITIONS_URL}
                target="_blank"
                className="text-blue-900 underline hover:text-blue-800"
              >
                Terms of Service
              </a>{' '}
              and authorize the use of your credential to create your ENVITED-X data space account.
            </p>
            {isLoading && <Loader />}
            {qrCodeValue && !isLoading && !isRedirecting && (
              <div className="mt-6 flex justify-center">
                <QRCode value={qrCodeValue} />
              </div>
            )}
            {isRedirecting && <div className="text-lg">Redirecting</div>}
            {error && (
              <div className="mt-6">
                <h3 className="text-red-500">Error</h3>
                <p className="text-red-500">{errorMessage}</p>
              </div>
            )}
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Don't have a credential?{' '}
              <a
                href={import.meta.env.VITE_EXTERNAL_DEMIM_URL}
                target="_blank"
                className="text-blue-900 underline hover:text-blue-800"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
