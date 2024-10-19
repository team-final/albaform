'use client'

import Albatalk from '@/components/Albatalk/Albatalk/Albatalk'
import CommentList from '@/components/CommentList/CommentList'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { getAlbatalk } from '@/lib/api/albatalk'
import { ALBATALK_LIST_PATH_NAME } from '@/lib/data/constants'
import { useAlbatalkStore } from '@/lib/stores/albatalkStore'
import { AlbatalkProps } from '@/lib/types/formTypes'
import { Params } from '@/lib/types/types'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import styles from './page.module.scss'

export default function AlbatalkPage({ params }: Params) {
  const router = useRouter()
  const { postId } = params
  const [data, setData] = useState<AlbatalkProps | null>(null)

  const { initialAlbatalkData } = useAlbatalkStore()

  const request = useCallback(async () => {
    if (!postId) return
    const response = await getAlbatalk(postId)
    if (!response) return router.replace(`/${ALBATALK_LIST_PATH_NAME}`)
    // console.log('response: ', response)
    initialAlbatalkData(response.data)
    setData(response.data)
  }, [router, postId, setData, initialAlbatalkData])

  useEffect(() => {
    request()
  }, [request])

  if (!data)
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    )

  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        <Albatalk />
        <CommentList />
      </div>
    </main>
  )
}
