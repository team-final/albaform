'use client'

import defaultQueryClient from '@/lib/queries/defaultQueryClient'
import { LayoutProps } from '@/lib/types/types'
import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'

export default function UserLayout({ children }: LayoutProps) {
  return (
    <QueryClientProvider client={defaultQueryClient}>
      <Suspense>{children}</Suspense>
    </QueryClientProvider>
  )
}
