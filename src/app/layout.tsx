import queryClient from '@/lib/queries/queryClient'
import type { Metadata } from 'next'
import React from 'react'
import { QueryClientProvider } from 'react-query'

import RootHeader from '../components/RootHeader/RootHeader'
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
    <QueryClientProvider client={queryClient}>
      <html lang="ko">
        <body>
          <RootHeader />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  )
}
