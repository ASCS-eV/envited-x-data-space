import styles from './App.module.css'

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
          <div class={styles.logo}>
            <img src='/envited-logo.png' alt='Envited Data Space' />
          </div>
        </header>
      <main class={styles.container}>
        
        <p>Sign in with your verified credentials to continue to <strong>Envited Data Space</strong></p>
        
        <div class={`${styles.qrCodeContainer} ${styles.shadow}`}>
          <img src='/qrcode.png' alt='QR code' />
        </div>
      </main>
    </div>
  )
}

export default App
