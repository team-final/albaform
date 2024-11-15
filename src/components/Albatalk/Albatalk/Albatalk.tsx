'use client'

import Avatar from '@/components/Avatar/Avatar'
import Dropdown from '@/components/Dropdown/Dropdown'
import IconText from '@/components/IconText/IconText'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import {
  deleteAlbatalk,
  deleteAlbatalkLike,
  getAlbatalk,
  postAlbatalkLike,
} from '@/lib/api/albatalk'
import {
  ALBATALK_EDIT_PATH_NAME,
  ALBATALK_LIST_PATH_NAME,
} from '@/lib/data/constants'
import { useUserStore } from '@/lib/stores/userStore'
import { AlbatalkProps, ImageUrl } from '@/lib/types/formTypes'
import { formatKoreanDate } from '@/lib/utils/formatDate'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import styles from './Albatalk.module.scss'

export default function Albatalk({ talkId }: { talkId: number }) {
  const user = useUserStore.getState().user
  const router = useRouter()
  const queryClient = useQueryClient()
  const [data, setData] = useState<AlbatalkProps | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isPending, setIsPending] = useState<boolean>(false)
  const image: ImageUrl | null = (() => {
    if (!data) return
    try {
      return JSON.parse(data.imageUrl)
    } catch {
      return null
    }
  })()

  const handleEdit = () => {
    router.push(`/${ALBATALK_EDIT_PATH_NAME}/${talkId}`)
  }

  const handleDelete = async () => {
    try {
      await deleteAlbatalk(talkId)
      queryClient.invalidateQueries()
      router.replace(`/${ALBATALK_LIST_PATH_NAME}`)
    } catch {}
  }

  const handleLikeToggle = async () => {
    setIsLiked((prev) => !prev)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))

    try {
      if (!data || isPending) return
      setIsPending(true)
      if (isLiked) {
        await deleteAlbatalkLike(talkId)
      } else {
        await postAlbatalkLike(talkId)
      }
    } catch {
      setIsLiked((prev) => !prev)
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1))
      toast.error('좋아요 요청에 실패했습니다.')
      queryClient.invalidateQueries()
    } finally {
      setIsPending(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAlbatalk(talkId)
        const albatalk = response.data as AlbatalkProps
        setData(albatalk)
        setIsLiked(albatalk.isLiked)
        setLikeCount(albatalk.likeCount)
      } catch {
        toast.error('데이터를 불러오는 데 실패했습니다.')
      }
    }
    fetchData()
  }, [talkId])

  if (!data)
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    )

  if (data)
    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <p className={styles.title}>{data.title}</p>
          {user?.id === data.writer.id && (
            <Dropdown className={styles.menu}>
              <Dropdown.Trigger />
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEdit}>수정하기</Dropdown.Item>
                <Dropdown.Item onClick={handleDelete}>삭제하기</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>

        <div className={styles.about}>
          <div className={styles['about-post']}>
            <Avatar
              imageUrl={data.writer.imageUrl}
              name={data.writer.nickname}
            />
            <p>{formatKoreanDate(data.createdAt)}</p>
          </div>

          <div className={styles['about-counts']}>
            <IconText>
              <IconText.Icon
                src={'/icons/ic-comment.svg'}
                alt={'댓글 아이콘'}
              />
              <IconText.Text text={data.commentCount} />
            </IconText>

            <IconText onClick={handleLikeToggle}>
              <IconText.Icon
                src={
                  isLiked ? '/icons/ic-like-active.svg' : '/icons/ic-like.svg'
                }
                alt={isLiked ? '좋아요 활성 아이콘' : '좋아요 비활성 아이콘'}
              />
              <IconText.Text text={likeCount} />
            </IconText>
          </div>
        </div>

        <div className={styles.body}>
          <p className={styles.content}>{data.content}</p>
          {image && (
            <div className={styles.image}>
              {/* eslint-disable @next/next/no-img-element */}
              <img src={image.url} alt={image.name} />
              {/* eslint-enable @next/next/no-img-element */}
            </div>
          )}
        </div>
      </div>
    )
}
