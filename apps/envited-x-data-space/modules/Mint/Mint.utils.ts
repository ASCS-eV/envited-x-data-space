export const ShowSpecificBeaconWallets = () => {
  const observer = new MutationObserver(() => {
    const beaconAlertWrapper: any | undefined = document.querySelector('div[id^="beacon-alert-wrapper"]')

    if (beaconAlertWrapper) {
      const style = document.createElement('style')
      style.innerHTML = `
        .theme__light .alert-footer {
          display: none;
        }

        .top-wallets-wallets-main > div:nth-child(3),
        .top-wallets-wallets-main > div:nth-child(4) {
          display: none;
        }
      `

      beaconAlertWrapper?.shadowRoot.appendChild(style)
    }
  })

  observer.observe(document, {
    subtree: true,
    childList: true,
  })
}
