import Avatar from '@/components/Avatar/Avatar'
import Dropdown from '@/components/Dropdown/Dropdown'
import IconText from '@/components/IconText/IconText'
import {
  deleteAlbatalk,
  deleteAlbatalkLike,
  postAlbatalkLike,
} from '@/lib/api/albatalk'
import {
  ALBATALK_EDIT_PATH_NAME,
  ALBATALK_LIST_PATH_NAME,
} from '@/lib/data/constants'
import { useAlbatalkStore } from '@/lib/stores/albatalkStore'
import { useUserStore } from '@/lib/stores/userStore'
import { ImageUrl } from '@/lib/types/formTypes'
import { formatKoreanDate } from '@/lib/utils/formatDate'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styles from './Albatalk.module.scss'

export default function Albatalk() {
  const user = useUserStore.getState().user
  const router = useRouter()
  const [isPending, setIsPending] = useState<boolean>(false)
  const { albatalkData, setAlbatalkData } = useAlbatalkStore()
  if (!albatalkData) return null

  const image: ImageUrl | null = (() => {
    try {
      return JSON.parse(albatalkData.imageUrl)
    } catch {
      return null
    }
  })()

  const handleEdit = () => {
    router.push(`/${ALBATALK_EDIT_PATH_NAME}/${albatalkData.id}`)
  }

  const handleDelete = async () => {
    console.log('handleDelete: ', albatalkData.id)
    try {
      await deleteAlbatalk(albatalkData.id)
      router.replace(`/${ALBATALK_LIST_PATH_NAME}`)
    } catch {}
  }

  const handleLike = async () => {
    setIsPending(true)

    if (albatalkData.isLiked) {
      setAlbatalkData('isLiked', false)
      setAlbatalkData('likeCount', --albatalkData.likeCount)
    } else {
      setAlbatalkData('isLiked', true)
      setAlbatalkData('likeCount', ++albatalkData.likeCount)
    }

    try {
      const response = albatalkData.isLiked
        ? await deleteAlbatalkLike(albatalkData.id)
        : await postAlbatalkLike(albatalkData.id)
      setAlbatalkData('isLiked', response.data.isLiked)
      setAlbatalkData('likeCount', response.data.likeCount)
    } catch {
      if (albatalkData.isLiked) {
        setAlbatalkData('isLiked', true)
        setAlbatalkData('likeCount', ++albatalkData.likeCount)
      } else {
        setAlbatalkData('isLiked', false)
        setAlbatalkData('likeCount', --albatalkData.likeCount)
      }
    }

    setIsPending(false)
  }

  console.log(user?.id, albatalkData.writer.id)

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <p className={styles.title}>{albatalkData.title}</p>
        {user?.id === albatalkData.writer.id && (
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
            imageUrl={albatalkData.writer.imageUrl}
            name={albatalkData.writer.nickname}
          />
          <p>{formatKoreanDate(albatalkData.createdAt)}</p>
        </div>

        <div className={styles['about-counts']}>
          <IconText>
            <IconText.Icon src={'/icons/ic-comment.svg'} alt={'댓글 아이콘'} />
            <IconText.Text text={albatalkData.commentCount} />
          </IconText>

          <IconText onClick={handleLike} disabled={isPending}>
            <IconText.Icon
              src={
                albatalkData.isLiked
                  ? '/icons/ic-like-active.svg'
                  : '/icons/ic-like.svg'
              }
              alt={
                albatalkData.isLiked
                  ? '좋아요 활성 아이콘'
                  : '좋아요 비활성 아이콘'
              }
            />
            <IconText.Text text={albatalkData.likeCount} />
          </IconText>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.content}>{albatalkData.content}</p>
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
