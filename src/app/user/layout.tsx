'use client'

import DefualtQueryProvider from '@/lib/queries/DefaultQueryProvider'
import { LayoutProps } from '@/lib/types/types'
import { Suspense } from 'react'

export default function UserLayout({ children }: LayoutProps) {
  return (
    <DefualtQueryProvider>
      <Suspense>{children}</Suspense>
    </DefualtQueryProvider>
  )
}
