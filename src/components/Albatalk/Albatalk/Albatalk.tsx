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
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import styles from './Albatalk.module.scss'

export default function Albatalk({ talkId }: { talkId: number }) {
  const user = useUserStore.getState().user
  const router = useRouter()
  const [data, setData] = useState<AlbatalkProps | null>(null)
  const [pending, setPending] = useState<boolean>(false)
  const [isPending, setIsPending] = useState<boolean>(false)

  const request = useCallback(async () => {
    setPending(true)
    if (!talkId) return
    const response = await getAlbatalk(talkId)
    if (!response) return router.replace(`/${ALBATALK_LIST_PATH_NAME}`)
    setData(response.data as AlbatalkProps)
    setPending(false)
  }, [router, talkId, setPending, setData])

  useEffect(() => {
    request()
  }, [request])

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
      router.replace(`/${ALBATALK_LIST_PATH_NAME}`)
    } catch {}
  }

  const handleLike = async () => {
    if (!data) return

    setIsPending(true)

    setData((prev) => {
      if (prev) {
        if (prev.isLiked) {
          return {
            ...prev,
            isLiked: false,
            likeCount: prev.likeCount--,
          } as AlbatalkProps
        } else {
          return {
            ...prev,
            isLiked: true,
            likeCount: prev.likeCount++,
          } as AlbatalkProps
        }
      } else {
        return prev
      }
    })

    try {
      const response = data.isLiked
        ? await deleteAlbatalkLike(talkId)
        : await postAlbatalkLike(talkId)

      setData((prev) => {
        if (prev) {
          return {
            ...prev,
            isLiked: response.data.isLiked,
            likeCount: response.data.likeCount,
          } as AlbatalkProps
        } else {
          return prev
        }
      })
    } catch {
      setData((prev) => {
        if (prev) {
          if (prev.isLiked) {
            return {
              ...prev,
              isLiked: true,
              likeCount: prev.likeCount++,
            } as AlbatalkProps
          } else {
            return {
              ...prev,
              isLiked: false,
              likeCount: prev.likeCount--,
            } as AlbatalkProps
          }
        } else {
          return prev
        }
      })
    }

    setIsPending(false)
  }

  if (pending)
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

            <IconText onClick={handleLike} disabled={isPending}>
              <IconText.Icon
                src={
                  data.isLiked
                    ? '/icons/ic-like-active.svg'
                    : '/icons/ic-like.svg'
                }
                alt={
                  data.isLiked ? '좋아요 활성 아이콘' : '좋아요 비활성 아이콘'
                }
              />
              <IconText.Text text={data.likeCount} />
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
