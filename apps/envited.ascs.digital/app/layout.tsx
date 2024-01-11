import { Providers } from '../modules/Theme/Providers'
import './global.css'

export const metadata = {
  title: 'Envited Marketplace',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="bg-white dark:bg-gray-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
