import '@/components/FormDetails/ImageSlider/ImageSlider.css'
import KakaoScript from '@/components/FormDetails/KakaoScript/KakaoScript'
import GlobalNavigationBar from '@/components/GlobalNavigationBar/GlobalNavigationBar'
import '@/components/Toastify/Toastify.css'
import { metadata } from '@/lib/data/metadata'
import { usePageStore } from '@/lib/stores/pageStore'
import { ComponentProps } from '@/lib/types/types'
import React from 'react'

import ClientProvider from '../lib/queries/QueryClientProvider'
import '../styles/globals.css'
import '../styles/reset.css'

export default function RootLayout({ children }: Readonly<ComponentProps>) {
  const { pageTitle } = usePageStore()
  const dynamicTitle = `${metadata.title} - ${pageTitle}`

  return (
    <html lang="ko">
      <head>
        <title>{dynamicTitle}</title>
        <meta name="description" content={metadata.description || ''} />
      </head>
      <body>
        <GlobalNavigationBar />
        <ClientProvider>{children}</ClientProvider>
      </body>
      <KakaoScript />
    </html>
  )
}
