'use client'

import DefaultQueryProvider from '@/lib/queries/DefaultQueryProvider'
import { ChildrenProps } from '@/lib/types/types'

export default function FormCreateLayout({ children }: ChildrenProps) {
  return (
    <DefaultQueryProvider>
      <main>{children}</main>
    </DefaultQueryProvider>
  )
}
