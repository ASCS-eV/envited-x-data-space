import { useEffect, useState } from 'react'
import ReactQRCode from 'react-qr-code'
import useSWR from 'swr'

import styles from './App.module.css'
import { fetcher } from './common/fetcher'
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
    <div className={styles.App}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/envited-logo.png" alt="Envited Data Space" />
        </div>
      </header>

      <main className={styles.container}>
        <p>
          Sign in with your verified credentials to continue to <strong>Envited Data Space</strong>
        </p>
        <p className={styles.pSmall}>
          By presenting your verifiable credential you agree to the{' '}
          <a href={import.meta.env.VITE_EXTERNAL_TERMS_AND_CONDITIONS_URL} target="_blank">
            Terms of Service
          </a>{' '}
          and using the information for creating your ENVITED X Dataspace account
        </p>
        {isLoading && <Loader />}
        {qrCodeValue && !isLoading && !isRedirecting && (
          <div className="mx-auto mt-6 w-auto flex justify-center">
            <QRCode value={qrCodeValue} />
          </div>
        )}
        {isRedirecting && <div className={styles.redirectingContainer}>Redirecting</div>}
        <p className={styles.pSmall}>
          If you don't have a credential{' '}
          <a href={import.meta.env.VITE_EXTERNAL_DEMIM_URL} target="_blank">
            Register here
          </a>
        </p>
        {error && (
          <div className={styles.error}>
            <h3 className={styles.errorTitle}>Error</h3>
            <p>{errorMessage}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
