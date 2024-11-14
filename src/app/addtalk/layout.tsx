'use client'

import { ChildrenProps } from '@/lib/types/types'

import styles from './page.module.scss'

export default function FormCreateLayout({ children }: ChildrenProps) {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  )
}
