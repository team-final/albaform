'use client'

import QueryProvider from '@/lib/queries/QueryProvider'
import { LayoutProps } from '@/lib/types/types'

export default function UserLayout({ children }: LayoutProps) {
  return <QueryProvider>{children}</QueryProvider>
}
