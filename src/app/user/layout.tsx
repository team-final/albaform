'use client'

import DefualtQueryProvider from '@/lib/queries/DefaultQueryProvider'
import { LayoutProps } from '@/lib/types/types'

export default function UserLayout({ children }: LayoutProps) {
  return <DefualtQueryProvider>{children}</DefualtQueryProvider>
}
