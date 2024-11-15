import Albatalk from '@/components/Albatalk/Albatalk/Albatalk'
import Comment from '@/components/Comment/Comment'
import { Params } from '@/lib/types/types'
import { cookies } from 'next/headers'

import styles from './page.module.scss'

export default async function AlbatalkPage({ params }: Params) {
  const accessToken = cookies().get('accessToken')?.value
  const { talkId } = params
  if (!accessToken) {
    return <p>Redirecting...</p> // 인증이 없다면 미들웨어가 리다이렉트
  }

  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        <Albatalk talkId={Number(talkId)} />
        <Comment talkId={Number(talkId)} />
      </div>
    </main>
  )
}
