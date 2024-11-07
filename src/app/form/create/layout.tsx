'use client'

import styles from '@/app/form/create/page.module.scss'
import defaultQueryClient from '@/lib/queries/defaultQueryClient'
import { LayoutProps } from '@/lib/types/types'
import { QueryClientProvider } from '@tanstack/react-query'

export default function FormCreateLayout({ children }: LayoutProps) {
  return (
    <QueryClientProvider client={defaultQueryClient}>
      <main className={styles.main}>{children}</main>
    </QueryClientProvider>
  )
}
