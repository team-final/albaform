'use client'

import defaultQueryClient from '@/lib/queries/defaultQueryClient'
import { LayoutProps } from '@/lib/types/types'
import { QueryClientProvider } from '@tanstack/react-query'

/**
 * 클라이언트 전용 전역 설정
 */
export default function ClientSideSetUp({ children }: LayoutProps) {
  return (
    <QueryClientProvider client={defaultQueryClient}>
      {/* <AuthSyncronizer /> */}
      {children}
    </QueryClientProvider>
  )
}
