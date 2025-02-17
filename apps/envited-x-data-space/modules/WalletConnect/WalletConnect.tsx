'use client'

import { WalletIcon } from '@heroicons/react/24/outline'

import { useWallet } from '../../common/context/WalletContext'
import { useTranslation } from '../../common/i18n'

export const WalletConnect = () => {
  const { t } = useTranslation('WalletConnect')
  const { account, connectWallet, disconnectWallet } = useWallet()

  return account ? (
    <button onClick={() => disconnectWallet()} className="flex items-center text-black gap-2">
      <WalletIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  ) : (
    <button
      onClick={() => connectWallet()}
      className="relative rounded-md px-4 py-1.5 overflow-hidden group bg-blue-900 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-800 transition-all ease-out duration-300"
    >
      <span
        className={`absolute right-0 w-8 h-32 -mt-12 transition-all transform translate-x-12 bg-white opacity-10 rotate-12 ease duration-1000 group-hover:-translate-x-40`}
      />
      <span className="relative text-base font-semibold">{t('[Button] connect wallet')}</span>
    </button>
  )
}
