'use client'

import styles from '@/app/form/create/page.module.scss'
import { LayoutProps } from '@/lib/types/types'

export default function FormCreateLayout({ children }: LayoutProps) {
  return <main className={styles.main}>{children}</main>
}
