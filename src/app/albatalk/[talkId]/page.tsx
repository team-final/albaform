'use client'

import Albatalk from '@/components/Albatalk/Albatalk/Albatalk'
import Comment from '@/components/Comment/Comment'
import { Params } from '@/lib/types/types'

import styles from './page.module.scss'

export default function AlbatalkPage({ params }: Params) {
  const { talkId } = params

  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        <Albatalk talkId={Number(talkId)} />
        <Comment talkId={Number(talkId)} />
      </div>
    </main>
  )
}
