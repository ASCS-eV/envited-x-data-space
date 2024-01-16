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
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#758bb7" />
        <meta name="msapplication-TileColor" content="#758bb7" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body className="bg-white dark:bg-gray-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
