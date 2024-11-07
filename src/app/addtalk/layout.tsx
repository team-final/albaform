'use client'

import defaultQueryClient from '@/lib/queries/defaultQueryClient'
import { ChildrenProps } from '@/lib/types/types'
import { QueryClientProvider } from '@tanstack/react-query'

import styles from './page.module.scss'

export default function FormCreateLayout({ children }: ChildrenProps) {
  return (
    <QueryClientProvider client={defaultQueryClient}>
      <main className={styles.main}>{children}</main>
    </QueryClientProvider>
  )
}
