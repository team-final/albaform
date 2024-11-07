'use client'

import defaultQueryClient from '@/lib/queries/defaultQueryClient'
import { LayoutProps } from '@/lib/types/types'
import { QueryClientProvider } from '@tanstack/react-query'

export default function AlbatalksLayout({ children }: LayoutProps) {
  return (
    <QueryClientProvider client={defaultQueryClient}>
      {children}
    </QueryClientProvider>
  )
}
