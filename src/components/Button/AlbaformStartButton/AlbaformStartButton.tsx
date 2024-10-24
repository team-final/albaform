'use client'

import { useUserStore } from '@/lib/stores/userStore'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import styles from './AlbaformStartButton.module.scss'

export default function AlbaformStartButton() {
  const user = useUserStore.getState().user
  const [link, setLink] = useState<string>('/user/sign-in')

  useEffect(() => {
    setLink(() => (user ? '/forms' : '/user/sign-in'))
  }, [user])

  return (
    <Link href={link} className={styles.button}>
      알바폼 시작하기
    </Link>
  )
}
