import GlobalNavigationBar from '@/components/GlobalNavigationBar/GlobalNavigationBar'
import '@/components/Toastify/Toastify.css'
import KakaoScript from '@/lib/scripts/KakaoScript'
import { Metadata } from 'next'
import React from 'react'

import '../styles/globals.css'
import '../styles/reset.css'

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
        <GlobalNavigationBar />
        {children}
        <KakaoScript />
      </body>
    </html>
  )
}
