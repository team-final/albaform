import '@/components/FormDetails/ImageSlider/ImageSlider.css'
import KakaoScript from '@/components/FormDetails/KakaoScript/KakaoScript'
import GlobalNavigationBar from '@/components/GlobalNavigationBar/GlobalNavigationBar'
import '@/components/Toastify/Toastify.css'
import type { Metadata } from 'next'
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
      </body>
      <KakaoScript />
    </html>
  )
}
