import { Metadata } from 'next'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

import Header from '@/components/header/Header'
import AppProvider from '@/components/providers/AppProvider'

export const metadata : Metadata = {
  title: {
    default: `${process.env.NEXT_PUBLIC_TITLE} | Ali_God`,
    template: `%s | Ali_God`
  }
}

import styles from './layout.module.scss'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,user-scalable=no, initial-scale=1.0 maximum-scale=1.0,minimum-scale=1.0" />
        <link href="/favicon/favicon.ico" type="image/x-icon" rel="shortcut icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="/favicon/favicon-32x32.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="/favicon/favicon-192x192.webp" />
        <link rel="icon" type="image/webp" sizes="16x16" href="/favicon/favicon-16x16.webp" />
        <link rel="manifest"  href="/manifest.json" />
        <title>Next-13 Starting Project | Ali_God</title>
      </head>
      <body className={inter.className} suppressHydrationWarning>
          <AppProvider>
              <Header />
              <section className={styles.container}>{children}</section>
          </AppProvider>
          <script src="/sw.js"></script>
      </body>
    </html>
  )
}
