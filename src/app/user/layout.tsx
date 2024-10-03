'use client'

import DefualtQueryProvider from '@/lib/queries/QueryProvider'
import { ComponentProps } from '@/lib/types/types'

export default function UserLayout({ children }: ComponentProps) {
  return <DefualtQueryProvider>{children}</DefualtQueryProvider>
}
