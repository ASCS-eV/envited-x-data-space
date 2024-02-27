import { useState } from 'react'
import ReactQRCode from 'react-qr-code'

import styles from './App.module.css'
import { getOpenIdConnectUrl } from './utils'

const QRCode = ReactQRCode as any

function App() {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const [error, setError] = useState<string | null>(null)
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null)

  try {
    const url = getOpenIdConnectUrl(urlSearchParams)
    setQrCodeValue(url)
  } catch (e: any) {
    setQrCodeValue(null)
    setError(e.message)
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div class={styles.logo}>
          <img src="/envited-logo.png" alt="Envited Data Space" />
        </div>
      </header>
      <main class={styles.container}>
        <p>
          Sign in with your verified credentials to continue to <strong>Envited Data Space</strong>
        </p>
        {qrCodeValue && (
          <div class={`${styles.qrCodeContainer} ${styles.shadow}`}>
            <QRCode value={qrCodeValue} />
          </div>
        )}
        {error && (
          <div class={styles.error}>
            <h3 class={styles.errorTitle}>Error</h3>
            <p>{error}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
