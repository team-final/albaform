'use client'

import AuthSyncronizer from '@/components/AuthSyncronizer'
import { LayoutProps } from '@/lib/types/types'

/**
 * 클라이언트 전용 전역 설정
 */
export default function ClientStateProvider({ children }: LayoutProps) {
  return (
    <>
      <AuthSyncronizer />
      {children}
    </>
  )
}
