import '@/components/FormDetails/ImageSlider/ImageSlider.css'
import type { Metadata } from 'next'
import React from 'react'

import RootHeader from '../components/RootHeader/RootHeader'
import ClientProvider from '../lib/queries/QueryClientProvider'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'albaform - 한 곳에서 관리하는 알바 구인 플랫폼',
  description: '한 곳에서 관리하는 알바 구인 플랫폼',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <RootHeader />
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
