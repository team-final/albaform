import ClientSideSetUp from '@/components/ClientSideSetUp'
import GlobalNavigationBar from '@/components/GlobalNavigationBar/GlobalNavigationBar'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import Toastify from '@/components/Toastify/Toastify'
import '@/components/Toastify/Toastify.css'
import KakaoScript from '@/lib/scripts/KakaoScript'
import { LayoutProps } from '@/lib/types/types'
import '@/styles/globals.css'
import '@/styles/reset.css'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'albaform - 한 곳에서 관리하는 알바 구인 플랫폼',
  description: '한 곳에서 관리하는 알바 구인 플랫폼',
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ko">
      <body>
        <ClientSideSetUp>
          <Suspense fallback={<LoadingSpinner full />}>
            <Toastify />
            <GlobalNavigationBar />
            {children}
            <KakaoScript />
          </Suspense>
        </ClientSideSetUp>
      </body>
    </html>
  )
}
