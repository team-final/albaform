import ClientStateProvider from '@/components/ClientStateProvider'
import GlobalNavigationBar from '@/components/GlobalNavigationBar/GlobalNavigationBar'
import Toastify from '@/components/Toastify/Toastify'
import '@/components/Toastify/Toastify.css'
import KakaoScript from '@/lib/scripts/KakaoScript'
import { LayoutProps } from '@/lib/types/types'
import '@/styles/globals.css'
import '@/styles/reset.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'albaform - 한 곳에서 관리하는 알바 구인 플랫폼',
  description: '한 곳에서 관리하는 알바 구인 플랫폼',
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ko">
      <body>
        <ClientStateProvider>
          <Toastify />
          <GlobalNavigationBar />
          {children}
          <KakaoScript />
        </ClientStateProvider>
      </body>
    </html>
  )
}
