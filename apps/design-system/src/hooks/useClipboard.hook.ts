import { useState } from 'react'

export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false)

  const copyTextToClipboard = async (text: string) =>
    'clipboard' in navigator ? navigator.clipboard.writeText(text) : null

  const copyToClipboard = (text: string) => {
    copyTextToClipboard(text)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return { isCopied, copyToClipboard }
}
