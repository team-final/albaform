'use client'

import DefaultQueryProvider from '@/lib/queries/DefaultQueryProvider'
import { ChildrenProps } from '@/lib/types/types'

import styles from './page.module.scss'

export default function FormCreateLayout({ children }: ChildrenProps) {
  return (
    <DefaultQueryProvider>
      <main className={styles.main}>{children}</main>
    </DefaultQueryProvider>
  )
}
