'use client'

import DefaultQueryProvider from '@/lib/queries/DefaultQueryProvider'
import { ChildrenProps } from '@/lib/types/types'

export default function FormLayout({ children }: ChildrenProps) {
  return <DefaultQueryProvider>{children}</DefaultQueryProvider>
}
