import { useEffect, useState } from 'react'
import ReactQRCode from 'react-qr-code'
import useSWR from 'swr'

import styles from './App.module.css'
import { fetcher } from './common/fetcher'
import { getOpenIdConnectUrl } from './utils'
import { Loader } from './modules/loader'

const QRCode = ReactQRCode as any

function App() {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const loginChallenge = urlSearchParams.get('login_challenge')

  const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_AUTH_SERVER_URI}/challenge/${loginChallenge}`, fetcher)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null)

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
        fetch(`${import.meta.env.VITE_AUTH_SERVER_URI}/redirect/${loginId}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data.redirect)
            if (data?.redirect?.destination) {
              window.location = data.redirect.destination
            }
          })
          .catch((e) => {
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
        {isLoading && <Loader />}
        {qrCodeValue && !isLoading && (
          <div className={`${styles.qrCodeContainer} ${styles.shadow}`}>
            <QRCode value={qrCodeValue} />
          </div>
        )}
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
